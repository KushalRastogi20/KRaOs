import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
const useFileSystem = () => {
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');
  const [recentFiles, setRecentFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedFiles = localStorage.getItem('fileSystem');
      const savedFolders = localStorage.getItem('folderSystem');
      const savedRecent = localStorage.getItem('recentFiles');
      
      if (savedFiles) setFiles(JSON.parse(savedFiles));
      if (savedFolders) setFolders(JSON.parse(savedFolders));
      if (savedRecent) setRecentFiles(JSON.parse(savedRecent));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setError('Failed to load data');
    }
  }, []);

  // Storage event listeners
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'fileSystem') {
        try {
          const newFiles = e.newValue ? JSON.parse(e.newValue) : [];
          setFiles(newFiles);
        } catch (error) {
          console.error('Error parsing storage event:', error);
        }
      }
      if (e.key === 'folderSystem') {
        try {
          const newFolders = e.newValue ? JSON.parse(e.newValue) : [];
          setFolders(newFolders);
        } catch (error) {
          console.error('Error parsing folder storage event:', error);
        }
      }
      if (e.key === 'recentFiles') {
        try {
          const newRecent = e.newValue ? JSON.parse(e.newValue) : [];
          setRecentFiles(newRecent);
        } catch (error) {
          console.error('Error parsing recent files storage event:', error);
        }
      }
    };

    const handleCustomStorageChange = (e) => {
      if (e.detail?.key === 'fileSystem') {
        try {
          const newFiles = e.detail.newValue ? JSON.parse(e.detail.newValue) : [];
          setFiles(newFiles);
        } catch (error) {
          console.error('Error parsing custom storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);

  // Save to localStorage and trigger events
  const saveToLocalStorage = (newFiles, newFolders = null, newRecent = null) => {
    try {
      const filesJson = JSON.stringify(newFiles);
      localStorage.setItem('fileSystem', filesJson);
      
      if (newFolders !== null) {
        localStorage.setItem('folderSystem', JSON.stringify(newFolders));
      }
      
      if (newRecent !== null) {
        localStorage.setItem('recentFiles', JSON.stringify(newRecent));
      }
      
      // Dispatch custom event for same-tab components
      const event = new CustomEvent('localStorageChange', {
        detail: {
          key: 'fileSystem',
          newValue: filesJson
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setError('Failed to save data');
    }
  };

  // Encryption/Decryption utilities
  const encryptContent = (content, password = 'quantum-encryption-key') => {
    try {
      return CryptoJS.AES.encrypt(content, password).toString();
    } catch (error) {
      console.error('Encryption failed:', error);
      return content;
    }
  };

  const decryptContent = (encryptedContent, password = 'quantum-encryption-key') => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedContent, password);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedContent;
    }
  };

  // Compression utilities (simple base64 compression)
  const compressContent = (content) => {
    try {
      return btoa(encodeURIComponent(content));
    } catch (error) {
      console.error('Compression failed:', error);
      return content;
    }
  };

  const decompressContent = (compressedContent) => {
    try {
      return decodeURIComponent(atob(compressedContent));
    } catch (error) {
      console.error('Decompression failed:', error);
      return compressedContent;
    }
  };

  // Get file icon based on type and extension
  const getFileIcon = (fileName, type) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    const iconMap = {
      // Text files
      'txt': 'FileText',
      'md': 'FileText',
      'markdown': 'FileText',
      // Code files
      'js': 'Code',
      'jsx': 'Code',
      'ts': 'Code',
      'tsx': 'Code',
      'html': 'Code',
      'css': 'Code',
      'json': 'Database',
      'xml': 'Code',
      // Config files
      'config': 'Settings',
      'ini': 'Settings',
      'yaml': 'Settings',
      'yml': 'Settings',
      // Default
      'default': 'File'
    };

    return iconMap[ext] || iconMap[type] || iconMap['default'];
  };

  // Update recent files when a file is accessed
  const updateRecentFiles = (fileName) => {
    const currentRecent = JSON.parse(localStorage.getItem('recentFiles') || '[]');
    const updatedRecent = [
      fileName,
      ...currentRecent.filter(name => name !== fileName)
    ].slice(0, 10); // Keep only last 10 recent files
    
    setRecentFiles(updatedRecent);
    localStorage.setItem('recentFiles', JSON.stringify(updatedRecent));
  };

  // Create folder
  const createFolder = (folderName, parentPath = '/') => {
    try {
      if (!folderName.trim()) {
        throw new Error('Folder name is required');
      }

      const newFolder = {
        id: Date.now().toString(),
        name: folderName.trim(),
        path: `${parentPath}${folderName.trim()}/`,
        parentPath,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const currentFolders = JSON.parse(localStorage.getItem('folderSystem') || '[]');
      const updatedFolders = [...currentFolders, newFolder];
      
      setFolders(updatedFolders);
      localStorage.setItem('folderSystem', JSON.stringify(updatedFolders));
      
      return { success: true, folder: newFolder };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Enhanced saveFile with folder support, encryption, and compression
  const saveFile = ({ name, content, type = 'text', path = '/', encrypt = false, compress = false, encryptionKey = null }) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!name || !content) {
        throw new Error('Name and content are required');
      }

      let processedContent = content;
      
      // Apply compression if requested
      if (compress) {
        processedContent = compressContent(processedContent);
      }
      
      // Apply encryption if requested
      if (encrypt) {
        processedContent = encryptContent(processedContent, encryptionKey);
      }

      const newFile = {
        id: Date.now().toString(),
        name,
        content: processedContent,
        originalContent: content,
        type,
        path,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastOpened: new Date().toISOString(),
        size: new Blob([content]).size,
        tags: [],
        isEncrypted: encrypt,
        isCompressed: compress,
        icon: getFileIcon(name, type)
      };

      const currentFiles = JSON.parse(localStorage.getItem('fileSystem') || '[]');
      const existingFileIndex = currentFiles.findIndex(file => file.name === name && file.path === path);
      
      let updatedFiles;
      if (existingFileIndex !== -1) {
        updatedFiles = [...currentFiles];
        updatedFiles[existingFileIndex] = {
          ...updatedFiles[existingFileIndex],
          content: processedContent,
          originalContent: content,
          type,
          updatedAt: new Date().toISOString(),
          lastOpened: new Date().toISOString(),
          size: new Blob([content]).size,
          isEncrypted: encrypt,
          isCompressed: compress
        };
      } else {
        updatedFiles = [...currentFiles, newFile];
      }
      
      updateRecentFiles(name);
      saveToLocalStorage(updatedFiles);
      setFiles(updatedFiles);

      return { success: true, file: newFile };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced getFile with decryption and decompression
  const getFile = (name, path = '/') => {
    try {
      if (!name) {
        throw new Error('File name is required');
      }
      
      const file = files.find(file => file.name === name && file.path === path);
      if (!file) {
        throw new Error(`File '${name}' not found`);
      }
      
      // Update recent files and last opened
      updateRecentFiles(name);
      
      // Process content if encrypted or compressed
      let processedContent = file.content;
      
      if (file.isEncrypted) {
        processedContent = decryptContent(processedContent);
      }
      
      if (file.isCompressed) {
        processedContent = decompressContent(processedContent);
      }
      
      return {
        ...file,
        content: processedContent,
        lastOpened: new Date().toISOString()
      };
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  // Get files by type with optional path filtering
  const getFilesByType = (type, path = null) => {
    try {
      let filteredFiles = files.filter(file => file.type === type);
      
      if (path !== null) {
        filteredFiles = filteredFiles.filter(file => file.path === path);
      }
      
      return filteredFiles;
    } catch (error) {
      setError('Failed to filter files by type');
      return [];
    }
  };

  // Get files in current path
  const getFilesInPath = (path = '/') => {
    try {
      return files.filter(file => file.path === path);
    } catch (error) {
      setError('Failed to get files in path');
      return [];
    }
  };

  // Get folders in current path
  const getFoldersInPath = (path = '/') => {
    try {
      return folders.filter(folder => folder.parentPath === path);
    } catch (error) {
      setError('Failed to get folders in path');
      return [];
    }
  };

  // Navigation helpers
  const navigateToPath = (path) => {
    setCurrentPath(path);
  };

  const navigateUp = () => {
    if (currentPath === '/') return;
    
    const pathParts = currentPath.split('/').filter(Boolean);
    pathParts.pop();
    const parentPath = pathParts.length > 0 ? `/${pathParts.join('/')}/` : '/';
    setCurrentPath(parentPath);
  };

  // Enhanced deleteFile with path support
  const deleteFile = (name, path = '/') => {
    try {
      setIsLoading(true);
      setError(null);

      if (!name) {
        throw new Error('File name is required');
      }

      const currentFiles = JSON.parse(localStorage.getItem('fileSystem') || '[]');
      const fileExists = currentFiles.some(file => file.name === name && file.path === path);
      
      if (!fileExists) {
        throw new Error(`File '${name}' not found`);
      }

      const updatedFiles = currentFiles.filter(file => !(file.name === name && file.path === path));
      
      // Remove from recent files
      const currentRecent = JSON.parse(localStorage.getItem('recentFiles') || '[]');
      const updatedRecent = currentRecent.filter(fileName => fileName !== name);
      setRecentFiles(updatedRecent);
      localStorage.setItem('recentFiles', JSON.stringify(updatedRecent));
      
      saveToLocalStorage(updatedFiles);
      setFiles(updatedFiles);
      
      return { success: true, message: `File '${name}' deleted successfully` };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete folder
  const deleteFolder = (folderPath) => {
    try {
      setIsLoading(true);
      setError(null);

      // Delete all files in folder
      const currentFiles = JSON.parse(localStorage.getItem('fileSystem') || '[]');
      const updatedFiles = currentFiles.filter(file => !file.path.startsWith(folderPath));
      
      // Delete folder
      const currentFolders = JSON.parse(localStorage.getItem('folderSystem') || '[]');
      const updatedFolders = currentFolders.filter(folder => folder.path !== folderPath);
      
      setFiles(updatedFiles);
      setFolders(updatedFolders);
      
      localStorage.setItem('fileSystem', JSON.stringify(updatedFiles));
      localStorage.setItem('folderSystem', JSON.stringify(updatedFolders));
      
      return { success: true, message: `Folder deleted successfully` };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Get recent files
  const getRecentFiles = () => {
    try {
      return recentFiles.map(fileName => {
        const file = files.find(f => f.name === fileName);
        return file ? {
          ...file,
          content: file.originalContent || file.content // Use original content for display
        } : null;
      }).filter(Boolean);
    } catch (error) {
      setError('Failed to get recent files');
      return [];
    }
  };

  // Enhanced search with path support
  const searchFiles = (query, path = null) => {
    try {
      if (!query) return files;
      
      let searchFiles = files;
      if (path !== null) {
        searchFiles = files.filter(file => file.path === path);
      }
      
      return searchFiles.filter(file => 
        file.name.toLowerCase().includes(query.toLowerCase()) ||
        (file.originalContent || file.content).toLowerCase().includes(query.toLowerCase()) ||
        (file.tags && file.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      );
    } catch (error) {
      setError('Failed to search files');
      return [];
    }
  };

  // Clear all data
  const clearAllFiles = () => {
    try {
      setFiles([]);
      setFolders([]);
      setRecentFiles([]);
      localStorage.removeItem('fileSystem');
      localStorage.removeItem('folderSystem');
      localStorage.removeItem('recentFiles');
      
      return { success: true, message: 'All data cleared successfully' };
    } catch (error) {
      setError('Failed to clear all data');
      return { success: false, error: 'Failed to clear all data' };
    }
  };

  return {
    
    files,
    folders,
    currentPath,
    recentFiles,
    isLoading,
    error,
    
    // File operations
    saveFile,
    getFile,
    getFiles: () => files,
    getFilesByType,
    getFilesInPath,
    deleteFile,
    
    // Folder operations
    createFolder,
    deleteFolder,
    getFoldersInPath,
    
    // Navigation
    navigateToPath,
    navigateUp,
    
    // Recent files
    getRecentFiles,
    updateRecentFiles,
    
    // Search
    searchFiles,
    
    // Utilities
    clearAllFiles,
    refreshFiles: () => {
      const savedFiles = localStorage.getItem('fileSystem');
      const savedFolders = localStorage.getItem('folderSystem');
      const savedRecent = localStorage.getItem('recentFiles');
      
      if (savedFiles) setFiles(JSON.parse(savedFiles));
      if (savedFolders) setFolders(JSON.parse(savedFolders));
      if (savedRecent) setRecentFiles(JSON.parse(savedRecent));
    },
    setCurrentPath,
    navigateToPath: (path) => setCurrentPath(path),
    navigateUp: () => {
      if (currentPath === '/') return;
      const pathParts = currentPath.split('/').filter(Boolean);
      pathParts.pop();
      const parentPath = pathParts.length > 0 ? `/${pathParts.join('/')}/` : '/';
      setCurrentPath(parentPath);
    },
    getFilesInPath: (path) => files.filter(file => file.path === path),
    getFoldersInPath: (path) => folders.filter(folder => folder.parentPath === path),
    getRecentFiles: () => recentFiles.map(fileName => files.find(f => f.name === fileName)).filter(Boolean),
    searchFiles: (query) => files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      (file.originalContent || file.content).toLowerCase().includes(query.toLowerCase())
    ),
    getFilesByType: (type) => files.filter(file => file.type === type),
    getFile: (name, path = '/') => files.find(file => file.name === name && file.path === path),
    deleteFile: (name, path = '/') => {
      const updatedFiles = files.filter(file => !(file.name === name && file.path === path));
      saveToLocalStorage(updatedFiles);
      setFiles(updatedFiles);
      return { success: true };
    },
    createFolder: (name, parentPath = '/') => {
      const newFolder = {
        id: Date.now().toString(),
        name: name.trim(),
        path: `${parentPath}${name.trim()}/`,
        parentPath,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedFolders = [...folders, newFolder];
      setFolders(updatedFolders);
      localStorage.setItem('folderSystem', JSON.stringify(updatedFolders));
      return { success: true, folder: newFolder };
    },
    deleteFolder: (folderPath) => {
      const updatedFolders = folders.filter(folder => folder.path !== folderPath);
      const updatedFiles = files.filter(file => !file.path.startsWith(folderPath));
      setFolders(updatedFolders);
      setFiles(updatedFiles);
      localStorage.setItem('folderSystem', JSON.stringify(updatedFolders));
      saveToLocalStorage(updatedFiles);
      return { success: true };
    },
    refreshFiles: () => {
      const savedFiles = localStorage.getItem('fileSystem');
      const savedFolders = localStorage.getItem('folderSystem');
      const savedRecent = localStorage.getItem('recentFiles');
      
      if (savedFiles) setFiles(JSON.parse(savedFiles));
      if (savedFolders) setFolders(JSON.parse(savedFolders));
      if (savedRecent) setRecentFiles(JSON.parse(savedRecent));
    },
    clearAllFiles: () => {
      setFiles([]);
      setFolders([]);
      setRecentFiles([]);
      localStorage.removeItem('fileSystem');
      localStorage.removeItem('folderSystem');
      localStorage.removeItem('recentFiles');
      return { success: true };
    }
  };
};

export default useFileSystem;


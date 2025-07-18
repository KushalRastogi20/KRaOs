'use client';

import { useState, useEffect } from 'react';
import useFileSystem from "@/hooks/useFileSystem";
import { 
  FileText, 
  Save, 
  FolderOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Clock, 
  Zap, 
  Eye, 
  Download,
  Copy,
  RotateCcw,
  Type,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  List,
  CheckSquare,
  X,
  Sparkles,
  BookOpen,
  PenTool,
  Layers,
  Folder,
  FolderPlus,
  ArrowLeft,
  ArrowRight,
  Home,
  Star,
  Shield,
  Archive,
  Filter,
  Code,
  Database,
  Settings,
  File,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const Notepad = () => {
  const {
    files,
    folders,
    currentPath,
    recentFiles,
    isLoading,
    error,
    saveFile,
    getFile,
    getFilesByType,
    getFilesInPath,
    getFoldersInPath,
    deleteFile,
    createFolder,
    deleteFolder,
    navigateToPath,
    navigateUp,
    getRecentFiles,
    searchFiles
  } = useFileSystem();

  // Main states
  const [currentFile, setCurrentFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [viewMode, setViewMode] = useState('explorer'); // 'explorer', 'editor', 'split'
  
  // File system states
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('text');
  const [showRecent, setShowRecent] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  // File options
  const [enableEncryption, setEnableEncryption] = useState(false);
  const [enableCompression, setEnableCompression] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');
  
  // Editor states
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [charCount, setCharCount] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('mono');
  
  // UI states
  const [notification, setNotification] = useState(null);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  // Get current files and folders
  const currentFiles = getFilesInPath(currentPath).filter(file => {
    if (fileTypeFilter === 'all') return true;
    return file.type === fileTypeFilter;
  });
  
  const currentFolders = getFoldersInPath(currentPath);
  const recentFilesList = getRecentFiles();

  // Filter files based on search
  const filteredFiles = searchQuery 
    ? searchFiles(searchQuery, currentPath).filter(file => {
        if (fileTypeFilter === 'all') return true;
        return file.type === fileTypeFilter;
      })
    : currentFiles;

  // File type configurations with icons
  const fileTypes = [
    { value: 'all', label: 'All Files', icon: File, color: 'from-gray-500 to-slate-500' },
    { value: 'text', label: 'Text Files', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { value: 'code', label: 'Code Files', icon: Code, color: 'from-green-500 to-emerald-500' },
    { value: 'json', label: 'JSON Files', icon: Database, color: 'from-purple-500 to-pink-500' },
    { value: 'markdown', label: 'Markdown', icon: FileText, color: 'from-orange-500 to-red-500' },
    { value: 'config', label: 'Config Files', icon: Settings, color: 'from-gray-500 to-slate-500' }
  ];

  // Icon mapping for files
  const iconMapping = {
    'FileText': FileText,
    'Code': Code,
    'Database': Database,
    'Settings': Settings,
    'File': File
  };

  // Update statistics when content changes
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content.split('\n').length;
    const chars = content.length;
    
    setWordCount(words);
    setLineCount(lines);
    setCharCount(chars);
    
    if (isEditing && (currentFile?.content !== content || currentFile?.name !== fileName)) {
      setHasUnsavedChanges(true);
    }
  }, [content, fileName, isEditing, currentFile]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasUnsavedChanges && fileName.trim() && content.trim()) {
      const saveTimer = setTimeout(() => {
        handleSave(false);
      }, 3000);
      return () => clearTimeout(saveTimer);
    }
  }, [content, fileName, hasUnsavedChanges, autoSave]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (showNotif = true) => {
    if (!fileName.trim()) {
      showNotification('Please enter a file name', 'error');
      return;
    }
    
    if (!content.trim()) {
      showNotification('Cannot save empty file', 'error');
      return;
    }

    const result = saveFile({
      name: fileName.trim(),
      content: content,
      type: 'text',
      path: currentPath,
      encrypt: enableEncryption,
      compress: enableCompression,
      encryptionKey: encryptionKey || undefined
    });

    if (result.success) {
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      setCurrentFile({
        name: fileName.trim(),
        content: content,
        type: 'text',
        path: currentPath
      });
      
      if (showNotif) {
        showNotification('File saved successfully!');
      }
    } else {
      showNotification(`Error saving file: ${result.error}`, 'error');
    }
  };

  const handleOpenFile = (file) => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to open another file?')) {
        return;
      }
    }

    const fileData = getFile(file.name, file.path);
    if (fileData) {
      setCurrentFile(fileData);
      setFileName(fileData.name);
      setContent(fileData.content);
      setIsEditing(true);
      setHasUnsavedChanges(false);
      setViewMode('editor');
      showNotification(`Opened ${fileData.name}`, 'info');
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      showNotification('Please enter a folder name', 'error');
      return;
    }

    const result = createFolder(newFolderName.trim(), currentPath);
    if (result.success) {
      showNotification('Folder created successfully!');
      setNewFolderName('');
      setShowCreateFolder(false);
    } else {
      showNotification(`Error creating folder: ${result.error}`, 'error');
    }
  };

  const handleDeleteFile = (fileName, filePath) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const result = deleteFile(fileName, filePath);
      if (result.success) {
        showNotification('File deleted successfully!');
        
        if (currentFile?.name === fileName && currentFile?.path === filePath) {
          setCurrentFile(null);
          setFileName('');
          setContent('');
          setIsEditing(false);
          setHasUnsavedChanges(false);
        }
      } else {
        showNotification(`Error deleting file: ${result.error}`, 'error');
      }
    }
  };

  const handleDeleteFolder = (folderPath) => {
    if (window.confirm(`Are you sure you want to delete this folder and all its contents?`)) {
      const result = deleteFolder(folderPath);
      if (result.success) {
        showNotification('Folder deleted successfully!');
      } else {
        showNotification(`Error deleting folder: ${result.error}`, 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderBreadcrumb = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    
    return (
      <div className="flex items-center gap-2 text-sm text-white/70">
        <button
          onClick={() => navigateToPath('/')}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        
        {pathParts.map((part, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3" />
            <button
              onClick={() => navigateToPath(`/${pathParts.slice(0, index + 1).join('/')}/`)}
              className="hover:text-white transition-colors"
            >
              {part}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderFileExplorer = () => (
    <div className="space-y-4">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between p-4 bg-black/30 border border-purple-500/30 rounded-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={navigateUp}
            disabled={currentPath === '/'}
            className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShowCreateFolder(true)}
            className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-white/20 mx-2"></div>
          
          {renderBreadcrumb()}
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
            className="px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50"
          >
            {fileTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowRecent(!showRecent)}
            className={`p-2 rounded-lg border transition-all ${
              showRecent 
                ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' 
                : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
            }`}
          >
            <Star className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="p-4 bg-black/40 border border-green-500/30 rounded-lg">
          <h3 className="text-white font-medium mb-3">Create New Folder</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name..."
              className="flex-1 px-3 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-green-500/50"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <button
              onClick={handleCreateFolder}
              className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName('');
              }}
              className="px-4 py-2 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-gray-500/30 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Recent Files */}
      {showRecent && (
        <div className="p-4 bg-black/30 border border-yellow-500/30 rounded-lg">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            Recent Files
          </h3>
          <div className="space-y-2">
            {recentFilesList.length === 0 ? (
              <p className="text-white/60 text-sm">No recent files</p>
            ) : (
              recentFilesList.slice(0, 5).map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-black/30 rounded-lg hover:bg-black/40 cursor-pointer transition-colors"
                  onClick={() => handleOpenFile(file)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-yellow-400" />
                    </div>
                    <span className="text-white text-sm">{file.name}</span>
                  </div>
                  <span className="text-white/60 text-xs">{formatDate(file.lastOpened)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Files and Folders Grid */}
      <div className="space-y-2">
        {/* Folders */}
        {currentFolders.map((folder) => (
          <div
            key={folder.id}
            className="flex items-center justify-between p-3 bg-black/30 border border-purple-500/20 rounded-lg hover:bg-black/40 cursor-pointer transition-colors"
            onClick={() => navigateToPath(folder.path)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Folder className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">{folder.name}</h3>
                <p className="text-white/60 text-sm">{formatDate(folder.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.path);
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}

        {/* Files */}
        {filteredFiles.map((file) => {
          const IconComponent = iconMapping[file.icon] || FileText;
          return (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-black/30 border border-cyan-500/20 rounded-lg hover:bg-black/40 cursor-pointer transition-colors"
              onClick={() => handleOpenFile(file)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{file.name}</h3>
                    {file.isEncrypted && (
                      <Shield className="w-3 h-3 text-green-400" title="Encrypted" />
                    )}
                    {file.isCompressed && (
                      <Archive className="w-3 h-3 text-blue-400" title="Compressed" />
                    )}
                  </div>
                  <p className="text-white/60 text-sm">
                    {formatFileSize(file.size)} • {formatDate(file.updatedAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.name, file.path);
                  }}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredFiles.length === 0 && currentFolders.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
            <p className="text-white/60 text-lg">No files found</p>
            <p className="text-white/40 text-sm mt-2">Create your first file to get started</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="notepad-app h-full bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border backdrop-blur-sm flex items-center gap-2 ${
          notification.type === 'error' 
            ? 'bg-red-500/20 border-red-500/30 text-red-300' 
            : notification.type === 'info'
            ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
            : 'bg-green-500/20 border-green-500/30 text-green-300'
        }`}>
          <Sparkles className="w-4 h-4" />
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-purple-500/30 p-4 bg-black/40 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Quantum Notepad</h1>
              <p className="text-purple-300 text-sm">
                {fileName || 'Untitled'} {hasUnsavedChanges && '*'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('explorer')}
              className={`px-3 py-2 rounded-lg border transition-all ${
                viewMode === 'explorer'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-2 rounded-lg border transition-all ${
                viewMode === 'editor'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-2 rounded-lg border transition-all ${
                viewMode === 'split'
                  ? 'bg-green-500/20 border-green-500/40 text-green-300'
                  : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer Panel */}
        {(viewMode === 'explorer' || viewMode === 'split') && (
          <div className="w-full lg:w-80 border-r border-purple-500/30 bg-black/20 overflow-auto">
            <div className="p-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-full pl-10 pr-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 text-sm"
                />
              </div>

              {renderFileExplorer()}
            </div>
          </div>
        )}

        {/* Editor Panel */}
        {(viewMode === 'editor' || viewMode === 'split') && (
          <div className="flex-1 flex flex-col">
            {/* Editor Toolbar */}
            <div className="p-3 border-b border-purple-500/30 bg-black/30 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentFile(null);
                      setFileName('');
                      setContent('');
                      setIsEditing(true);
                      setHasUnsavedChanges(false);
                    }}
                    className="p-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleSave()}
                    className="p-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  
                  <div className="w-px h-6 bg-white/20 mx-2"></div>
                  
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="px-2 py-1 bg-black/30 border border-purple-500/30 rounded text-white text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                    <option value={18}>18px</option>
                    <option value={20}>20px</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={enableEncryption}
                      onChange={(e) => setEnableEncryption(e.target.checked)}
                      className="w-3 h-3"
                    />
                    <Shield className="w-3 h-3" />
                    Encrypt
                  </label>
                  
                  <label className="flex items-center gap-2 text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={enableCompression}
                      onChange={(e) => setEnableCompression(e.target.checked)}
                      className="w-3 h-3"
                    />
                    <Archive className="w-3 h-3" />
                    Compress
                  </label>
                  
                  <label className="flex items-center gap-2 text-xs text-white/70">
                    <input
                      type="checkbox"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="w-3 h-3"
                    />
                    Auto Save
                  </label>
                </div>
              </div>
            </div>

            {/* File Name Input */}
            <div className="p-3 border-b border-purple-500/30 bg-black/20 flex gap-2">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name..."
                className="flex-1 px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
              />
              
              {enableEncryption && (
                <input
                  type="password"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  placeholder="Encryption key..."
                  className="w-32 px-3 py-2 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-green-500/50"
                />
              )}
            </div>

            {/* Editor */}
            <div className="flex-1 p-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start typing your quantum notes..."
                className="w-full h-full bg-black/30 border border-purple-500/30 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 resize-none"
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily === 'mono' ? 'monospace' : fontFamily === 'serif' ? 'serif' : 'sans-serif'
                }}
              />
            </div>

            {/* Status Bar */}
            <div className="p-3 border-t border-purple-500/30 bg-black/30 flex-shrink-0">
              <div className="flex items-center justify-between text-xs text-white/60">
                <div className="flex items-center gap-4">
                  <span>{charCount} chars</span>
                  <span>{wordCount} words</span>
                  <span>{lineCount} lines</span>
                  <span>{currentPath}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {enableEncryption && (
                    <span className="flex items-center gap-1 text-green-400">
                      <Shield className="w-3 h-3" />
                      Encrypted
                    </span>
                  )}
                  {enableCompression && (
                    <span className="flex items-center gap-1 text-blue-400">
                      <Archive className="w-3 h-3" />
                      Compressed
                    </span>
                  )}
                  {lastSaved && (
                    <span className="flex items-center gap-1 text-green-400">
                      <Clock className="w-3 h-3" />
                      Saved {formatDate(lastSaved)}
                    </span>
                  )}
                  {hasUnsavedChanges && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Zap className="w-3 h-3" />
                      Unsaved changes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notepad;

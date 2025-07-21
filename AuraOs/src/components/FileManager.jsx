'use client';

import { useState, useEffect } from 'react';
import useFileSystem from "@/hooks/useFileSystem";
import { useSettings } from '@/app/contexts/SettingsContext';

import { 
  Search, 
  Plus, 
  Save, 
  Edit, 
  Trash2, 
  FileText, 
  Code, 
  Image, 
  Music, 
  Video, 
  Archive, 
  Eye, 
  EyeOff, 
  Tag, 
  Calendar, 
  HardDrive, 
  Download, 
  Copy, 
  Filter,
  Grid,
  List,
  X,
  Check,
  AlertCircle,
  Zap,
  Sparkles,
  Database,
  Shield,
  Settings as SettingsIcon,
  RefreshCw,
  FolderOpen,
  Type
} from 'lucide-react';

const FileManager = () => {
  const { settings, updateSetting } = useSettings();
  const {
    files,
    isLoading,
    error,
    saveFile,
    getFiles,
    getFile,
    deleteFile,
    clearAllFiles,
    searchFiles,
    getFilesByType,
    updateFileTags,
    refreshFiles
  } = useFileSystem();

  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [newFileType, setNewFileType] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [displayMode, setDisplayMode] = useState('grid');
  const [notification, setNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTags, setNewTags] = useState('');
  
  // Settings-based file options
  const [enableEncryption, setEnableEncryption] = useState(settings.encryptByDefault);
  const [enableCompression, setEnableCompression] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');

  // Update encryption default when settings change
  useEffect(() => {
    setEnableEncryption(settings.encryptByDefault);
  }, [settings.encryptByDefault]);

  // File type configurations
  const fileTypes = [
    { value: 'text', label: 'Text', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { value: 'code', label: 'Code', icon: Code, color: 'from-green-500 to-emerald-500' },
    { value: 'json', label: 'JSON', icon: Database, color: 'from-purple-500 to-pink-500' },
    { value: 'markdown', label: 'Markdown', icon: FileText, color: 'from-orange-500 to-red-500' },
    { value: 'config', label: 'Config', icon: Archive, color: 'from-gray-500 to-slate-500' }
  ];

  // Update filtered files when search query or files change
  useEffect(() => {
    let filtered = searchQuery ? searchFiles(searchQuery) : files;
    
    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(file => file.type === fileTypeFilter);
    }
    
    setFilteredFiles(filtered);
  }, [searchQuery, files, fileTypeFilter]);

  const showNotification = (message, type = 'success') => {
    if (settings.soundEffects) {
      console.log(`Sound: ${type} notification`);
    }
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveFile = () => {
    if (!newFileName.trim() || !newFileContent.trim()) {
      showNotification('Please enter both file name and content', 'error');
      return;
    }

    const result = saveFile({
      name: newFileName.trim(),
      content: newFileContent.trim(),
      type: newFileType,
      path: settings.defaultFolderPath || '/',
      encrypt: enableEncryption,
      compress: enableCompression,
      encryptionKey: encryptionKey || undefined
    });

    if (result.success) {
      setNewFileName('');
      setNewFileContent('');
      setNewFileType('text');
      showNotification(`File saved successfully!${enableEncryption ? ' (encrypted)' : ''}${enableCompression ? ' (compressed)' : ''}`);
      setViewMode('list');
    } else {
      showNotification(`Error saving file: ${result.error}`, 'error');
    }
  };

  const handleViewFile = (fileName) => {
    const file = getFile(fileName);
    if (file) {
      setSelectedFile(file);
      setNewTags(file.tags ? file.tags.join(', ') : '');
      setViewMode('edit');
      setIsEditing(false);
    }
  };

  const handleEditFile = (fileName) => {
    const file = getFile(fileName);
    if (file) {
      setSelectedFile(file);
      setNewTags(file.tags ? file.tags.join(', ') : '');
      setViewMode('edit');
      setIsEditing(true);
    }
  };

  const handleDeleteFile = (fileName) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const result = deleteFile(fileName);
      if (result.success) {
        showNotification('File deleted successfully!');
        if (selectedFile && selectedFile.name === fileName) {
          setSelectedFile(null);
          setViewMode('list');
        }
      } else {
        showNotification(`Error deleting file: ${result.error}`, 'error');
      }
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected files?`)) {
      selectedFiles.forEach(fileName => {
        deleteFile(fileName);
      });
      setSelectedFiles([]);
      showNotification(`${selectedFiles.length} files deleted successfully!`);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all files? This action cannot be undone.')) {
      const result = clearAllFiles();
      if (result.success) {
        showNotification('All files cleared successfully!');
        setSelectedFile(null);
        setViewMode('list');
      } else {
        showNotification(`Error clearing files: ${result.error}`, 'error');
      }
    }
  };

  const handleUpdateTags = () => {
    if (selectedFile) {
      const tags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const result = updateFileTags(selectedFile.name, tags);
      if (result.success) {
        showNotification('Tags updated successfully!');
        setSelectedFile({ ...selectedFile, tags });
      } else {
        showNotification('Error updating tags', 'error');
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (type) => {
    const fileType = fileTypes.find(ft => ft.value === type);
    return fileType ? fileType.icon : FileText;
  };

  const getFileColor = (type) => {
    const fileType = fileTypes.find(ft => ft.value === type);
    return fileType ? fileType.color : 'from-gray-500 to-slate-500';
  };

  const handleFileSelect = (fileName) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const downloadFile = (file) => {
    try {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('File downloaded successfully!');
    } catch (error) {
      showNotification('Failed to download file', 'error');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Content copied to clipboard!');
    }).catch(() => {
      showNotification('Failed to copy to clipboard', 'error');
    });
  };

  const handleRefresh = () => {
    refreshFiles();
    showNotification('Files refreshed!', 'info');
  };

  const handleExportAll = () => {
    try {
      const dataStr = JSON.stringify(files, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'quantum-files-export.json';
      link.click();
      URL.revokeObjectURL(url);
      showNotification('Files exported successfully!');
    } catch (error) {
      showNotification('Failed to export files', 'error');
    }
  };

  return (
    <div className="file-manager h-full bg-primary backdrop-blur-xl border border-[var(--bg-secondary)] rounded-lg overflow-hidden"
      style={{
        opacity: settings.animations ? 1 : 0.95,
        transition: settings.animations ? 'all 0.3s ease' : 'none'
      }}
    >
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border backdrop-blur-sm flex items-center gap-2 transition-all ${
          settings.animations ? 'animate-slide-in-right' : ''
        } ${
          notification.type === 'error' 
            ? 'bg-red-500/20 border-red-500/30 text-red-300' 
            : notification.type === 'info'
            ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
            : 'bg-green-500/20 border-green-500/30 text-green-300'
        }`}>
          {notification.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[var(--bg-secondary)] p-4 bg-secondary">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Quantum File Manager</h1>
              <p className="text-secondary text-sm">
                Neural File System v2.0 • Theme: {settings.theme} 
                {settings.encryptByDefault && <span className="text-green-400 ml-2">[Auto-Encrypt ON]</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="px-3 py-2 rounded-lg border bg-secondary border-[var(--bg-secondary)] text-secondary hover:bg-primary transition-all"
              title="Refresh Files"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-secondary border-[var(--bg-secondary)] text-secondary hover:bg-primary'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('edit')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                viewMode === 'edit'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-secondary border-[var(--bg-secondary)] text-secondary hover:bg-primary'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 m-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="mt-2 text-purple-300">Processing quantum data...</p>
        </div>
      )}

      {/* File List View */}
      {viewMode === 'list' && (
        <div className="p-4 h-full overflow-auto">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quantum files..."
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-purple-500/50"
                style={{
                  fontSize: settings.fontSize === 'small' ? '12px' : 
                           settings.fontSize === 'large' ? '16px' : '14px'
                }}
              />
            </div>
            
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="px-4 py-2 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary focus:outline-none focus:border-purple-500/50"
            >
              <option value="all">All Types</option>
              {fileTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <button
              onClick={() => setDisplayMode(displayMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all"
            >
              {displayMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
            
            <button
              onClick={handleExportAll}
              className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all"
              title="Export All Files"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Settings Panel */}
          <div className="bg-secondary border border-cyan-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-cyan-400" />
              Quick Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={settings.encryptByDefault}
                  onChange={(e) => updateSetting('encryptByDefault', e.target.checked)}
                  className="w-3 h-3"
                />
                <Shield className="w-3 h-3" />
                Default Encryption
              </label>
              
              <label className="flex items-center gap-2 text-sm text-secondary">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => updateSetting('autoSave', e.target.checked)}
                  className="w-3 h-3"
                />
                <Save className="w-3 h-3" />
                Auto Save
              </label>
              
              <div className="flex items-center gap-2">
                <Type className="w-3 h-3 text-secondary" />
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', e.target.value)}
                  className="px-2 py-1 bg-secondary border border-[var(--bg-secondary)] rounded text-primary text-xs focus:outline-none"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* File Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Total Files</p>
                  <p className="text-2xl font-bold text-primary">{files.length}</p>
                </div>
                <HardDrive className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-secondary border border-cyan-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm">Total Size</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
                  </p>
                </div>
                <Database className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            
            <div className="bg-secondary border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Selected</p>
                  <p className="text-2xl font-bold text-primary">{selectedFiles.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFiles.length > 0 && (
            <div className="bg-secondary border border-yellow-500/30 rounded-lg p-4 mb-4 flex items-center justify-between">
              <span className="text-yellow-300">{selectedFiles.length} files selected</span>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedFiles([])}
                  className="px-4 py-2 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-gray-500/30 transition-all"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Files Grid/List */}
          {filteredFiles.length === 0 ? (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
              <p className="text-secondary text-lg">No quantum files found</p>
              <p className="text-secondary text-sm mt-2">
                Create your first neural file to get started
                {settings.encryptByDefault && <span className="block text-green-400 mt-1">New files will be encrypted by default</span>}
              </p>
            </div>
          ) : (
            <div className={displayMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
              {filteredFiles.map((file) => {
                const IconComponent = getFileIcon(file.type);
                const isSelected = selectedFiles.includes(file.name);
                
                return displayMode === 'grid' ? (
                  <div
                    key={file.id}
                    className={`bg-secondary border rounded-lg p-4 cursor-pointer transition-all hover:bg-primary ${
                      isSelected ? 'border-purple-500/50 bg-purple-500/10' : 'border-[var(--bg-secondary)]'
                    }`}
                    onClick={() => handleFileSelect(file.name)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getFileColor(file.type)} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFile(file.name);
                          }}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(file.name);
                          }}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file);
                          }}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Download className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(file.content);
                          }}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Copy className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.name);
                          }}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-primary font-medium truncate flex items-center gap-2">
                        {file.name}
                        {file.isEncrypted && <Shield className="w-3 h-3 text-green-400" />}
                        {file.isCompressed && <Archive className="w-3 h-3 text-blue-400" />}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{formatDate(file.updatedAt)}</span>
                    </div>
                    
                    {file.tags && file.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {file.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {file.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded-full">
                            +{file.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={file.id}
                    className={`bg-secondary border rounded-lg p-3 cursor-pointer transition-all hover:bg-primary ${
                      isSelected ? 'border-purple-500/50 bg-purple-500/10' : 'border-[var(--bg-secondary)]'
                    }`}
                    onClick={() => handleFileSelect(file.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${getFileColor(file.type)} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-primary font-medium flex items-center gap-2">
                            {file.name}
                            {file.isEncrypted && <Shield className="w-3 h-3 text-green-400" />}
                            {file.isCompressed && <Archive className="w-3 h-3 text-blue-400" />}
                          </h3>
                          <p className="text-secondary text-sm">{formatFileSize(file.size)} • {formatDate(file.updatedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFile(file.name);
                          }}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(file.name);
                          }}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file);
                          }}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Download className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(file.content);
                          }}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Copy className="w-4 h-4 text-secondary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.name);
                          }}
                          className="p-2 hover:bg-secondary rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Clear All Button */}
          {files.length > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2 mx-auto"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Files
              </button>
            </div>
          )}
        </div>
      )}

      {/* Create/Edit View */}
      {viewMode === 'edit' && (
        <div className="p-4 h-full overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-400" />
                {selectedFile ? (isEditing ? `Edit: ${selectedFile.name}` : `View: ${selectedFile.name}`) : 'Create New File'}
              </h2>
              
              {selectedFile && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all flex items-center gap-2"
                  >
                    {isEditing ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    {isEditing ? 'View' : 'Edit'}
                  </button>
                  
                  <button
                    onClick={() => downloadFile(selectedFile)}
                    className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  
                  <button
                    onClick={() => copyToClipboard(selectedFile.content)}
                    className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={selectedFile ? selectedFile.name : newFileName}
                    onChange={(e) => {
                      if (selectedFile && isEditing) {
                        setSelectedFile({...selectedFile, name: e.target.value});
                      } else if (!selectedFile) {
                        setNewFileName(e.target.value);
                      }
                    }}
                    disabled={selectedFile && !isEditing}
                    className="w-full px-4 py-3 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    placeholder="Enter quantum file name..."
                    style={{
                      fontSize: settings.fontSize === 'small' ? '12px' : 
                               settings.fontSize === 'large' ? '16px' : '14px'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    File Type
                  </label>
                  <select
                    value={selectedFile ? selectedFile.type : newFileType}
                    onChange={(e) => {
                      if (selectedFile && isEditing) {
                        setSelectedFile({...selectedFile, type: e.target.value});
                      } else if (!selectedFile) {
                        setNewFileType(e.target.value);
                      }
                    }}
                    disabled={selectedFile && !isEditing}
                    className="w-full px-4 py-3 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                  >
                    {fileTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={selectedFile ? selectedFile.content : newFileContent}
                    onChange={(e) => {
                      if (selectedFile && isEditing) {
                        setSelectedFile({...selectedFile, content: e.target.value});
                      } else if (!selectedFile) {
                        setNewFileContent(e.target.value);
                      }
                    }}
                    disabled={selectedFile && !isEditing}
                    rows={20}
                    className="w-full px-4 py-3 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-purple-500/50 font-mono text-sm disabled:opacity-50"
                    placeholder={`Enter quantum file content...

Current settings:
• Default path: ${settings.defaultFolderPath}
• Auto-encryption: ${settings.encryptByDefault ? 'ON' : 'OFF'}
• Theme: ${settings.theme}
• Font size: ${settings.fontSize}`}
                    style={{
                      fontSize: settings.fontSize === 'small' ? '11px' : 
                               settings.fontSize === 'large' ? '15px' : '13px'
                    }}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* File Options */}
                <div className="bg-secondary border border-cyan-500/30 rounded-lg p-4">
                  <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
                    <SettingsIcon className="w-4 h-4 text-cyan-400" />
                    File Options
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm text-secondary">
                      <input
                        type="checkbox"
                        checked={enableEncryption}
                        onChange={(e) => setEnableEncryption(e.target.checked)}
                        className="w-3 h-3"
                      />
                      <Shield className="w-3 h-3" />
                      Encrypt File
                    </label>
                    
                    <label className="flex items-center gap-2 text-sm text-secondary">
                      <input
                        type="checkbox"
                        checked={enableCompression}
                        onChange={(e) => setEnableCompression(e.target.checked)}
                        className="w-3 h-3"
                      />
                      <Archive className="w-3 h-3" />
                      Compress File
                    </label>
                    
                    {enableEncryption && (
                      <input
                        type="password"
                        value={encryptionKey}
                        onChange={(e) => setEncryptionKey(e.target.value)}
                        placeholder="Encryption key..."
                        className="w-full px-3 py-2 bg-secondary border border-green-500/30 rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-green-500/50 text-sm"
                      />
                    )}
                  </div>
                </div>

                {/* File Info */}
                {selectedFile && (
                  <div className="bg-secondary border border-purple-500/30 rounded-lg p-4">
                    <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      File Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary">Size:</span>
                        <span className="text-primary">{formatFileSize(selectedFile.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Type:</span>
                        <span className="text-primary">{selectedFile.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Created:</span>
                        <span className="text-primary">{formatDate(selectedFile.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary">Modified:</span>
                        <span className="text-primary">{formatDate(selectedFile.updatedAt)}</span>
                      </div>
                      {selectedFile.isEncrypted && (
                        <div className="flex justify-between">
                          <span className="text-secondary">Encrypted:</span>
                          <span className="text-green-400">Yes</span>
                        </div>
                      )}
                      {selectedFile.isCompressed && (
                        <div className="flex justify-between">
                          <span className="text-secondary">Compressed:</span>
                          <span className="text-blue-400">Yes</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-secondary border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-primary font-medium mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="Add tags (comma separated)"
                      className="w-full px-3 py-2 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-primary placeholder-secondary focus:outline-none focus:border-purple-500/50 text-sm"
                    />
                    <button
                      onClick={handleUpdateTags}
                      className="w-full px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all text-sm"
                    >
                      Update Tags
                    </button>
                  </div>
                  
                  {selectedFile && selectedFile.tags && selectedFile.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {selectedFile.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      if (selectedFile && isEditing) {
                        const result = saveFile({
                          name: selectedFile.name,
                          content: selectedFile.content,
                          type: selectedFile.type,
                          path: settings.defaultFolderPath || '/',
                          encrypt: enableEncryption,
                          compress: enableCompression,
                          encryptionKey: encryptionKey || undefined
                        });
                        if (result.success) {
                          showNotification('File updated successfully!');
                          setIsEditing(false);
                        } else {
                          showNotification(`Error updating file: ${result.error}`, 'error');
                        }
                      } else if (!selectedFile) {
                        handleSaveFile();
                      }
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    {selectedFile ? 'Update File' : 'Save File'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setNewFileName('');
                      setNewFileContent('');
                      setNewFileType('text');
                      setNewTags('');
                      setIsEditing(false);
                      setEnableEncryption(settings.encryptByDefault);
                      setEnableCompression(false);
                      setEncryptionKey('');
                      setViewMode('list');
                    }}
                    className="w-full px-4 py-3 bg-secondary border border-[var(--bg-secondary)] rounded-lg text-secondary hover:bg-primary transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;

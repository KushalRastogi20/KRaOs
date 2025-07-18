'use client';

import { useState, useEffect } from 'react';
import useFileSystem from "@/hooks/useFileSystem";
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
  Database
} from 'lucide-react';

const FileManager = () => {
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
    updateFileTags
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
      type: newFileType
    });

    if (result.success) {
      setNewFileName('');
      setNewFileContent('');
      setNewFileType('text');
      showNotification('File saved successfully!');
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
  };

  const handleBulkDelete = () => {
    selectedFiles.forEach(fileName => {
      deleteFile(fileName);
    });
    setSelectedFiles([]);
    showNotification(`${selectedFiles.length} files deleted successfully!`);
  };

  const handleClearAll = () => {
    const result = clearAllFiles();
    if (result.success) {
      showNotification('All files cleared successfully!');
      setSelectedFile(null);
      setViewMode('list');
    } else {
      showNotification(`Error clearing files: ${result.error}`, 'error');
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
    const blob = new Blob([file.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('File downloaded successfully!');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('Content copied to clipboard!');
  };

  return (
    <div className="file-manager h-full bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-lg overflow-hidden">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border backdrop-blur-sm flex items-center gap-2 ${
          notification.type === 'error' 
            ? 'bg-red-500/20 border-red-500/30 text-red-300' 
            : 'bg-green-500/20 border-green-500/30 text-green-300'
        }`}>
          {notification.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-purple-500/30 p-4 bg-black/40">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Quantum File Manager</h1>
              <p className="text-purple-300 text-sm">Neural File System v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                viewMode === 'list'
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('edit')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                viewMode === 'edit'
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-black/20 border-white/20 text-white/70 hover:bg-white/10'
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quantum files..."
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
              />
            </div>
            
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
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
          </div>

          {/* File Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/30 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Total Files</p>
                  <p className="text-2xl font-bold text-white">{files.length}</p>
                </div>
                <HardDrive className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm">Total Size</p>
                  <p className="text-2xl font-bold text-white">
                    {formatFileSize(files.reduce((total, file) => total + file.size, 0))}
                  </p>
                </div>
                <Database className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            
            <div className="bg-black/30 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Selected</p>
                  <p className="text-2xl font-bold text-white">{selectedFiles.length}</p>
                </div>
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedFiles.length > 0 && (
            <div className="bg-black/30 border border-yellow-500/30 rounded-lg p-4 mb-4 flex items-center justify-between">
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
              <p className="text-white/60 text-lg">No quantum files found</p>
              <p className="text-white/40 text-sm mt-2">Create your first neural file to get started</p>
            </div>
          ) : (
            <div className={displayMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
              {filteredFiles.map((file) => {
                const IconComponent = getFileIcon(file.type);
                const isSelected = selectedFiles.includes(file.name);
                
                return displayMode === 'grid' ? (
                  <div
                    key={file.id}
                    className={`bg-black/30 border rounded-lg p-4 cursor-pointer transition-all hover:bg-black/40 ${
                      isSelected ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/20'
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
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(file.name);
                          }}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file);
                          }}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Download className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.name);
                          }}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-medium mb-1 truncate">{file.name}</h3>
                    <div className="flex items-center justify-between text-xs text-white/60">
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
                    className={`bg-black/20 border rounded-lg p-3 cursor-pointer transition-all hover:bg-black/30 ${
                      isSelected ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/20'
                    }`}
                    onClick={() => handleFileSelect(file.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${getFileColor(file.type)} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{file.name}</h3>
                          <p className="text-white/60 text-sm">{formatFileSize(file.size)} • {formatDate(file.updatedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewFile(file.name);
                          }}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFile(file.name);
                          }}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(file);
                          }}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                        >
                          <Download className="w-4 h-4 text-white/70" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.name);
                          }}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
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
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
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
                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    placeholder="Enter quantum file name..."
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
                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
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
                    className="w-full px-4 py-3 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 font-mono text-sm disabled:opacity-50"
                    placeholder="Enter quantum file content..."
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* File Info */}
                {selectedFile && (
                  <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      File Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Size:</span>
                        <span className="text-white">{formatFileSize(selectedFile.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Type:</span>
                        <span className="text-white">{selectedFile.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Created:</span>
                        <span className="text-white">{formatDate(selectedFile.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Modified:</span>
                        <span className="text-white">{formatDate(selectedFile.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="Add tags (comma separated)"
                      className="w-full px-3 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 text-sm"
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
                          type: selectedFile.type
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
                      setViewMode('list');
                    }}
                    className="w-full px-4 py-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-gray-500/30 transition-all flex items-center justify-center gap-2"
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

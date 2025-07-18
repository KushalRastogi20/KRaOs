'use client';

import { useState, useEffect, useRef } from 'react';
import useFileSystem from "@/hooks/useFileSystem";
import { 
  Terminal, 
  Zap, 
  ChevronRight, 
  Folder,
  File,
  Settings,
  Monitor,
  Code,
  FileText,
  Brain,
  Sparkles,
  Clock,
  User,
  HardDrive,
  Cpu,
  Activity
} from 'lucide-react';

const TerminalApp = ({ onOpenApp }) => {
  const {
    files,
    folders,
    currentPath,
    navigateToPath,
    navigateUp,
    getFilesInPath,
    getFoldersInPath,
    createFolder,
    saveFile,
    deleteFile,
    deleteFolder,
    getFile
  } = useFileSystem();

  // Terminal state
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [username] = useState('quantum-user');
  const [hostname] = useState('auraos-2050');

  // Refs
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const terminalRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add welcome message
    addToOutput([
      {
        type: 'system',
        content: `Welcome to AuraOS Terminal v2.0`
      },
      {
        type: 'info',
        content: `Quantum Computing Environment • Neural Network Integration`
      },
      {
        type: 'info',
        content: `Type 'help' for available commands`
      },
      {
        type: 'divider'
      }
    ]);
  }, []);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Keep input focused
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (terminalRef.current) {
      terminalRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const addToOutput = (items) => {
    setOutput(prev => [...prev, ...items]);
  };

  const getCurrentPathDisplay = () => {
    return currentPath === '/' ? '~' : currentPath.replace(/\/$/, '');
  };

  const getPrompt = () => {
    return `${username}@${hostname}:${getCurrentPathDisplay()}$`;
  };

  // Command evaluation function
  const evalCommand = (command) => {
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case '':
        return [];

      case 'help':
        return [
          { type: 'success', content: 'AuraOS Terminal Commands:' },
          { type: 'info', content: '' },
          { type: 'command', content: 'help', description: 'Show this help message' },
          { type: 'command', content: 'ls', description: 'List files and folders' },
          { type: 'command', content: 'cd <folder>', description: 'Change directory' },
          { type: 'command', content: 'mkdir <name>', description: 'Create a folder' },
          { type: 'command', content: 'touch <name>', description: 'Create a file' },
          { type: 'command', content: 'open <name>', description: 'Open file in notepad' },
          { type: 'command', content: 'delete <name>', description: 'Delete file or folder' },
          { type: 'command', content: 'clear', description: 'Clear terminal screen' },
          { type: 'command', content: 'run notepad', description: 'Launch Notepad app' },
          { type: 'command', content: 'run filemanager', description: 'Launch File Manager app' },
          { type: 'command', content: 'pwd', description: 'Show current directory' },
          { type: 'command', content: 'whoami', description: 'Show current user' },
          { type: 'command', content: 'date', description: 'Show current date and time' },
          { type: 'command', content: 'quantum', description: 'Run quantum system diagnostics' },
          { type: 'command', content: 'cat <file>', description: 'Display file contents' },
          { type: 'info', content: '' }
        ];

      case 'ls':
        const currentFiles = getFilesInPath(currentPath);
        const currentFolders = getFoldersInPath(currentPath);
        
        if (currentFiles.length === 0 && currentFolders.length === 0) {
          return [{ type: 'info', content: 'Directory is empty' }];
        }
        
        const items = [];
        
        // Add folders first
        currentFolders.forEach(folder => {
          items.push({
            type: 'folder',
            name: folder.name,
            details: `<DIR>    ${new Date(folder.createdAt).toLocaleDateString()}`
          });
        });
        
        // Add files
        currentFiles.forEach(file => {
          const size = file.size || 0;
          const date = new Date(file.updatedAt || file.createdAt).toLocaleDateString();
          items.push({
            type: 'file',
            name: file.name,
            details: `${size.toString().padStart(8)} bytes    ${date}`,
            fileType: file.type || 'text'
          });
        });
        
        return items;

      case 'cd':
        if (args.length === 0) {
          navigateToPath('/');
          return [{ type: 'info', content: 'Changed to root directory' }];
        }
        
        const targetPath = args[0];
        
        if (targetPath === '..') {
          if (currentPath === '/') {
            return [{ type: 'error', content: 'Already at root directory' }];
          }
          navigateUp();
          return [{ type: 'info', content: `Changed to parent directory` }];
        }
        
        if (targetPath === '/') {
          navigateToPath('/');
          return [{ type: 'info', content: 'Changed to root directory' }];
        }
        
        // Find folder in current directory
        const targetFolder = getFoldersInPath(currentPath).find(f => f.name === targetPath);
        
        if (!targetFolder) {
          return [{ type: 'error', content: `Directory '${targetPath}' not found` }];
        }
        
        navigateToPath(targetFolder.path);
        return [{ type: 'info', content: `Changed to directory '${targetPath}'` }];

      case 'mkdir':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: mkdir <folder_name>' }];
        }
        
        const folderName = args.join(' ');
        const result = createFolder(folderName, currentPath);
        
        if (result.success) {
          return [{ type: 'success', content: `Created folder '${folderName}'` }];
        } else {
          return [{ type: 'error', content: result.error }];
        }

      case 'touch':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: touch <file_name>' }];
        }
        
        const fileName = args.join(' ');
        const fileResult = saveFile({
          name: fileName,
          content: '',
          type: 'text',
          path: currentPath
        });
        
        if (fileResult.success) {
          return [{ type: 'success', content: `Created file '${fileName}'` }];
        } else {
          return [{ type: 'error', content: fileResult.error }];
        }

      case 'open':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: open <file_name>' }];
        }
        
        const targetFile = args.join(' ');
        const file = getFilesInPath(currentPath).find(f => f.name === targetFile);
        
        if (!file) {
          return [{ type: 'error', content: `File '${targetFile}' not found` }];
        }
        
        // Launch notepad with the file
        if (onOpenApp) {
          onOpenApp('notepad', { file });
        }
        
        return [{ type: 'success', content: `Opening '${targetFile}' in Notepad...` }];

      case 'delete':
      case 'rm':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: delete <file_or_folder_name>' }];
        }
        
        const targetName = args.join(' ');
        
        // Check if it's a file
        const targetFileToDelete = getFilesInPath(currentPath).find(f => f.name === targetName);
        if (targetFileToDelete) {
          const deleteResult = deleteFile(targetName, currentPath);
          if (deleteResult.success) {
            return [{ type: 'success', content: `Deleted file '${targetName}'` }];
          } else {
            return [{ type: 'error', content: deleteResult.error }];
          }
        }
        
        // Check if it's a folder
        const targetFolderToDelete = getFoldersInPath(currentPath).find(f => f.name === targetName);
        if (targetFolderToDelete) {
          const deleteFolderResult = deleteFolder(targetFolderToDelete.path);
          if (deleteFolderResult.success) {
            return [{ type: 'success', content: `Deleted folder '${targetName}'` }];
          } else {
            return [{ type: 'error', content: deleteFolderResult.error }];
          }
        }
        
        return [{ type: 'error', content: `'${targetName}' not found` }];

      case 'clear':
        setOutput([]);
        return [];

      case 'run':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: run <app_name>' }];
        }
        
        const appName = args[0].toLowerCase();
        
        if (onOpenApp) {
          onOpenApp(appName);
          return [{ type: 'success', content: `Launching ${appName}...` }];
        }
        
        return [{ type: 'error', content: `Cannot launch ${appName}` }];

      case 'pwd':
        return [{ type: 'info', content: currentPath }];

      case 'whoami':
        return [{ type: 'info', content: username }];

      case 'date':
        return [{ type: 'info', content: new Date().toString() }];

      case 'quantum':
        return [
          { type: 'system', content: 'Running quantum system diagnostics...' },
          { type: 'success', content: 'Quantum processors: ONLINE' },
          { type: 'success', content: 'Neural networks: ACTIVE' },
          { type: 'success', content: 'Consciousness level: OPTIMAL' },
          { type: 'info', content: 'System operating at 94% efficiency' }
        ];

      case 'cat':
        if (args.length === 0) {
          return [{ type: 'error', content: 'Usage: cat <file_name>' }];
        }
        
        const fileToRead = args.join(' ');
        const fileData = getFile(fileToRead, currentPath);
        
        if (!fileData) {
          return [{ type: 'error', content: `File '${fileToRead}' not found` }];
        }
        
        return [
          { type: 'info', content: `--- ${fileToRead} ---` },
          { type: 'text', content: fileData.content || '(empty file)' },
          { type: 'info', content: `--- End of ${fileToRead} ---` }
        ];

      default:
        return [{ type: 'error', content: `Command '${cmd}' not found. Type 'help' for available commands.` }];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setIsTyping(true);
    
    // Add command to history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    // Add command to output
    const commandOutput = [
      { type: 'prompt', content: getPrompt(), command: input },
      ...evalCommand(input)
    ];
    
    addToOutput(commandOutput);
    setInput('');
    
    setTimeout(() => setIsTyping(false), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion for files and folders
      const parts = input.split(' ');
      const lastPart = parts[parts.length - 1];
      
      if (lastPart) {
        const allItems = [
          ...getFoldersInPath(currentPath).map(f => f.name),
          ...getFilesInPath(currentPath).map(f => f.name)
        ];
        
        const matches = allItems.filter(item => item.toLowerCase().startsWith(lastPart.toLowerCase()));
        
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          setInput(parts.join(' '));
        }
      }
    }
  };

  const renderOutputLine = (line, index) => {
    switch (line.type) {
      case 'prompt':
        return (
          <div key={index} className="flex items-center gap-2 mb-1">
            <span className="text-green-400 font-mono text-sm">{line.content}</span>
            <span className="text-white font-mono text-sm">{line.command}</span>
          </div>
        );
      
      case 'command':
        return (
          <div key={index} className="flex items-start gap-4 py-1">
            <span className="text-cyan-400 font-mono text-sm min-w-0 flex-1">{line.content}</span>
            <span className="text-white/60 text-sm">{line.description}</span>
          </div>
        );
      
      case 'folder':
        return (
          <div key={index} className="flex items-center gap-2 py-1">
            <Folder className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 font-mono text-sm">{line.name}</span>
            <span className="text-white/60 text-sm ml-auto">{line.details}</span>
          </div>
        );
      
      case 'file':
        const FileIcon = line.fileType === 'code' ? Code : line.fileType === 'json' ? Settings : FileText;
        return (
          <div key={index} className="flex items-center gap-2 py-1">
            <FileIcon className="w-4 h-4 text-white/70" />
            <span className="text-white font-mono text-sm">{line.name}</span>
            <span className="text-white/60 text-sm ml-auto">{line.details}</span>
          </div>
        );
      
      case 'success':
        return (
          <div key={index} className="text-green-400 font-mono text-sm py-1">
            {line.content}
          </div>
        );
      
      case 'error':
        return (
          <div key={index} className="text-red-400 font-mono text-sm py-1">
            {line.content}
          </div>
        );
      
      case 'info':
        return (
          <div key={index} className="text-cyan-400 font-mono text-sm py-1">
            {line.content}
          </div>
        );
      
      case 'system':
        return (
          <div key={index} className="text-purple-400 font-mono text-sm py-1 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            {line.content}
          </div>
        );
      
      case 'text':
        return (
          <div key={index} className="text-white font-mono text-sm py-1 whitespace-pre-wrap">
            {line.content}
          </div>
        );
      
      case 'divider':
        return (
          <div key={index} className="border-t border-white/10 my-2"></div>
        );
      
      default:
        return (
          <div key={index} className="text-white font-mono text-sm py-1">
            {line.content}
          </div>
        );
    }
  };

  return (
    <div 
      ref={terminalRef}
      className="terminal-app h-full bg-black/10 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col"
    >
      {/* Terminal Status Bar */}
      <div className="border-b border-green-500/30 p-2 bg-black/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Activity className="w-3 h-3 text-green-400" />
              <span>ONLINE</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/60">
              <Cpu className="w-3 h-3 text-blue-400" />
              <span>94%</span>
            </div>
          </div>
          <div className="text-xs text-green-400 font-mono">
            AuraOS Terminal v2.0
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 p-3 overflow-y-auto bg-black/5 font-mono text-sm"
      >
        {output.map((line, index) => renderOutputLine(line, index))}
        
        {isTyping && (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-xs">Processing...</span>
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="border-t border-green-500/30 p-3 bg-black/20 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400 font-mono text-sm whitespace-nowrap">
            {getPrompt()}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-white/50"
            placeholder="Enter command..."
            autoComplete="off"
          />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs">READY</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalApp;

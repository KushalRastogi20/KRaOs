'use client';

import { useState, useRef, useEffect } from 'react';
import { useTerminal } from './context';
import { handleCommand, getPrompt } from './commandHandler';
import { 
  Terminal as TerminalIcon, 
  Zap, 
  Shield, 
  Brain,
  Activity,
  Clock,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';

const Terminal = ({ onLaunchApp }) => {
  const terminalContext = useTerminal();
  const { terminalState, terminalOutput } = terminalContext;
  
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Focus input on mount and click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentInput.trim() || isProcessing) return;

    setIsProcessing(true);
    await handleCommand(currentInput, terminalContext, onLaunchApp);
    setCurrentInput('');
    setHistoryIndex(-1);
    setIsProcessing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const history = terminalState.commandHistory;
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const history = terminalState.commandHistory;
        setCurrentInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const getOutputStyle = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-cyan-400';
      case 'command':
        return 'text-blue-300';
      default:
        return 'text-gray-300';
    }
  };

  const getFontSize = () => {
    switch (terminalState.fontSize) {
      case 'small':
        return 'text-xs';
      case 'large':
        return 'text-lg';
      default:
        return 'text-sm';
    }
  };

  const getThemeClass = () => {
    switch (terminalState.theme) {
      case 'light':
        return 'bg-gray-100 text-gray-900 border-gray-300';
      case 'glassy':
        return 'bg-black/20 text-white border-white/20 backdrop-blur-lg';
      default:
        return 'bg-gray-900 text-green-400 border-gray-700';
    }
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className={`h-full flex flex-col font-mono ${getThemeClass()}`}>
      {/* Header */}
      <div className="border-b border-current/20 p-4 bg-black/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <TerminalIcon className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Aura OS Terminal</h1>
              <p className="text-xs opacity-70">
                {terminalState.systemInfo.os} v{terminalState.systemInfo.version}
              </p>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatUptime(terminalState.systemUptime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>{terminalState.cpuUsage}%</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              <span>{terminalState.memoryUsage}%</span>
            </div>
            {terminalState.encryptionEnabled && (
              <Shield className="w-4 h-4 text-green-400" />
            )}
            {terminalState.isNeuralActive && (
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
            )}
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span className="text-xs">{terminalState.quantumState}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output Area */}
      <div 
        ref={outputRef}
        className={`flex-1 overflow-y-auto p-4 ${getFontSize()}`}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-1">
          {terminalOutput.map((output) => (
            <div key={output.id}>
              {output.isCommand ? (
                <div className="text-blue-300">{output.content}</div>
              ) : (
                <div className={getOutputStyle(output.type)}>
                  <pre className="whitespace-pre-wrap font-mono">
                    {output.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
          
          {/* Current Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-1">
              {getPrompt(terminalState)}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-current font-mono"
              disabled={isProcessing}
              placeholder={isProcessing ? "Processing..." : ""}
            />
            {isProcessing && (
              <div className="ml-2 flex items-center gap-1">
                <Activity className="w-4 h-4 animate-spin" />
                <span className="text-xs">Processing...</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-current/20 p-2 bg-black/10">
        <div className="flex justify-between items-center text-xs opacity-70">
          <div className="flex items-center gap-4">
            <span>Theme: {terminalState.theme}</span>
            <span>Font: {terminalState.fontSize}</span>
            <span>Dir: {terminalState.currentDirectory.replace('/home/Aura', '~')}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>History: {terminalState.commandHistory.length}</span>
            <span>Apps: {terminalState.openApps.length}</span>
            <span>Aura OS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;

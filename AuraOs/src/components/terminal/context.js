'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  const [terminalState, setTerminalState] = useState({
    currentDirectory: '/home/Aura',
    theme: 'dark',
    fontSize: 'medium',
    encryptionEnabled: false,
    isNeuralActive: false,
    quantumState: 'DORMANT',
    systemUptime: 0,
    memoryUsage: 67,
    cpuUsage: 23,
    networkStatus: 'CONNECTED',
    openApps: [],
    commandHistory: [],
    systemInfo: {
      os: 'Aura OS',
      version: '3.0.1',
      kernel: 'Neural-Quantum Hybrid',
      arch: 'x86_64-quantum'
    }
  });

  const [terminalOutput, setTerminalOutput] = useState([
    {
      id: 1,
      type: 'info',
      content: '🚀 Welcome to Aura OS Terminal v3.0.1',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'success',
      content: 'Neural interface initialized. Type "help" for available commands.',
      timestamp: new Date().toISOString()
    }
  ]);

  // Update system uptime
  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalState(prev => ({
        ...prev,
        systemUptime: prev.systemUptime + 1
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('Aura-terminal-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTerminalState(prev => ({
          ...prev,
          ...parsed,
          systemUptime: 0 // Reset uptime on load
        }));
      } catch (error) {
        console.error('Failed to load terminal state:', error);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const stateToSave = {
      ...terminalState,
      systemUptime: 0 // Don't save uptime
    };
    localStorage.setItem('Aura-terminal-state', JSON.stringify(stateToSave));
  }, [terminalState]);

  const updateState = (updates) => {
    setTerminalState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const addOutput = (output) => {
    const newOutput = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      ...output
    };
    setTerminalOutput(prev => [...prev, newOutput]);
  };

  const clearOutput = () => {
    setTerminalOutput([{
      id: Date.now(),
      type: 'info',
      content: 'Terminal cleared',
      timestamp: new Date().toISOString()
    }]);
  };

  const addToHistory = (command) => {
    setTerminalState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory, command].slice(-100) // Keep last 100 commands
    }));
  };

  const value = {
    terminalState,
    terminalOutput,
    updateState,
    addOutput,
    clearOutput,
    addToHistory
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};

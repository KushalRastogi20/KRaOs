// app/components/FuturisticAuraDesktop.js
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Zap, 
  Atom, 
  Globe, 
  Code, 
  Database,
  Cpu,
  Eye,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Sparkles,
  Waves,
  Activity,
  X,
  Minimize2,
  Maximize2,
  Play,
  Pause,
  RotateCcw,
  Send,
  Terminal,
  FileText,
  Search
} from 'lucide-react';

const FuturisticAuraDesktop = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [quantumState, setQuantumState] = useState('COHERENT');
  const [hologramNodes, setHologramNodes] = useState([]);
  const [activeWindows, setActiveWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  // App-specific states
  const [codeEditorContent, setCodeEditorContent] = useState('// Quantum Algorithm\nfunction quantumProcess() {\n  return "Hello from 2050!";\n}');
  const [neuralLogs, setNeuralLogs] = useState([
    'Neural networks initialized...',
    'Quantum processors online...',
    'Consciousness level: Optimal'
  ]);
  const [dataMatrixData, setDataMatrixData] = useState([
    { id: 1, name: 'Quantum Data Stream', value: 87, status: 'active' },
    { id: 2, name: 'Neural Network Flow', value: 92, status: 'active' },
    { id: 3, name: 'Holographic Rendering', value: 76, status: 'processing' }
  ]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'AI', message: 'Neural interface established. How may I assist you?' },
    { id: 2, sender: 'User', message: 'Show me quantum processing status' },
    { id: 3, sender: 'AI', message: 'Quantum processors are operating at 94% efficiency.' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Neural pulse animation
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setNeuralActivity(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(pulseInterval);
  }, []);

  // Quantum state cycling
  useEffect(() => {
    const states = ['COHERENT', 'SUPERPOSITION', 'ENTANGLED', 'QUANTUM FLUX'];
    const stateInterval = setInterval(() => {
      setQuantumState(states[Math.floor(Math.random() * states.length)]);
    }, 3000);
    return () => clearInterval(stateInterval);
  }, []);

  // Time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize holographic nodes
  useEffect(() => {
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      angle: Math.random() * Math.PI * 2,
      color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
    }));
    setHologramNodes(nodes);
  }, []);

  const quantumApps = [
    {
      id: 'neural-processor',
      name: 'Neural\nProcessor',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      hologramColor: '#8b5cf6',
      description: 'Quantum neural network processing',
      type: 'neural'
    },
    {
      id: 'quantum-code',
      name: 'Quantum\nCode',
      icon: Code,
      color: 'from-cyan-400 to-blue-500',
      hologramColor: '#06b6d4',
      description: 'Quantum algorithm development',
      type: 'code'
    },
    {
      id: 'reality-engine',
      name: 'Reality\nEngine',
      icon: Eye,
      color: 'from-emerald-400 to-green-500',
      hologramColor: '#10b981',
      description: 'Augmented reality synthesis',
      type: 'reality'
    },
    {
      id: 'data-matrix',
      name: 'Data\nMatrix',
      icon: Database,
      color: 'from-amber-400 to-orange-500',
      hologramColor: '#f59e0b',
      description: 'Quantum data visualization',
      type: 'data'
    },
    {
      id: 'mind-link',
      name: 'Mind\nLink',
      icon: Zap,
      color: 'from-red-400 to-pink-500',
      hologramColor: '#ef4444',
      description: 'Direct neural interface',
      type: 'chat'
    },
    {
      id: 'quantum-web',
      name: 'Quantum\nWeb',
      icon: Globe,
      color: 'from-indigo-400 to-purple-500',
      hologramColor: '#6366f1',
      description: 'Quantum internet browsing',
      type: 'web'
    }
  ];

  const openApp = (app) => {
    const existingWindow = activeWindows.find(w => w.id === app.id);
    if (existingWindow) return;

    const newWindow = {
      id: app.id,
      app: app,
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100,
      width: 500,
      height: 400,
      isMaximized: false
    };
    
    setActiveWindows([...activeWindows, newWindow]);
    setMinimizedWindows(minimizedWindows.filter(id => id !== app.id));
  };

  const closeWindow = (windowId) => {
    setActiveWindows(activeWindows.filter(w => w.id !== windowId));
    setMinimizedWindows(minimizedWindows.filter(id => id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setActiveWindows(activeWindows.filter(w => w.id !== windowId));
    setMinimizedWindows([...minimizedWindows, windowId]);
  };

  const maximizeWindow = (windowId) => {
    setActiveWindows(activeWindows.map(w => 
      w.id === windowId 
        ? { ...w, isMaximized: !w.isMaximized }
        : w
    ));
  };

  const restoreWindow = (appId) => {
    const app = quantumApps.find(a => a.id === appId);
    if (app) openApp(app);
  };

  const runQuantumCode = () => {
    setNeuralLogs(prev => [...prev, `> Executing quantum code at ${currentTime}`, '> Quantum algorithm processed successfully', '> Output: Hello from 2050!']);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, 
        { id: Date.now(), sender: 'User', message: newMessage },
        { id: Date.now() + 1, sender: 'AI', message: 'Processing neural input... Response generated via quantum consciousness.' }
      ]);
      setNewMessage('');
    }
  };

  const renderAppWindow = (window) => {
    const { app } = window;
    const IconComponent = app.icon;

    const windowStyle = window.isMaximized 
      ? { left: 0, top: 80, width: '100vw', height: 'calc(100vh - 160px)' }
      : { left: window.x, top: window.y, width: window.width, height: window.height };

    return (
      <div
        key={window.id}
        className="absolute bg-black/60 backdrop-blur-xl border border-purple-500/40 rounded-2xl overflow-hidden z-40"
        style={windowStyle}
      >
        {/* Window Header */}
        <div className="bg-black/40 border-b border-purple-500/30 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center`}>
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm font-bold">{app.name.replace('\n', ' ')}</h3>
              <p className="text-purple-300 text-xs">{app.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => minimizeWindow(window.id)}
              className="w-6 h-6 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-full flex items-center justify-center transition-colors"
            >
              <Minimize2 className="w-3 h-3 text-yellow-400" />
            </button>
            <button
              onClick={() => maximizeWindow(window.id)}
              className="w-6 h-6 bg-green-500/20 hover:bg-green-500/40 rounded-full flex items-center justify-center transition-colors"
            >
              <Maximize2 className="w-3 h-3 text-green-400" />
            </button>
            <button
              onClick={() => closeWindow(window.id)}
              className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-red-400" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 h-full overflow-auto">
          {app.type === 'neural' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-3">
                  <h4 className="text-purple-300 text-sm mb-2">Neural Activity</h4>
                  <div className="text-2xl text-white font-bold">{neuralActivity}%</div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${neuralActivity}%` }}
                    />
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-3">
                  <h4 className="text-cyan-300 text-sm mb-2">Quantum State</h4>
                  <div className="text-sm text-white">{quantumState}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-xl p-3">
                <h4 className="text-white text-sm mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Neural Logs
                </h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {neuralLogs.map((log, index) => (
                    <div key={index} className="text-xs text-green-400 font-mono">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {app.type === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={runQuantumCode}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Run Quantum Code
                </button>
                <button className="px-4 py-2 bg-gray-600 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-black/50 rounded-xl p-4">
                <textarea
                  value={codeEditorContent}
                  onChange={(e) => setCodeEditorContent(e.target.value)}
                  className="w-full h-64 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                  placeholder="Enter quantum code here..."
                />
              </div>
            </div>
          )}

          {app.type === 'data' && (
            <div className="space-y-4">
              <h4 className="text-white text-lg mb-4">Quantum Data Streams</h4>
              <div className="space-y-3">
                {dataMatrixData.map((item) => (
                  <div key={item.id} className="bg-black/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{item.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-cyan-400 text-sm font-mono">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {app.type === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 bg-black/30 rounded-xl p-4 mb-4 overflow-y-auto">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                        msg.sender === 'User' 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        <div className="text-xs opacity-60 mb-1">{msg.sender}</div>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Send neural message..."
                  className="flex-1 bg-black/30 border border-purple-500/30 rounded-xl px-4 py-2 text-white placeholder-white/50 outline-none focus:border-purple-500/50 text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {app.type === 'web' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-black/30 border border-purple-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm">quantum://web.2050.ai</span>
                </div>
                <button className="px-4 py-2 bg-purple-500/20 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-black/30 rounded-xl p-4 h-64">
                <div className="text-center text-white/60 mt-16">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p>Quantum Web Interface</p>
                  <p className="text-sm mt-2">Connecting to quantum internet...</p>
                </div>
              </div>
            </div>
          )}

          {app.type === 'reality' && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-white text-lg mb-4">Reality Engine</h4>
                <div className="bg-black/30 rounded-xl p-8">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-full animate-pulse"></div>
                    <div className="absolute inset-4 bg-black/50 rounded-full flex items-center justify-center">
                      <Eye className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-white/60 text-sm">Augmented Reality Synthesis</p>
                  <p className="text-emerald-400 text-xs mt-2">Reality layers: Active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* Quantum Field Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black"></div>
        
        {/* Animated Quantum Particles */}
        {hologramNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${(node.x + Math.sin(Date.now() * 0.001 + node.angle) * 100) % window.innerWidth}px`,
              top: `${(node.y + Math.cos(Date.now() * 0.001 + node.angle) * 100) % window.innerHeight}px`,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 4}px ${node.color}`,
              animation: `pulse ${2 + Math.random() * 2}s infinite`
            }}
          />
        ))}

        {/* Neural Network Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#neural-gradient)" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Quantum Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-b border-purple-500/30 p-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-spin"></div>
                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                  <Atom className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-lg">AuraOS</span>
                <span className="text-purple-400 text-sm ml-2">2050</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400">QUANTUM STATE: {quantumState}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400">NEURAL: {neuralActivity}%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right text-white font-mono">
              <div className="text-sm">QUANTUM TIME</div>
              <div className="text-lg">{currentTime}</div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Holographic App Sphere */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-30">
        <div className="relative w-full h-full">
          {/* Central Hologram Hub */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 bg-gradient-radial from-purple-500/10 to-transparent animate-pulse">
            <div className="absolute inset-4 rounded-full border border-cyan-500/20 bg-gradient-radial from-cyan-500/5 to-transparent"></div>
          </div>
          
          {/* Floating App Holograms */}
          {quantumApps.map((app, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const IconComponent = app.icon;
            const isActive = activeWindows.some(w => w.id === app.id);
            
            return (
              <div
                key={app.id}
                className="absolute w-20 h-20 cursor-pointer group"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x - 40}px, ${y - 40}px)`
                }}
                onClick={() => openApp(app)}
              >
                <div className="relative w-full h-full">
                  {/* Holographic Glow */}
                  <div 
                    className={`absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300 ${isActive ? 'opacity-100' : ''}`}
                    style={{
                      background: `radial-gradient(circle, ${app.hologramColor}40 0%, transparent 70%)`,
                      animation: `pulse 2s infinite`
                    }}
                  />
                  
                  {/* App Icon Container */}
                  <div className={`relative w-full h-full bg-gradient-to-br ${app.color} rounded-2xl border ${isActive ? 'border-white/40' : 'border-white/20'} backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                    <IconComponent className="w-8 h-8 text-white" />
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
                    )}
                    
                    {/* Holographic Scan Lines */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* App Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-white/80 font-medium whitespace-pre-line">
                      {app.name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render Active Windows */}
      {activeWindows.map(window => renderAppWindow(window))}

      {/* Quantum Dock */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-3 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full animate-ping opacity-20"></div>
            <Hexagon className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex gap-2">
            {/* Minimized Apps */}
            {minimizedWindows.map(appId => {
              const app = quantumApps.find(a => a.id === appId);
              if (!app) return null;
              return (
                <div
                  key={appId}
                  onClick={() => restoreWindow(appId)}
                  className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-200"
                >
                  <app.icon className="w-4 h-4 text-white/80" />
                </div>
              );
            })}
            
            {/* System Apps */}
            {[Triangle, Square, Circle].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-white/80" />
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Waves className="w-4 h-4" />
            <span>Quantum Field Active</span>
          </div>
        </div>
      </div>

      {/* Neural Pulse Indicator */}
      <div className="absolute bottom-6 right-6 w-16 h-16 z-50">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticAuraDesktop;

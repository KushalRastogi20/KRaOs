"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Zap,
  Atom,
  Settings,
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
  Edit3,
  RotateCcw,
  Send,
  Terminal,
  FileText,
  Search,
  Move,
} from "lucide-react";
import FileManager from "@/components/FileManager";
import Notepad from "@/components/Notepad";
import TerminalApp from "@/components/terminal/TerminalApp";
import SettingsApp from "@/components/SettingsApp";
import { useSettings } from '@/app/contexts/SettingsContext';

const FuturisticAuraDesktop = () => {
  const { settings } = useSettings();
  const [currentTime, setCurrentTime] = useState("");
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [quantumState, setQuantumState] = useState("COHERENT");
  const [hologramNodes, setHologramNodes] = useState([]);
  const [activeWindows, setActiveWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // App-specific states
  const [codeEditorContent, setCodeEditorContent] = useState(
    '// Quantum Algorithm\nfunction quantumProcess() {\n  return "Hello from 2050!";\n}'
  );
  const [neuralLogs, setNeuralLogs] = useState([
    "Neural networks initialized...",
    "Quantum processors online...",
    "Consciousness level: Optimal",
  ]);
  const [dataMatrixData, setDataMatrixData] = useState([
    { id: 1, name: "Quantum Data Stream", value: 87, status: "active" },
    { id: 2, name: "Neural Network Flow", value: 92, status: "active" },
    { id: 3, name: "Holographic Rendering", value: 76, status: "processing" },
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "AI",
      message: "Neural interface established. How may I assist you?",
    },
    { id: 2, sender: "User", message: "Show me quantum processing status" },
    {
      id: 3,
      sender: "AI",
      message: "Quantum processors are operating at 94% efficiency.",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Neural pulse animation
  useEffect(() => {
    if (settings.neuralPulse) {
      const pulseInterval = setInterval(() => {
        setNeuralActivity((prev) => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(pulseInterval);
    }
  }, [settings.neuralPulse]);

  // Quantum state cycling
  useEffect(() => {
    const states = ["COHERENT", "SUPERPOSITION", "ENTANGLED", "QUANTUM FLUX"];
    const stateInterval = setInterval(() => {
      setQuantumState(states[Math.floor(Math.random() * states.length)]);
    }, 3000);
    return () => clearInterval(stateInterval);
  }, []);

  // Time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize holographic nodes
  useEffect(() => {
    if (settings.quantumParticles) {
      const nodes = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        color: ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"][
          Math.floor(Math.random() * 5)
        ],
      }));
      setHologramNodes(nodes);
    }
  }, [settings.quantumParticles]);

  // Mouse events for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        setActiveWindows(windows =>
          windows.map(window =>
            window.id === dragging.id
              ? { ...window, x: Math.max(0, newX), y: Math.max(80, newY) }
              : window
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      setDragOffset({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragOffset]);

  const quantumApps = [
    {
      id: "notepad",
      name: "Neural\nNotepad",
      icon: Edit3,
      color: "from-green-400 to-emerald-500",
      hologramColor: "#10b981",
      description: "Quantum text editor",
      type: "notepad",
    },
    {
      id: "quantum-code",
      name: "Quantum\nCode",
      icon: Code,
      color: "from-cyan-400 to-blue-500",
      hologramColor: "#06b6d4",
      description: "Quantum algorithm development",
      type: "code",
    },
    {
      id: "terminal",
      name: "Quantum\nTerminal",
      icon: Terminal,
      color: "from-green-400 to-emerald-500",
      hologramColor: "#10b981",
      description: "Neural command interface",
      type: "terminal",
    },
    {
      id: "file-manager",
      name: "File\nManager",
      icon: FileText,
      color: "from-white to-gray-400",
      hologramColor: "#ffffff",
      description: "Manage stored files",
      type: "file",
    },
    {
      id: 'settings',
      name: 'Quantum\nSettings',
      icon: Settings,
      color: 'from-purple-400 to-pink-500',
      hologramColor: '#8b5cf6',
      description: 'System configuration',
      type: 'settings'
    },
    {
      id: "quantum-web",
      name: "Quantum\nWeb",
      icon: Globe,
      color: "from-indigo-400 to-purple-500",
      hologramColor: "#6366f1",
      description: "Quantum internet browsing",
      type: "web",
    },
  ];

  const openApp = (app) => {
    const existingWindow = activeWindows.find((w) => w.id === app.id);
    if (existingWindow) return;

    const newWindow = {
      id: app.id,
      app: app,
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100,
      width: 800,
      height: 600,
      isMaximized: false,
    };

    setActiveWindows([...activeWindows, newWindow]);
    setMinimizedWindows(minimizedWindows.filter((id) => id !== app.id));
  };

  const closeWindow = (windowId) => {
    setActiveWindows(activeWindows.filter((w) => w.id !== windowId));
    setMinimizedWindows(minimizedWindows.filter((id) => id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setActiveWindows(activeWindows.filter((w) => w.id !== windowId));
    setMinimizedWindows([...minimizedWindows, windowId]);
  };

  const maximizeWindow = (windowId) => {
    setActiveWindows(
      activeWindows.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  };

  const restoreWindow = (appId) => {
    const app = quantumApps.find((a) => a.id === appId);
    if (app) openApp(app);
  };

  const handleMouseDown = (e, window) => {
    if (e.target.closest('.window-controls')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDragging(window);
  };

  const runQuantumCode = () => {
    setNeuralLogs((prev) => [
      ...prev,
      `> Executing quantum code at ${currentTime}`,
      "> Quantum algorithm processed successfully",
      "> Output: Hello from 2050!",
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "User", message: newMessage },
        {
          id: Date.now() + 1,
          sender: "AI",
          message:
            "Processing neural input... Response generated via quantum consciousness.",
        },
      ]);
      setNewMessage("");
    }
  };

  const renderAppWindow = (window) => {
    const { app } = window;
    const IconComponent = app.icon;

    const windowStyle = window.isMaximized
      ? {
        left: 0,
        top: 80,
        width: "100vw",
        height: "calc(100vh - 160px)",
        transform: "none"
      }
      : {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        transform: "none"
      };

    return (
      <div
        key={window.id}
        className={`absolute bg-primary backdrop-blur-xl border border-[var(--bg-secondary)] rounded-2xl overflow-hidden z-40 ${
          dragging?.id === window.id ? 'cursor-grabbing' : ''
        }`}
        style={{
          ...windowStyle,
          opacity: settings.animations ? 1 : 0.95,
          transition: settings.animations ? 'all 0.3s ease' : 'none'
        }}
        onMouseDown={(e) => handleMouseDown(e, window)}
      >
        {/* Window Header */}
        <div className={`bg-secondary border-b border-[var(--bg-secondary)] p-3 flex items-center justify-between ${!window.isMaximized ? 'cursor-grab' : ''}`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center`}
            >
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-primary text-sm font-bold">
                {app.name.replace("\n", " ")}
              </h3>
              <p className="text-purple-300 text-xs">{app.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 window-controls">
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
        <div className="h-full overflow-hidden" style={{ height: 'calc(100% - 60px)' }}>
          {app.type === "notepad" && (
            <div className="h-full">
              <Notepad />
            </div>
          )}

          {app.type === "code" && (
            <div className="p-4 space-y-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={runQuantumCode}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-sm font-medium hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Run Quantum Code
                </button>
                <button className="px-4 py-2 bg-secondary rounded-lg text-primary text-sm font-medium hover:bg-primary transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-secondary rounded-xl p-4 flex-1">
                <textarea
                  value={codeEditorContent}
                  onChange={(e) => setCodeEditorContent(e.target.value)}
                  className="w-full h-64 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                  placeholder="Enter quantum code here..."
                />
              </div>

              <div className="bg-secondary rounded-xl p-4 max-h-32 overflow-y-auto">
                <h4 className="text-primary text-sm font-medium mb-2">Neural Output:</h4>
                <div className="space-y-1 text-xs font-mono">
                  {neuralLogs.slice(-5).map((log, index) => (
                    <div key={index} className="text-green-400">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {app.type === "file" && (
            <div className="h-full">
              <FileManager />
            </div>
          )}

          {app.type === "chat" && (
            <div className="flex flex-col h-full p-4">
              <div className="flex-1 bg-secondary rounded-xl p-4 mb-4 overflow-y-auto">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                          msg.sender === "User"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-cyan-500/20 text-cyan-300"
                        }`}
                      >
                        <div className="text-xs opacity-60 mb-1">
                          {msg.sender}
                        </div>
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
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Send neural message..."
                  className="flex-1 bg-secondary border border-[var(--bg-secondary)] rounded-xl px-4 py-2 text-primary placeholder-secondary outline-none focus:border-purple-500/50 text-sm"
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

          {app.type === 'settings' && (
            <div className="h-full">
              <SettingsApp />
            </div>
          )}

          {app.type === "web" && (
            <div className="flex flex-col h-full p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Enter quantum URL..."
                    className="flex-1 bg-transparent text-primary placeholder-secondary outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-all">
                  Navigate
                </button>
              </div>

              <div className="flex-1 bg-secondary rounded-xl p-4 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-cyan-400/50" />
                  <p className="text-secondary text-lg">Quantum Web Browser</p>
                  <p className="text-secondary text-sm mt-2">Enter a URL to begin browsing the quantum internet</p>
                </div>
              </div>
            </div>
          )}

          {app.type === "terminal" && (
            <div className="h-full">
              <TerminalApp
                onOpenApp={(appName, data) => {
                  // Handle launching other apps from terminal
                  if (appName === "notepad") {
                    const notepadApp = quantumApps.find(
                      (a) => a.id === "notepad"
                    );
                    if (notepadApp) {
                      openApp(notepadApp);
                    }
                  } else if (appName === "filemanager") {
                    const fileManagerApp = quantumApps.find(
                      (a) => a.id === "file-manager"
                    );
                    if (fileManagerApp) {
                      openApp(fileManagerApp);
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen bg-[var(--background)] overflow-hidden relative"
      style={{
        backgroundBlur: settings.backgroundBlur ? 'blur(1px)' : 'none',
        transition: settings.animations ? 'all 0.3s ease' : 'none'
      }}
    >
      {/* Quantum Field Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-purple-900/20 to-[var(--background)]"></div>

        {/* Animated Quantum Particles */}
        {settings.quantumParticles && hologramNodes.map((node) => (
          <div
            key={node.id}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${(node.x + Math.sin(Date.now() * 0.001 + node.angle) * 100) %
                window.innerWidth
                }px`,
              top: `${(node.y + Math.cos(Date.now() * 0.001 + node.angle) * 100) %
                window.innerHeight
                }px`,
              backgroundColor: node.color,
              boxShadow: `0 0 ${node.size * 4}px ${node.color}`,
              animation: settings.animations ? `pulse ${2 + Math.random() * 2}s infinite` : 'none',
            }}
          />
        ))}

        {/* Neural Network Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="grid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke="url(#neural-gradient)"
                  strokeWidth="0.5"
                />
              </pattern>
              <linearGradient
                id="neural-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#8b5cf6", stopOpacity: 0.3 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#06b6d4", stopOpacity: 0.1 }}
                />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Quantum Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-secondary backdrop-blur-xl border-b border-[var(--bg-secondary)] p-4 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  style={{
                    animation: settings.animations ? 'spin 3s linear infinite' : 'none'
                  }}
                ></div>
                <div className="absolute inset-1 bg-[var(--background)] rounded-full flex items-center justify-center">
                  <Atom className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-primary font-bold text-lg">AuraOS</span>
                <span className="text-purple-400 text-sm ml-2">2050</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    animation: settings.neuralPulse ? 'pulse 2s infinite' : 'none'
                  }}
                ></div>
                <span className="text-green-400">
                  QUANTUM STATE: {quantumState}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400">NEURAL: {neuralActivity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary">Theme: {settings.theme.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right text-primary font-mono">
              <div className="text-sm">QUANTUM TIME</div>
              <div className="text-lg">{currentTime}</div>
            </div>
            <div className="w-12 h-12 bg-primary rounded-full border border-[var(--bg-secondary)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Holographic App Sphere */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-30">
        <div className="relative w-full h-full">
          {/* Central Hologram Hub */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 bg-gradient-radial from-purple-500/10 to-transparent"
            style={{
              animation: settings.neuralPulse ? 'pulse 3s infinite' : 'none'
            }}
          >
            <div className="absolute inset-4 rounded-full border border-cyan-500/20 bg-gradient-radial from-cyan-500/5 to-transparent"></div>
          </div>

          {/* Floating App Holograms */}
          {quantumApps.map((app, index) => {
            const angle = index * 60 * (Math.PI / 180);
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const IconComponent = app.icon;
            const isActive = activeWindows.some((w) => w.id === app.id);

            return (
              <div
                key={app.id}
                className="absolute w-20 h-20 cursor-pointer group"
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(${x - 40}px, ${y - 40}px)`,
                }}
                onClick={() => openApp(app)}
              >
                <div className="relative w-full h-full">
                  {/* Holographic Glow */}
                  <div
                    className={`absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300 ${
                      isActive ? "opacity-100" : ""
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${app.hologramColor}40 0%, transparent 70%)`,
                      animation: settings.animations ? `pulse 2s infinite` : 'none',
                    }}
                  />

                  {/* App Icon Container */}
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${
                      app.color
                    } rounded-2xl border ${
                      isActive ? "border-white/40" : "border-white/20"
                    } backdrop-blur-sm flex items-center justify-center shadow-2xl`}
                    style={{
                      transform: settings.animations ? 'scale(1)' : 'scale(1)',
                      transition: settings.animations ? 'all 0.3s ease' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (settings.animations) {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (settings.animations) {
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />

                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[var(--background)]"
                        style={{
                          animation: settings.animations ? 'pulse 2s infinite' : 'none'
                        }}
                      ></div>
                    )}

                    {/* Holographic Scan Lines */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
                        style={{
                          animation: settings.animations ? 'pulse 3s infinite' : 'none'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* App Label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs text-primary font-medium whitespace-pre-line">
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
      {activeWindows.map((window) => renderAppWindow(window))}

      {/* Quantum Dock */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-primary backdrop-blur-xl border border-[var(--bg-secondary)] rounded-full px-6 py-3 flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-20"
              style={{
                animation: settings.animations ? 'ping 2s infinite' : 'none'
              }}
            ></div>
            <Hexagon className="w-5 h-5 text-white" />
          </div>

          <div className="flex gap-2">
            {/* Minimized Apps */}
            {minimizedWindows.map((appId) => {
              const app = quantumApps.find((a) => a.id === appId);
              if (!app) return null;
              return (
                <div
                  key={appId}
                  onClick={() => restoreWindow(appId)}
                  className="w-8 h-8 bg-secondary border border-[var(--bg-secondary)] rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary transition-all duration-200"
                >
                  <app.icon className="w-4 h-4 text-secondary" />
                </div>
              );
            })}

            {/* System Apps */}
            {[Triangle, Square, Circle].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-secondary border border-[var(--bg-secondary)] rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-secondary" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-secondary">
            <Waves className="w-4 h-4" />
            <span>Quantum Field Active</span>
          </div>
        </div>
      </div>

      {/* Neural Pulse Indicator */}
      <div className="absolute bottom-6 right-6 w-16 h-16 z-50">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-primary rounded-full"
            style={{
              animation: settings.neuralPulse ? 'pulse 2s infinite' : 'none'
            }}
          ></div>
          <div className="absolute inset-2 bg-[var(--background)] rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full"
              style={{
                animation: settings.animations ? 'ping 2s infinite' : 'none'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticAuraDesktop;

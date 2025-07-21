'use client';

import { useState } from 'react';
import { useSettings } from '@/app/contexts/SettingsContext';
import { 
  Settings, 
  Palette, 
  Sun, 
  Moon, 
  Sparkles, 
  Save, 
  FolderOpen, 
  Shield, 
  Brain, 
  ToggleLeft, 
  ToggleRight,
  Monitor,
  Cpu,
  HardDrive,
  Activity,
  Zap,
  CheckCircle,
  AlertCircle,
  Sliders,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Globe,
  Wifi,
  RotateCcw,
  Download,
  Upload,
  RefreshCw,
  Database,
  Type,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';

const SettingsApp = () => {
  const { settings, updateSetting, resetSettings, isLoading } = useSettings();
  const [activeTab, setActiveTab] = useState('appearance');
  const [notification, setNotification] = useState(null);
  const [systemInfo] = useState({
    version: '2.0.1',
    build: '2050.11.25',
    quantumCore: '94.7%',
    neuralNetwork: '98.2%',
    memoryUsage: '67%',
    uptime: '7 days, 14 hours',
    processes: 42,
    networkStatus: 'Connected'
  });

  const showNotification = (message, type = 'success') => {
    if (settings.soundEffects) {
      // Play sound effect if enabled
      console.log(`Sound: ${type} notification`);
    }
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateSetting = (key, value) => {
    updateSetting(key, value);
    showNotification(`${key} updated successfully`);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      resetSettings();
      showNotification('Settings reset to default', 'info');
    }
  };

  const exportSettings = () => {
    try {
      const dataStr = JSON.stringify(settings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `auraos-settings-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showNotification('Settings exported successfully');
    } catch (error) {
      showNotification('Failed to export settings', 'error');
    }
  };

  const importSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedSettings = JSON.parse(e.target.result);
            // Validate settings structure
            const validKeys = Object.keys(settings);
            const isValid = Object.keys(importedSettings).every(key => validKeys.includes(key));
            
            if (isValid && window.confirm('Are you sure you want to import these settings?')) {
              Object.entries(importedSettings).forEach(([key, value]) => {
                updateSetting(key, value);
              });
              showNotification('Settings imported successfully');
            } else {
              showNotification('Invalid settings file', 'error');
            }
          } catch (error) {
            showNotification('Failed to import settings', 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description, disabled = false }) => (
    <div className={`flex items-center justify-between p-3 bg-black/20 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors ${disabled ? 'opacity-50' : ''}`}>
      <div>
        <h4 className="text-white font-medium">{label}</h4>
        {description && <p className="text-white/60 text-sm mt-1">{description}</p>}
      </div>
      <button
        onClick={() => !disabled && onToggle(!enabled)}
        disabled={disabled}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-green-500' : 'bg-gray-600'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="settings-app h-full bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-white">Loading quantum settings...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'behavior', label: 'Behavior', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'system', label: 'System', icon: Monitor },
    { id: 'about', label: 'About', icon: Brain }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                Theme Settings
              </h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'dark', label: 'Dark', icon: Moon, color: 'from-gray-800 to-black' },
                  { id: 'light', label: 'Light', icon: Sun, color: 'from-white to-gray-200' },
                  { id: 'glassy', label: 'Glassy', icon: Sparkles, color: 'from-purple-500/20 to-cyan-500/20' }
                ].map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => handleUpdateSetting('theme', theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      settings.theme === theme.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-black/20 hover:border-white/40'
                    }`}
                  >
                    <div className={`w-full h-16 bg-gradient-to-br ${theme.color} rounded-lg mb-2 flex items-center justify-center`}>
                      <theme.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white text-sm font-medium">{theme.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <ToggleSwitch
                enabled={settings.animations}
                onToggle={(value) => handleUpdateSetting('animations', value)}
                label="Quantum Animations"
                description="Enable smooth transitions and quantum effects"
              />
              
              <ToggleSwitch
                enabled={settings.neuralPulse}
                onToggle={(value) => handleUpdateSetting('neuralPulse', value)}
                label="Neural Pulse Indicator"
                description="Show neural activity pulse in the corner"
              />
              
              <ToggleSwitch
                enabled={settings.quantumParticles}
                onToggle={(value) => handleUpdateSetting('quantumParticles', value)}
                label="Quantum Particles"
                description="Display animated quantum field particles"
                disabled={!settings.animations}
              />
              
              <ToggleSwitch
                enabled={settings.backgroundBlur}
                onToggle={(value) => handleUpdateSetting('backgroundBlur', value)}
                label="Background Blur"
                description="Apply blur effects to window backgrounds"
              />
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Font Size
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'small', label: 'Small', icon: Smartphone },
                  { value: 'medium', label: 'Medium', icon: Tablet },
                  { value: 'large', label: 'Large', icon: Laptop }
                ].map(size => (
                  <button
                    key={size.value}
                    onClick={() => handleUpdateSetting('fontSize', size.value)}
                    className={`px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                      settings.fontSize === size.value
                        ? 'bg-purple-500 text-white'
                        : 'bg-black/20 text-white/70 hover:bg-black/30'
                    }`}
                  >
                    <size.icon className="w-4 h-4" />
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'behavior':
        return (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              Behavior Settings
            </h3>
            
            <div className="space-y-3">
              <ToggleSwitch
                enabled={settings.autoSave}
                onToggle={(value) => handleUpdateSetting('autoSave', value)}
                label="Auto-Save"
                description="Automatically save files after 3 seconds of inactivity"
              />
              
              <ToggleSwitch
                enabled={settings.soundEffects}
                onToggle={(value) => handleUpdateSetting('soundEffects', value)}
                label="Sound Effects"
                description="Play sounds for notifications and interactions"
              />
              
              <ToggleSwitch
                enabled={settings.aiFeatures}
                onToggle={(value) => handleUpdateSetting('aiFeatures', value)}
                label="AI Assistant"
                description="Enable quantum AI assistance features"
              />
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Default Folder Path
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.defaultFolderPath}
                  onChange={(e) => handleUpdateSetting('defaultFolderPath', e.target.value)}
                  className="flex-1 px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50"
                  placeholder="Enter default path..."
                />
                <button
                  onClick={() => handleUpdateSetting('defaultFolderPath', '/')}
                  className="px-4 py-2 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-300 hover:bg-gray-500/30 transition-all"
                  title="Reset to root"
                >
                  <FolderOpen className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Language
              </h4>
              <select
                value={settings.language}
                onChange={(e) => handleUpdateSetting('language', e.target.value)}
                className="w-full px-4 py-2 bg-black/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="ja">🇯🇵 日本語</option>
                <option value="zh">🇨🇳 中文</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="ar">🇸🇦 العربية</option>
              </select>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Security Settings
            </h3>
            
            <div className="space-y-3">
              <ToggleSwitch
                enabled={settings.encryptByDefault}
                onToggle={(value) => handleUpdateSetting('encryptByDefault', value)}
                label="Encrypt by Default"
                description="Automatically encrypt all new files"
              />
            </div>

            <div className="bg-black/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-medium">Quantum Security Status</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Encryption Module</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Neural Firewall</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Protected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Quantum Authentication</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm">Verified</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Security Level</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Maximum</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <h4 className="text-white font-medium">Security Recommendations</h4>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Enable default encryption for sensitive data</li>
                <li>• Regularly export your settings as backup</li>
                <li>• Use strong encryption keys for files</li>
                <li>• Keep your quantum modules updated</li>
              </ul>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Performance Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <h4 className="text-white font-medium">System Performance</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">CPU Usage</span>
                    <span className="text-blue-400">23%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-medium">Memory Usage</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">RAM</span>
                    <span className="text-green-400">{systemInfo.memoryUsage}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: systemInfo.memoryUsage }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium">Performance Options</h4>
              
              <ToggleSwitch
                enabled={settings.animations}
                onToggle={(value) => handleUpdateSetting('animations', value)}
                label="Hardware Acceleration"
                description="Use GPU for smooth animations and effects"
              />
              
              <ToggleSwitch
                enabled={settings.backgroundBlur}
                onToggle={(value) => handleUpdateSetting('backgroundBlur', value)}
                label="Background Effects"
                description="Enable background blur and visual effects"
              />
              
              <ToggleSwitch
                enabled={settings.quantumParticles}
                onToggle={(value) => handleUpdateSetting('quantumParticles', value)}
                label="Quantum Particles"
                description="Show animated particles (may impact performance)"
              />
            </div>

            <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Performance Tips</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Disable animations on slower devices</li>
                <li>• Reduce particle effects for better performance</li>
                <li>• Use dark theme for OLED displays</li>
                <li>• Keep fewer apps open simultaneously</li>
              </ul>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="space-y-6">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-400" />
              System Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <h4 className="text-white font-medium">Quantum Core</h4>
                </div>
                <div className="text-2xl text-blue-400 font-bold mb-1">{systemInfo.quantumCore}</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: systemInfo.quantumCore }}
                  />
                </div>
              </div>

              <div className="bg-black/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white font-medium">Neural Network</h4>
                </div>
                <div className="text-2xl text-purple-400 font-bold mb-1">{systemInfo.neuralNetwork}</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: systemInfo.neuralNetwork }}
                  />
                </div>
              </div>

              <div className="bg-black/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <HardDrive className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-medium">Memory Usage</h4>
                </div>
                <div className="text-2xl text-green-400 font-bold mb-1">{systemInfo.memoryUsage}</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: systemInfo.memoryUsage }}
                  />
                </div>
              </div>

              <div className="bg-black/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-white font-medium">System Status</h4>
                </div>
                <div className="text-lg text-yellow-400 font-medium">Optimal</div>
                <div className="text-white/60 text-sm">All systems operational</div>
              </div>
            </div>

            <div className="bg-black/20 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">System Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Uptime:</span>
                  <span className="text-white ml-2">{systemInfo.uptime}</span>
                </div>
                <div>
                  <span className="text-white/60">Processes:</span>
                  <span className="text-white ml-2">{systemInfo.processes}</span>
                </div>
                <div>
                  <span className="text-white/60">Network:</span>
                  <span className="text-green-400 ml-2">{systemInfo.networkStatus}</span>
                </div>
                <div>
                  <span className="text-white/60">Architecture:</span>
                  <span className="text-cyan-400 ml-2">Neural x64</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleResetSettings}
                className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Settings
              </button>
              
              <button
                onClick={exportSettings}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Settings
              </button>

              <button
                onClick={importSettings}
                className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-all flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import Settings
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reload System
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">AuraOS</h2>
              <p className="text-purple-300 text-lg">Quantum Desktop Environment</p>
            </div>

            <div className="bg-black/20 border border-purple-500/30 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-white/60 text-sm">Version</div>
                  <div className="text-white font-mono">{systemInfo.version}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm">Build</div>
                  <div className="text-white font-mono">{systemInfo.build}</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm">Codename</div>
                  <div className="text-purple-300">Quantum Leap</div>
                </div>
                <div>
                  <div className="text-white/60 text-sm">Architecture</div>
                  <div className="text-cyan-300">Neural x64</div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 border border-cyan-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Features</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">Quantum File System</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">Neural Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">Encryption Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">Multi-theme Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70">AI Integration</span>
                </div>
              </div>
            </div>

            <div className="text-center text-white/60 text-sm">
              <p>© 2050 Quantum Systems Inc.</p>
              <p className="mt-2">Powered by Neural Networks & Quantum Computing</p>
              <p className="mt-2">Build with React & Next.js • Styled with Tailwind CSS</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="settings-app h-full bg-black/20 backdrop-blur-xl border border-purple-500/30 rounded-lg overflow-hidden flex"
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
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 border-r border-purple-500/30 bg-black/20 p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold">Settings</h1>
            <p className="text-purple-300 text-sm">Quantum Configuration</p>
          </div>
        </div>

        <nav className="space-y-2">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 p-3 bg-black/30 rounded-lg border border-purple-500/20">
          <h4 className="text-white font-medium text-sm mb-2">Quick Stats</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-white/60">Theme:</span>
              <span className="text-purple-300 capitalize">{settings.theme}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Features:</span>
              <span className="text-cyan-300">
                {Object.values(settings).filter(v => v === true).length} enabled
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Font:</span>
              <span className="text-green-300 capitalize">{settings.fontSize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsApp;

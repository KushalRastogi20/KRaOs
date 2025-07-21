export default {
  name: 'settings',
  description: 'System settings management',
  usage: 'settings [get|set|list|reset] [key] [value]',
  
  execute: async (args, { terminalState, updateState, addOutput }, onLaunchApp) => {
    const action = args[0] ? args[0].toLowerCase() : 'list';

    switch (action) {
      case 'list':
      case 'show':
        addOutput({
          type: 'info',
          content: `⚙️  Aura OS SYSTEM SETTINGS:

┌─ DISPLAY SETTINGS ─────────────┐
│ theme: ${terminalState.theme.padEnd(24)} │
│ fontSize: ${terminalState.fontSize.padEnd(21)} │
└────────────────────────────────┘

┌─ SECURITY SETTINGS ────────────┐
│ encryptionEnabled: ${(terminalState.encryptionEnabled ? 'true' : 'false').padEnd(13)} │
└────────────────────────────────┘

┌─ NEURAL SETTINGS ──────────────┐
│ isNeuralActive: ${(terminalState.isNeuralActive ? 'true' : 'false').padEnd(16)} │
│ quantumState: ${terminalState.quantumState.padEnd(18)} │
└────────────────────────────────┘

┌─ SYSTEM INFO ──────────────────┐
│ currentDirectory: ${terminalState.currentDirectory.padEnd(14)} │
│ openApps: ${terminalState.openApps.length} active${' '.repeat(17)} │
│ commandHistory: ${terminalState.commandHistory.length} entries${' '.repeat(13)} │
└────────────────────────────────┘

Usage:
  settings get <key>        - Get setting value
  settings set <key> <val>  - Set setting value
  settings reset           - Reset to defaults
  settings ui              - Open settings interface`
        });
        break;

      case 'get':
        if (!args[1]) {
          addOutput({
            type: 'error',
            content: 'Usage: settings get <key>\nAvailable keys: theme, fontSize, encryptionEnabled, isNeuralActive'
          });
          return;
        }
        
        const key = args[1];
        const value = terminalState[key];
        
        if (value !== undefined) {
          addOutput({
            type: 'success',
            content: `${key} = ${value}`
          });
        } else {
          addOutput({
            type: 'error',
            content: `Unknown setting: ${key}`
          });
        }
        break;

      case 'set':
        if (!args[1] || !args[2]) {
          addOutput({
            type: 'error',
            content: 'Usage: settings set <key> <value>\nExample: settings set theme dark'
          });
          return;
        }
        
        const settingKey = args[1];
        let settingValue = args[2];
        
        // Parse boolean values
        if (settingValue === 'true') settingValue = true;
        if (settingValue === 'false') settingValue = false;
        
        // Validate setting
        const validSettings = {
          theme: ['light', 'dark', 'glassy'],
          fontSize: ['small', 'medium', 'large'],
          encryptionEnabled: [true, false],
          isNeuralActive: [true, false]
        };
        
        if (!validSettings[settingKey]) {
          addOutput({
            type: 'error',
            content: `Unknown setting: ${settingKey}\nValid settings: ${Object.keys(validSettings).join(', ')}`
          });
          return;
        }
        
        if (!validSettings[settingKey].includes(settingValue)) {
          addOutput({
            type: 'error',
            content: `Invalid value for ${settingKey}: ${settingValue}\nValid values: ${validSettings[settingKey].join(', ')}`
          });
          return;
        }
        
        const oldValue = terminalState[settingKey];
        updateState({ [settingKey]: settingValue });
        
        // Apply theme change if needed
        if (settingKey === 'theme') {
          document.documentElement.className = `theme-${settingValue}`;
        }
        
        addOutput({
          type: 'success',
          content: `✅ Setting updated: ${settingKey} changed from ${oldValue} to ${settingValue}`
        });
        break;

      case 'reset':
        const defaults = {
          theme: 'dark',
          fontSize: 'medium',
          encryptionEnabled: false,
          isNeuralActive: false,
          quantumState: 'DORMANT',
          currentDirectory: '/home/Aura'
        };
        
        updateState(defaults);
        document.documentElement.className = 'theme-dark';
        
        addOutput({
          type: 'success',
          content: `🔄 All settings reset to defaults:
          
┌─ RESET COMPLETE ───────────────┐
│ Theme: dark                    │
│ Font Size: medium              │
│ Encryption: disabled           │
│ Neural: inactive               │
│ Quantum: dormant               │
│ Directory: /home/Aura         │
└────────────────────────────────┘`
        });
        break;

      case 'ui':
      case 'interface':
      case 'gui':
        addOutput({
          type: 'success',
          content: '🖥️  Launching Settings Interface...'
        });
        
        if (onLaunchApp) {
          onLaunchApp('settings');
        }
        break;

      case 'export':
        const exportData = JSON.stringify({
          ...terminalState,
          exportedAt: new Date().toISOString(),
          version: '1.0'
        }, null, 2);
        
        addOutput({
          type: 'info',
          content: `📤 Settings Export:
          
${exportData}

Settings exported successfully. Copy the above JSON to backup your configuration.`
        });
        break;

      case 'backup':
        // Create a backup in localStorage
        const backupKey = `Aura-settings-backup-${Date.now()}`;
        const backupData = {
          ...terminalState,
          backupDate: new Date().toISOString()
        };
        
        localStorage.setItem(backupKey, JSON.stringify(backupData));
        
        addOutput({
          type: 'success',
          content: `💾 Settings backed up successfully!
Backup key: ${backupKey}
Use 'settings restore' to view available backups.`
        });
        break;

      default:
        addOutput({
          type: 'error',
          content: `Unknown settings action: ${action}
          
Available actions:
  list    - Show all settings
  get     - Get a setting value  
  set     - Set a setting value
  reset   - Reset to defaults
  ui      - Open settings interface
  export  - Export settings as JSON
  backup  - Create settings backup`
        });
    }
  }
};

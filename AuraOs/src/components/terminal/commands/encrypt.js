export default {
  name: 'encrypt',
  description: 'Toggle encryption system',
  usage: 'encrypt [on|off|status]',
  
  execute: async (args, { terminalState, updateState, addOutput }) => {
    const action = args[0] ? args[0].toLowerCase() : 'toggle';

    switch (action) {
      case 'on':
      case 'enable':
        if (terminalState.encryptionEnabled) {
          addOutput({
            type: 'warning',
            content: '🔒 Encryption is already enabled'
          });
        } else {
          updateState({ encryptionEnabled: true });
          addOutput({
            type: 'success',
            content: `🔒 Encryption system ACTIVATED

┌─ ENCRYPTION STATUS ─┐
│ Algorithm: AES-256  │
│ Key Length: 256-bit │
│ Mode: GCM          │
│ Status: ACTIVE     │
│ Quantum-Safe: YES  │
└────────────────────┘

All data operations will now be encrypted.
Warning: Keep your encryption keys secure!`
          });
        }
        break;

      case 'off':
      case 'disable':
        if (!terminalState.encryptionEnabled) {
          addOutput({
            type: 'warning',
            content: '🔓 Encryption is already disabled'
          });
        } else {
          updateState({ encryptionEnabled: false });
          addOutput({
            type: 'warning',
            content: `🔓 Encryption system DEACTIVATED

┌─ SECURITY WARNING ─┐
│ Data is now stored │
│ in PLAINTEXT mode  │
│ Security Level: LOW │
└────────────────────┘

Warning: Data operations are no longer encrypted!`
          });
        }
        break;

      case 'status':
        const status = terminalState.encryptionEnabled;
        const securityLevel = status ? 'HIGH' : 'LOW';
        const algorithm = status ? 'AES-256-GCM' : 'PLAINTEXT';
        
        addOutput({
          type: 'info',
          content: `🔐 Encryption System Status:

┌─ SECURITY OVERVIEW ─┐
│ Enabled: ${status ? 'YES' : 'NO'.padEnd(12)} │
│ Algorithm: ${algorithm.padEnd(9)} │
│ Level: ${securityLevel.padEnd(13)} │
│ Quantum-Safe: ${status ? 'YES' : 'N/A'.padEnd(9)} │
│ Key Rotation: ${status ? 'AUTO' : 'N/A'.padEnd(8)} │
└─────────────────────┘

${status ? 
  'All file operations and data storage are encrypted.' : 
  'WARNING: Data is stored without encryption!'}`
        });
        break;

      case 'toggle':
      default:
        const newState = !terminalState.encryptionEnabled;
        updateState({ encryptionEnabled: newState });
        
        if (newState) {
          addOutput({
            type: 'success',
            content: '🔒 Encryption system enabled. Data security activated.'
          });
        } else {
          addOutput({
            type: 'warning',
            content: '🔓 Encryption system disabled. Data security deactivated.'
          });
        }
        break;
    }
  }
};

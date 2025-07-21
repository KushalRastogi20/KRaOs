export default {
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [path]',
  
  execute: async (args, { terminalState, addOutput }) => {
    const path = args[0] || terminalState.currentDirectory;
    
    // Mock directory structure
    const directories = {
      '/': ['home', 'usr', 'var', 'tmp', 'system'],
      '/home': ['Aura'],
      '/home/Aura': ['documents', 'downloads', 'projects', 'neural-data', 'quantum-cache'],
      '/home/Aura/documents': ['readme.txt', 'notes.md', 'config.json'],
      '/home/Aura/projects': ['neural-net', 'quantum-algo', 'Aura-os'],
      '/usr': ['bin', 'lib', 'share'],
      '/system': ['neural-core', 'quantum-engine', 'security']
    };

    const contents = directories[path] || directories[terminalState.currentDirectory] || [];
    
    if (contents.length === 0) {
      addOutput({
        type: 'warning',
        content: 'Directory empty or not found'
      });
    } else {
      const formatted = contents.map(item => {
        const isDir = directories[`${path}/${item}`] || directories[`${terminalState.currentDirectory}/${item}`];
        return isDir ? `📁 ${item}/` : `📄 ${item}`;
      }).join('  ');
      
      addOutput({
        type: 'success',
        content: formatted
      });
    }
  }
};

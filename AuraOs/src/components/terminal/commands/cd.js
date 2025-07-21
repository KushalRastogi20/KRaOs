export default {
  name: 'cd',
  description: 'Change directory',
  usage: 'cd <path>',
  
  execute: async (args, { terminalState, updateState, addOutput }) => {
    if (!args[0]) {
      updateState({ currentDirectory: '/home/Aura' });
      addOutput({
        type: 'success',
        content: 'Changed to home directory'
      });
      return;
    }

    let newPath;
    const target = args[0];

    if (target === '..') {
      const pathParts = terminalState.currentDirectory.split('/');
      pathParts.pop();
      newPath = pathParts.join('/') || '/';
    } else if (target.startsWith('/')) {
      newPath = target;
    } else {
      newPath = `${terminalState.currentDirectory}/${target}`.replace('//', '/');
    }

    // Validate path exists (mock validation)
    const validPaths = ['/', '/home', '/home/Aura', '/home/Aura/documents', '/home/Aura/projects', '/usr', '/system'];
    
    if (validPaths.includes(newPath)) {
      updateState({ currentDirectory: newPath });
      addOutput({
        type: 'success',
        content: `Changed directory to ${newPath}`
      });
    } else {
      addOutput({
        type: 'error',
        content: `Directory not found: ${newPath}`
      });
    }
  }
};

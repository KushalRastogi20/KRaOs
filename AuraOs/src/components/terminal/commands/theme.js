export default {
  name: 'theme',
  description: 'Change system theme',
  usage: 'theme <mode>',
  
  execute: async (args, { terminalState, updateState, addOutput }) => {
    if (!args[0]) {
      addOutput({
        type: 'info',
        content: `Current theme: ${terminalState.theme}\nAvailable themes: light, dark, glassy`
      });
      return;
    }

    const theme = args[0].toLowerCase();
    const validThemes = ['light', 'dark', 'glassy'];

    if (!validThemes.includes(theme)) {
      addOutput({
        type: 'error',
        content: `Invalid theme: ${theme}\nAvailable themes: ${validThemes.join(', ')}`
      });
      return;
    }

    updateState({ theme });
    
    // Apply theme to document
    document.documentElement.className = `theme-${theme}`;
    
    addOutput({
      type: 'success',
      content: `🎨 Theme changed to ${theme}`
    });
  }
};

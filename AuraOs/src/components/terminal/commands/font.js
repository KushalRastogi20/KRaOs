export default {
  name: 'font',
  description: 'Change font size',
  usage: 'font <size>',
  
  execute: async (args, { terminalState, updateState, addOutput }) => {
    if (!args[0]) {
      addOutput({
        type: 'info',
        content: `Current font size: ${terminalState.fontSize}
Available sizes: small, medium, large

Usage: font <size>
Examples:
  font small    - Set to small font (12px)
  font medium   - Set to medium font (14px)  
  font large    - Set to large font (18px)`
      });
      return;
    }

    const size = args[0].toLowerCase();
    const validSizes = ['small', 'medium', 'large'];

    if (!validSizes.includes(size)) {
      addOutput({
        type: 'error',
        content: `Invalid font size: ${size}
Available sizes: ${validSizes.join(', ')}`
      });
      return;
    }

    const oldSize = terminalState.fontSize;
    updateState({ fontSize: size });
    
    const sizeMap = {
      small: '12px',
      medium: '14px', 
      large: '18px'
    };

    addOutput({
      type: 'success',
      content: `🔤 Font size changed from ${oldSize} to ${size} (${sizeMap[size]})`
    });

    // Apply font size change to document if needed
    document.documentElement.style.setProperty('--terminal-font-size', sizeMap[size]);
  }
};

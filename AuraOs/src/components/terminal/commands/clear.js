export default {
  name: 'clear',
  description: 'Clear the terminal output',
  usage: 'clear',
  
  execute: async (args, { clearOutput }) => {
    clearOutput();
  }
};

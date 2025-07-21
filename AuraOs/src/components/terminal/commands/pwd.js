export default {
  name: 'pwd',
  description: 'Print current directory',
  usage: 'pwd',
  
  execute: async (args, { terminalState, addOutput }) => {
    addOutput({
      type: 'info',
      content: terminalState.currentDirectory
    });
  }
};

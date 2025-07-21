export default {
  name: 'help',
  description: 'Display all available commands',
  usage: 'help [command]',
  
  execute: async (args, { addOutput }) => {
    if (args[0]) {
      // Show help for specific command
      addOutput({
        type: 'info',
        content: `Help for specific command: ${args[0]} (detailed help would go here)`
      });
    } else {
      // Show all commands
      const helpText = `
🚀 Aura OS Terminal Commands:

📁 FILE SYSTEM:
  ls              List directory contents
  cd <path>       Change directory
  pwd             Print current directory

🖥️  SYSTEM:
  system          Show system information
  status          Display system status
  settings        Open settings interface

🎨 INTERFACE:
  theme <mode>    Change theme (light/dark/glassy)
  font <size>     Change font size (small/medium/large)
  clear           Clear terminal output

🔐 SECURITY:
  encrypt         Toggle encryption system

🚀 APPLICATIONS:
  launch <app>    Launch applications (notepad/filemanager/settings)

🧠 ADVANCED:
  neural          Activate neural network interface
  quantum         Run quantum algorithms
  matrix          Enter matrix mode

📚 UTILITY:
  help [cmd]      Show this help or command-specific help
  
💡 TIP: Commands can be chained with && (e.g., "theme dark && clear")
`;
      addOutput({
        type: 'info',
        content: helpText
      });
    }
  }
};

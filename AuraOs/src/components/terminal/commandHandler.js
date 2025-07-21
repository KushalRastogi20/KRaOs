import helpCommand from './commands/help.js';
import clearCommand from './commands/clear.js';
import lsCommand from './commands/ls.js';
import cdCommand from './commands/cd.js';
import pwdCommand from './commands/pwd.js';
import touchCommand from './commands/touch.js';
import mkdirCommand from './commands/mkdir.js';
import launchCommand from './commands/launch.js';
import themeCommand from './commands/theme.js';
import fontCommand from './commands/font.js';
import encryptCommand from './commands/encrypt.js';
import settingsCommand from './commands/settings.js';
import systemCommand from './commands/system.js';
import neuralCommand from './commands/neural.js';
import quantumCommand from './commands/quantum.js';
import statusCommand from './commands/status.js';
import matrixCommand from './commands/matrix.js';
import neoCommand from './commands/neo.js';

const commands = {
  help: helpCommand,
  clear: clearCommand,
  ls: lsCommand,
  cd: cdCommand,
  pwd: pwdCommand,
  touch: touchCommand,
  mkdir: mkdirCommand,
  launch: launchCommand,
  theme: themeCommand,
  font: fontCommand,
  encrypt: encryptCommand,
  settings: settingsCommand,
  system: systemCommand,
  neural: neuralCommand,
  quantum: quantumCommand,
  status: statusCommand,
   neo: neoCommand,
  matrix: matrixCommand
};

export const handleCommand = async (input, terminalContext, onLaunchApp) => {
  const { terminalState, addOutput, addToHistory } = terminalContext;
  
  if (!input.trim()) return;

  // Add to history
  addToHistory(input);

  // Parse command and arguments
  const parts = input.trim().split(' ');
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Add command to output
  addOutput({
    type: 'command',
    content: `${getPrompt(terminalState)}${input}`,
    isCommand: true
  });

  // Handle command chaining with &&
  if (input.includes('&&')) {
    const chainedCommands = input.split('&&').map(cmd => cmd.trim());
    for (const cmd of chainedCommands) {
      await handleCommand(cmd, terminalContext, onLaunchApp);
    }
    return;
  }

  // Execute command
  const command = commands[commandName];
  if (command) {
    try {
      await command.execute(args, terminalContext, onLaunchApp);
    } catch (error) {
      addOutput({
        type: 'error',
        content: `Error executing command: ${error.message}`
      });
    }
  } else {
    addOutput({
      type: 'error',
      content: `Command not found: ${commandName}. Type 'help' for available commands.`
    });
  }
};

export const getPrompt = (state) => {
  const path = state.currentDirectory.replace('/home/kuter', '~');
  return `kuter@kuterOS:${path}$ `;
};

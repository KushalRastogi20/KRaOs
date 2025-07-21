export default {
  name: 'launch',
  description: 'Launch applications',
  usage: 'launch <app>',
  
  execute: async (args, { terminalState, updateState, addOutput }, onLaunchApp) => {
    if (!args[0]) {
      addOutput({
        type: 'error',
        content: 'Usage: launch <app>\nAvailable apps: notepad, filemanager, settings'
      });
      return;
    }

    const app = args[0].toLowerCase();
    const validApps = ['notepad', 'filemanager', 'settings'];

    if (!validApps.includes(app)) {
      addOutput({
        type: 'error',
        content: `Unknown application: ${app}\nAvailable apps: ${validApps.join(', ')}`
      });
      return;
    }

    // Add to open apps
    const openApps = [...terminalState.openApps];
    if (!openApps.includes(app)) {
      openApps.push(app);
      updateState({ openApps });
    }

    addOutput({
      type: 'success',
      content: `🚀 Launching ${app}...`
    });

    // Call the launch callback
    if (onLaunchApp) {
      onLaunchApp(app);
    }
  }
};

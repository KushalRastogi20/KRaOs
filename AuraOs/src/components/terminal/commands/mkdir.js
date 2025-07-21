export default {
  name: 'mkdir',
  description: 'Create directories',
  usage: 'mkdir [-p] <directory> [directory2] [...]',
  
  execute: async (args, { terminalState, updateState, addOutput }) => {
    if (!args.length) {
      addOutput({
        type: 'error',
        content: `Usage: mkdir [-p] <directory> [directory2] [...]
        
Options:
  -p    Create parent directories as needed
  
Examples:
  mkdir newdir                    - Create directory 'newdir'
  mkdir dir1 dir2 dir3           - Create multiple directories
  mkdir -p /path/to/deep/dir     - Create nested directories
  mkdir ~/projects/myapp         - Create directory in home`
      });
      return;
    }

    let createParents = false;
    let directories = [...args];
    
    // Check for -p flag
    if (args[0] === '-p') {
      createParents = true;
      directories = args.slice(1);
    }
    
    if (directories.length === 0) {
      addOutput({
        type: 'error',
        content: 'mkdir: missing directory name after -p flag'
      });
      return;
    }

    const currentPath = terminalState.currentDirectory;
    const createdDirs = [];
    const existingDirs = [];
    const errors = [];

    for (const dirName of directories) {
      try {
        // Handle home directory shortcut
        let targetPath = dirName.replace('~', '/home/kuter');
        
        // Determine full path
        if (!targetPath.startsWith('/')) {
          targetPath = `${currentPath}/${targetPath}`.replace('//', '/');
        }

        // Validate directory name
        if (targetPath.includes('..') && !createParents) {
          errors.push(`Invalid directory name: ${dirName}`);
          continue;
        }

        // Check if directory already exists
        if (directoryExists(targetPath)) {
          existingDirs.push(targetPath);
          continue;
        }

        if (createParents) {
          // Create parent directories if needed
          const pathParts = targetPath.split('/').filter(Boolean);
          let currentDir = '';
          
          for (const part of pathParts) {
            currentDir += '/' + part;
            if (!directoryExists(currentDir)) {
              createdDirs.push(currentDir);
            }
          }
        } else {
          // Check if parent directory exists
          const parentPath = targetPath.split('/').slice(0, -1).join('/') || '/';
          if (!directoryExists(parentPath)) {
            errors.push(`Cannot create directory '${dirName}': parent directory does not exist (use -p to create parent directories)`);
            continue;
          }
          
          createdDirs.push(targetPath);
        }
      } catch (error) {
        errors.push(`Error creating directory ${dirName}: ${error.message}`);
      }
    }

    // Generate output
    let output = '';
    
    if (createdDirs.length > 0) {
      // Remove duplicates
      const uniqueDirs = [...new Set(createdDirs)];
      output += `📁 Created ${uniqueDirs.length} director${uniqueDirs.length === 1 ? 'y' : 'ies'}:
${uniqueDirs.map(dir => `  ✅ ${dir}`).join('\n')}\n\n`;
    }
    
    if (existingDirs.length > 0) {
      output += `📂 Already exists:
${existingDirs.map(dir => `  ℹ️  ${dir}`).join('\n')}\n\n`;
    }
    
    if (errors.length > 0) {
      output += `❌ Errors:
${errors.map(e => `  ⚠️  ${e}`).join('\n')}`;
    }

    if (createdDirs.length === 0 && existingDirs.length === 0 && errors.length === 0) {
      output = '✅ Directory creation completed';
    }

    // Update terminal state with new directories (mock)
    if (createdDirs.length > 0) {
      // In a real implementation, you'd update the file system
      // For now, we'll just show success
    }

    addOutput({
      type: errors.length > 0 ? 'warning' : 'success',
      content: output.trim()
    });
  }
};

// Helper function to check if directory exists (mock)
function directoryExists(path) {
  const validDirs = [
    '/',
    '/home',
    '/home/kuter',
    '/home/kuter/documents',
    '/home/kuter/downloads',
    '/home/kuter/projects',
    '/home/kuter/neural-data',
    '/home/kuter/quantum-cache',
    '/usr',
    '/usr/bin',
    '/usr/lib',
    '/usr/share',
    '/var',
    '/tmp',
    '/system',
    '/system/neural-core',
    '/system/quantum-engine',
    '/system/security'
  ];
  
  return validDirs.includes(path);
}

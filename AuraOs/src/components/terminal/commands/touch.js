export default {
  name: 'touch',
  description: 'Create empty files or update timestamps',
  usage: 'touch <filename> [filename2] [...]',
  
  execute: async (args, { terminalState, addOutput }) => {
    if (!args.length) {
      addOutput({
        type: 'error',
        content: `Usage: touch <filename> [filename2] [...]
        
Examples:
  touch file.txt              - Create or update file.txt
  touch doc1.md doc2.md       - Create multiple files
  touch /home/kuter/test.log  - Create file with full path`
      });
      return;
    }

    const currentPath = terminalState.currentDirectory;
    const createdFiles = [];
    const updatedFiles = [];
    const errors = [];

    for (const filename of args) {
      try {
        // Determine full path
        let fullPath;
        if (filename.startsWith('/')) {
          fullPath = filename;
        } else {
          fullPath = `${currentPath}/${filename}`.replace('//', '/');
        }

        // Extract directory and filename
        const pathParts = fullPath.split('/');
        const fileName = pathParts.pop();
        const directory = pathParts.join('/') || '/';

        // Validate filename
        if (!fileName || fileName.includes('..') || fileName.includes('<') || fileName.includes('>')) {
          errors.push(`Invalid filename: ${filename}`);
          continue;
        }

        // Mock file system - check if file exists
        const existingFiles = getFilesInDirectory(directory);
        const fileExists = existingFiles.some(f => f.name === fileName);

        if (fileExists) {
          // Update timestamp (mock)
          updatedFiles.push({
            name: fileName,
            path: directory,
            size: Math.floor(Math.random() * 1000),
            modified: new Date().toISOString(),
            type: getFileType(fileName)
          });
        } else {
          // Create new file
          createdFiles.push({
            name: fileName,
            path: directory,
            size: 0,
            created: new Date().toISOString(),
            modified: new Date().toISOString(),
            type: getFileType(fileName)
          });
        }
      } catch (error) {
        errors.push(`Error processing ${filename}: ${error.message}`);
      }
    }

    // Generate output
    let output = '';
    
    if (createdFiles.length > 0) {
      output += `📄 Created ${createdFiles.length} file(s):
${createdFiles.map(f => `  ✅ ${f.path}/${f.name} (${f.type})`).join('\n')}\n\n`;
    }
    
    if (updatedFiles.length > 0) {
      output += `🔄 Updated ${updatedFiles.length} file(s):
${updatedFiles.map(f => `  ⏰ ${f.path}/${f.name} (timestamp updated)`).join('\n')}\n\n`;
    }
    
    if (errors.length > 0) {
      output += `❌ Errors:
${errors.map(e => `  ⚠️  ${e}`).join('\n')}`;
    }

    if (createdFiles.length === 0 && updatedFiles.length === 0 && errors.length === 0) {
      output = '✅ Touch operation completed successfully';
    }

    addOutput({
      type: errors.length > 0 ? 'warning' : 'success',
      content: output.trim()
    });
  }
};

// Helper functions
function getFilesInDirectory(directory) {
  // Mock file system data
  const mockFiles = {
    '/': [],
    '/home': [],
    '/home/kuter': [
      { name: 'readme.txt', type: 'text' },
      { name: 'config.json', type: 'json' }
    ],
    '/home/Aura': [
      { name: 'profile.txt', type: 'text' }
    ],
    '/home/Aura/projects': [],
    '/home/kuter/documents': [
      { name: 'notes.md', type: 'markdown' },
      { name: 'report.pdf', type: 'pdf' }
    ],
    '/home/kuter/projects': []
  };
  
  return mockFiles[directory] || [];
}

function getFileType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const typeMap = {
    'txt': 'text',
    'md': 'markdown',
    'json': 'json',
    'js': 'javascript',
    'jsx': 'react',
    'ts': 'typescript',
    'py': 'python',
    'html': 'html',
    'css': 'css',
    'log': 'log',
    'conf': 'config',
    'cfg': 'config'
  };
  
  return typeMap[ext] || 'file';
}

export default {
  name: 'matrix',
  description: 'Enter matrix mode with futuristic animations',
  usage: 'matrix',
  
  execute: async (args, { addOutput, terminalState }) => {
    // Phase 1: Initialization
    addOutput({
      type: 'info',
      content: '🔄 Initializing Matrix Protocol...'
    });

    await delay(800);

    // Phase 2: System Scan Animation
    addOutput({
      type: 'warning',
      content: `⚡ SCANNING NEURAL PATHWAYS...
      
[████████████████████████████████████████] 100%

🧠 Neural networks: DETECTED
🔍 Consciousness level: ANALYZING
🌐 Reality matrix: PARSING
⚛️  Quantum state: FLUCTUATING`
    });

    await delay(1200);

    // Phase 3: Security Clearance
    addOutput({
      type: 'success',
      content: `🔐 CLEARANCE PROTOCOL INITIATED
      
┌─ SECURITY CHECK ─┐
│ User: Authorized  │
│ Level: MAXIMUM    │
│ Access: GRANTED   │
└───────────────────┘

🎯 Biometric scan: ✅ PASSED
🔑 Quantum key: ✅ VERIFIED
🛡️  Neural firewall: ✅ BYPASSED`
    });

    await delay(1000);

    // Phase 4: Dramatic countdown
    for (let i = 3; i >= 1; i--) {
      addOutput({
        type: 'warning',
        content: `⏰ MATRIX ENTRY IN ${i}...`
      });
      await delay(700);
    }

    // Phase 5: Glitch effect
    addOutput({
      type: 'error',
      content: `R̴̞̈E̵̲̍A̷̰̓L̶̰̎I̸̫̽T̴̰̏Y̷̱̌.̸̭̈E̶̺̽X̸̱̌E̵̞̾ ̷̣̍H̶̰̏A̶̭̔S̵̰̈ ̷̭̌S̶̭̾T̸̺̏O̶̰̚P̴̞̉P̶̪̾E̵̲̔D̸̪̄ ̷̞̌R̶̭̔Ḛ̵̅S̷̭̾P̴̺̽O̶̞̊Ṋ̷̊D̸̰̄I̶̪̽N̵̲̚G̷̭̾`
    });

    await delay(500);

    // Phase 6: Full Matrix ASCII Art
    const matrixArt = `
🔴 ENTERING THE MATRIX...

 █████╗ ██╗   ██╗██████╗  █████╗      ██████╗ ███████╗
██╔══██╗██║   ██║██╔══██╗██╔══██╗    ██╔═══██╗██╔════╝
███████║██║   ██║██████╔╝███████║    ██║   ██║███████╗
██╔══██║██║   ██║██╔══██╗██╔══██║    ██║   ██║╚════██║
██║  ██║╚██████╔╝██║  ██║██║  ██║    ╚██████╔╝███████║
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚══════╝

┌─────────────────────────────────────────────────────────────┐
│                    MATRIX ACCESS GRANTED                    │
│                     AuraOS Neural Matrix                    │
│                                                             │
│ "There is no spoon." - The Oracle                          │
│                                                             │
│ 🔹 Reality.exe has stopped responding                       │
│ 🔹 Loading alternative dimension...                         │
│ 🔹 Neural pathways reconfigured                            │
│ 🔹 Aura consciousness synchronized                          │
│ 🔹 Welcome to the desert of the real                       │
└─────────────────────────────────────────────────────────────┘

Type 'exit' to return to consensus reality.`;

    addOutput({
      type: 'success',
      content: matrixArt
    });

    await delay(1000);

    // Phase 7: Digital rain animation
    const rainFrames = [
      '║ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲ ║',
      '║ ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱ ║',
      '║ ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲ ║',
      '║ ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱ ║'
    ];

    for (let frame of rainFrames) {
      addOutput({
        type: 'info',
        content: `🌧️  DIGITAL RAIN ACTIVATED
        
╔════════════════════════════════════════════╗
${frame}
${frame}
${frame}
╚════════════════════════════════════════════╝`
      });
      await delay(300);
    }

    // Phase 8: Binary message with typing effect
    const binaryMessage = '01000001 01110101 01110010 01100001 01001111 01010011 00100000 01001101 01100001 01110100 01110010 01101001 01111000';
    const binaryChunks = binaryMessage.split(' ');
    
    let displayedBinary = '🔢 DECODING MATRIX PROTOCOL:\n\n';
    for (let chunk of binaryChunks) {
      displayedBinary += chunk + ' ';
      addOutput({
        type: 'info',
        content: displayedBinary + '█'
      });
      await delay(200);
    }

    // Phase 9: Final status
    await delay(500);
    addOutput({
      type: 'success',
      content: `🌟 AuraOS Matrix Protocol Activated
      
╔══════════════════════════════════════╗
║  Neural Interface: SYNCHRONIZED      ║
║  Quantum State: ENTANGLED           ║
║  Aura Field: RESONATING             ║
║  Consciousness Level: TRANSCENDENT   ║
║  Reality Status: MALLEABLE           ║
║  Matrix Mode: FULLY OPERATIONAL      ║
╚══════════════════════════════════════╝

🎭 You are now operating outside consensus reality.
⚡ All commands enhanced with quantum processing.
🔮 Type 'neo' for advanced matrix operations.`
    });
  }
};

// Helper function for delays
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

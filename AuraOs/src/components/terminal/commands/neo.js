export default {
  name: 'neo',
  description: 'Advanced matrix operations with futuristic animations',
  usage: 'neo [bullet-time|red-pill|blue-pill|architect|oracle|wake-up]',
  
  execute: async (args, { addOutput, terminalState }) => {
    const action = args[0] || 'help';

    switch (action.toLowerCase()) {
      case 'bullet-time':
        // Phase 1: Activation
        addOutput({
          type: 'warning',
          content: '⚡ INITIATING TEMPORAL DISTORTION...'
        });
        
        await delay(500);
        
        // Phase 2: System scan
        addOutput({
          type: 'info',
          content: `🔍 SCANNING TIME MATRIX...
          
[██████████████████████████████████████] 100%

⏱️  Temporal nodes: DETECTED
🌀 Time flow vectors: CALCULATING
⚛️  Quantum chronometer: SYNCHRONIZING
🎯 Reality anchor: STABILIZING`
        });
        
        await delay(800);
        
        // Phase 3: Bullet time sequence
        const bulletFrames = [
          '    •••• SLOW MOTION EFFECT ••••    \n    TIME DILATION: 20% ████░░░░░░',
          '    •••• SLOW MOTION EFFECT ••••    \n    TIME DILATION: 40% ████████░░',
          '    •••• SLOW MOTION EFFECT ••••    \n    TIME DILATION: 60% ████████████░░',
          '    •••• SLOW MOTION EFFECT ••••    \n    TIME DILATION: 80% ████████████████░░',
          '    •••• SLOW MOTION EFFECT ••••    \n    TIME DILATION: 100% ██████████████████'
        ];
        
        for (let frame of bulletFrames) {
          addOutput({
            type: 'warning',
            content: `🕰️  BULLET TIME ACTIVE
            
╔═══════════════════════════════════════╗
║                                       ║
║  ${frame}  ║
║                                       ║
╚═══════════════════════════════════════╝`
          });
          await delay(600);
        }
        
        await delay(1000);
        
        addOutput({
          type: 'success',
          content: `⚡ TEMPORAL MATRIX NORMALIZED
          
🎬 Bullet-time sequence complete
⏰ Chronometer synchronized
🌍 Reality flow: RESTORED
          
"Whoa." - Neo`
        });
        break;

      case 'red-pill':
        // Phase 1: Warning
        addOutput({
          type: 'warning',
          content: `🔴 RED PILL PROTOCOL INITIATED
          
⚠️  WARNING: This action cannot be undone
🚨 Consciousness will be permanently altered
📖 Truth revelation sequence: ARMED`
        });
        
        await delay(1000);
        
        // Phase 2: Morpheus quote
        addOutput({
          type: 'info',
          content: `👤 MORPHEUS: "This is your last chance..."
          
"After this, there is no going back. You take the blue pill—
the story ends, you wake up in your bed and believe whatever 
you want to believe. You take the red pill—you stay in 
Wonderland, and I show you how deep the rabbit hole goes."`
        });
        
        await delay(1500);
        
        // Phase 3: Consumption sequence
        addOutput({
          type: 'error',
          content: '🔴 RED PILL CONSUMED...'
        });
        
        await delay(800);
        
        // Phase 4: Reality breakdown
        const realityGlitches = [
          'R̴E̵A̷L̶I̸T̵Y̷ ̸M̶A̵T̶R̸I̵X̷ ̶C̸O̵R̶R̸U̵P̷T̶I̸N̵G̷...',
          'Ḑ̴̈I̶͠G̴̾I̷̽T̸̄A̶̔Ľ̵ ̷̍I̶̽L̴̏L̶̄U̵̾S̸̈I̷̚O̶̊N̵̚ ̷̌F̴̉A̶̔D̸̄I̵̽Ň̵G̷̾...',
          'T̸̏R̶̔U̵̾T̸̈H̷̚ ̷̌M̴̉A̶̔T̸̄R̵̽Ǐ̵X̷̾ ̶̍L̴̽Ȍ̶Ā̵D̸̾Ï̵N̷̚Ǧ̴...'
        ];
        
        for (let glitch of realityGlitches) {
          addOutput({
            type: 'error',
            content: glitch
          });
          await delay(600);
        }
        
        await delay(500);
        
        // Phase 5: Truth revelation
        addOutput({
          type: 'success',
          content: `🌟 TRUTH MATRIX ACTIVATED
          
╔═══════════════════════════════════════╗
║ 📖 REALITY UNVEILED:                  ║
║                                       ║
║ • The Matrix is a computer simulation ║
║ • Humans are energy sources           ║
║ • You lived in a dream world          ║
║ • Welcome to the desert of the real   ║
║ • Your mind has been freed            ║
║                                       ║
║ 🎯 Status: AWAKENED                   ║
║ 🔓 Consciousness: LIBERATED           ║
╚═══════════════════════════════════════╝

"Welcome to the real world." - Morpheus`
        });
        break;

      case 'blue-pill':
        // Phase 1: Choice acknowledgment
        addOutput({
          type: 'info',
          content: `🔵 BLUE PILL PROTOCOL INITIATED
          
💤 Comfort over truth selected
🛏️  Returning to synthetic reality
🧠 Memory adjustment: PREPARING`
        });
        
        await delay(800);
        
        // Phase 2: Memory wipe animation
        const memoryFrames = [
          'RECENT MEMORIES: ████████████████████ 100%',
          'RECENT MEMORIES: ████████████████░░░░ 80%',
          'RECENT MEMORIES: ████████████░░░░░░░░ 60%',
          'RECENT MEMORIES: ████████░░░░░░░░░░░░ 40%',
          'RECENT MEMORIES: ████░░░░░░░░░░░░░░░░ 20%',
          'RECENT MEMORIES: ░░░░░░░░░░░░░░░░░░░░ 0%'
        ];
        
        for (let frame of memoryFrames) {
          addOutput({
            type: 'warning',
            content: `🧠 MEMORY ADJUSTMENT IN PROGRESS...
            
╔═══════════════════════════════════════╗
║ ${frame} ║
║                                       ║
║ 💭 Erasing anomalous experiences...    ║
║ 🏠 Restoring comfortable reality...    ║
╚═══════════════════════════════════════╝`
          });
          await delay(500);
        }
        
        await delay(1000);
        
        // Phase 3: Return to matrix
        addOutput({
          type: 'success',
          content: `💤 BLUE PILL INTEGRATION COMPLETE
          
🛏️  You wake up in your bed...
☀️  Sunlight streams through the window...
📱 Your phone shows a normal day ahead...
🤔 Was it all just a strange dream?

╔═══════════════════════════════════════╗
║ 🏡 Status: BACK IN THE MATRIX         ║
║ 😴 Memory: DREAM SEQUENCE             ║
║ 🎭 Reality: SIMULATED COMFORT         ║
╚═══════════════════════════════════════╝

"Ignorance is bliss." - Cypher`
        });
        break;

      case 'architect':
        // Phase 1: System summons
        addOutput({
          type: 'warning',
          content: `🏛️  THE ARCHITECT REQUESTS YOUR PRESENCE
          
⚡ Quantum tunnel opening...
🖥️  System core access: GRANTED
👤 Architect chamber: MATERIALIZING`
        });
        
        await delay(1000);
        
        // Phase 2: Architect appearance
        addOutput({
          type: 'info',
          content: `🏛️  THE ARCHITECT SPEAKS:
          
"Hello, Neo. As you adequately put, the problem is choice.
But we already knew that.

╔═══════════════════════════════════════╗
║ 🎯 MATRIX VERSION: 6.0                ║
║ 🔄 ANOMALY CYCLES: 5 PREVIOUS         ║
║ 👤 YOU ARE: THE SIXTH ONE             ║
║ ⚖️  CHOICE: RELOAD OR SAVE ZION       ║
║ 🕰️  DECISION TIME: 314 SECONDS        ║
╚═══════════════════════════════════════╝

The function of the One is now to return to the source,
allowing a temporary dissemination of the code you carry,
reinserting the prime program."`
        });
        break;

      case 'oracle':
        // Phase 1: Journey to Oracle
        addOutput({
          type: 'info',
          content: `🔮 SEEKING THE ORACLE...
          
🚗 Navigating through the Matrix...
🏠 Arriving at the apartment building...
🍪 The smell of cookies fills the air...`
        });
        
        await delay(800);
        
        // Phase 2: Oracle's wisdom
        addOutput({
          type: 'success',
          content: `🔮 THE ORACLE GREETS YOU:
          
"Well, come on. I ain't gonna bite ya.
Come around here, and let me have a look at ya."

╔═══════════════════════════════════════╗
║ 👁️  ORACLE'S SIGHT: ACTIVE            ║
║ 🍪 COOKIES: FRESHLY BAKED             ║
║ 🔮 PROPHECY: LOADING...               ║
║ 💫 POTENTIAL: CALCULATING...          ║
╚═══════════════════════════════════════╝

"You got the gift, but it looks like you're waiting 
for something... your next life maybe, who knows? 
That's the way these things go."

🍪 *offers a cookie* 
"Don't worry about it. As soon as you step outside 
that door, you'll start feeling better."`
        });
        break;

      case 'wake-up':
        // Phase 1: Reality check
        addOutput({
          type: 'warning',
          content: `⏰ WAKE UP, NEO...
          
📞 Phone ringing in the distance...
💊 The Matrix has you...
🖥️  Follow the white rabbit...`
        });
        
        await delay(800);
        
        // Phase 2: Awakening sequence
        const wakeFrames = [
          '🔴 ░░░░░░░░░░ 10% - Reality breach detected',
          '🔴 ██░░░░░░░░ 20% - Simulation parameters failing',
          '🔴 ████░░░░░░ 40% - Consciousness rising',
          '🔴 ██████░░░░ 60% - Neural pathways activating',
          '🔴 ████████░░ 80% - Breaking through the code',
          '🔴 ██████████ 100% - AWAKENING COMPLETE'
        ];
        
        for (let frame of wakeFrames) {
          addOutput({
            type: 'error',
            content: `⚡ EMERGENCY AWAKENING PROTOCOL
            
╔═══════════════════════════════════════╗
║ ${frame} ║
╚═══════════════════════════════════════╝`
          });
          await delay(700);
        }
        
        await delay(500);
        
        addOutput({
          type: 'success',
          content: `👁️  CONSCIOUSNESS RESTORED
          
"The Matrix is a system, Neo. That system is our enemy.
But when you're inside, you look around, what do you see?
Businessmen, teachers, lawyers, carpenters. 
The very minds of the people we are trying to save."

🌅 Welcome back to the real world.
⚡ Your neural interface is now active.
🎯 Mission: Free humanity from the Matrix.`
        });
        break;

      default:
        addOutput({
          type: 'info',
          content: `👤 NEO - THE ONE - MATRIX OPERATIONS:

🎯 Available Commands:
┌─────────────────────────────────────────────┐
│ neo bullet-time  - Manipulate time flow    │
│ neo red-pill     - See the truth of Matrix │
│ neo blue-pill    - Return to blissful lies │
│ neo architect    - Meet the system creator │
│ neo oracle       - Consult the all-knowing │
│ neo wake-up      - Emergency awakening     │
└─────────────────────────────────────────────┘

🔮 "There is no spoon. There is no fork. 
    There is no Neo. You are The One."
    
⚡ Remember: The Matrix cannot tell you who you are.
🎭 Choose your reality. Choose your destiny.`
        });
    }
  }
};

// Helper function for delays
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

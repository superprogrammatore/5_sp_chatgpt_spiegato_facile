import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface Screen3EmbeddingsProps {
  userInput: string;
}

// Predefined colors for tokens
const tokenColors = [
  "bg-primary",
  "bg-secondary", 
  "bg-accent",
  "bg-highlight",
  "bg-tertiary",
];

// Word groups with similar meanings for demonstration
const wordGroups = [
  { 
    label: "Emozioni positive",
    words: ["felice", "contento", "gioioso", "allegro"], 
    color: "bg-highlight",
    textColor: "text-highlight-foreground"
  },
  { 
    label: "Dimensioni grandi",
    words: ["grande", "enorme", "gigante"], 
    color: "bg-primary",
    textColor: "text-primary-foreground"
  },
  { 
    label: "Animali",
    words: ["cane", "gatto", "cucciolo"], 
    color: "bg-secondary",
    textColor: "text-secondary-foreground"
  },
];

export const Screen3Embeddings = ({ userInput }: Screen3EmbeddingsProps) => {
  const [step, setStep] = useState(0);
  const tokens = userInput.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2000);
    const timer3 = setTimeout(() => setStep(3), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Generate well-distributed positions for dots in a grid-like pattern
  const getTokenPosition = (index: number, total: number) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Add some randomness but keep them well distributed
    const baseX = 15 + (col / cols) * 70;
    const baseY = 20 + (row / Math.ceil(total / cols)) * 60;
    
    return {
      x: baseX + (Math.random() - 0.5) * 10,
      y: baseY + (Math.random() - 0.5) * 10,
    };
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/20 mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-accent" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          I numeri diventano significati
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Numeri simili rappresentano significati simili!
        </p>
      </motion.div>

      {/* Visualization area */}
      <div className="w-full max-w-2xl">
        {/* Step 1: Numbers transforming to vectors */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              🎯 Ogni parola diventa un punto colorato nello "spazio dei significati":
            </p>
            
            {/* Vector space visualization - improved */}
            <div className="relative w-full h-72 md:h-80 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border-2 border-border overflow-hidden">
              {/* Axis labels */}
              <div className="absolute top-2 left-2 text-xs text-muted-foreground font-medium">
                Spazio dei significati
              </div>
              
              {/* Subtle grid */}
              <svg className="absolute inset-0 w-full h-full opacity-30">
                {/* Horizontal lines */}
                {[20, 40, 60, 80].map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-border"
                  />
                ))}
                {/* Vertical lines */}
                {[20, 40, 60, 80].map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={`${x}%`}
                    y1="0%"
                    x2={`${x}%`}
                    y2="100%"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="text-border"
                  />
                ))}
              </svg>

              {/* Animated dots for user tokens */}
              {step >= 2 && tokens.map((token, index) => {
                const pos = getTokenPosition(index, tokens.length);
                const colorClass = tokenColors[index % tokenColors.length];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5, type: "spring" }}
                    className="absolute"
                    style={{ 
                      left: `${pos.x}%`, 
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 ${colorClass} rounded-full blur-md opacity-50`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      {/* Main dot */}
                      <motion.div 
                        className={`relative min-w-14 h-10 md:min-w-16 md:h-12 px-3 rounded-full ${colorClass} shadow-lg flex items-center justify-center`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="text-xs md:text-sm font-bold text-primary-foreground">
                          {token}
                        </span>
                      </motion.div>
                      {/* Label on hover */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">
                        {token}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Legend */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: tokens.length * 0.2 + 0.5 }}
                  className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-lg p-2"
                >
                  <p className="text-xs text-muted-foreground">Le tue parole:</p>
                  <div className="flex flex-wrap gap-1 mt-1 max-w-[150px]">
                    {tokens.map((token, i) => (
                      <span 
                        key={i} 
                        className={`inline-block w-3 h-3 rounded-full ${tokenColors[i % tokenColors.length]}`}
                        title={token}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Similar words cluster - improved visualization */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <p className="text-sm text-muted-foreground mb-6">
              🧲 <strong>Ecco la magia:</strong> parole con significato simile stanno vicine!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wordGroups.map((group, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.2 }}
                  className="relative"
                >
                  {/* Cluster background */}
                  <div className={`absolute inset-0 ${group.color} opacity-10 rounded-2xl blur-xl`} />
                  
                  <div className={`relative p-4 rounded-2xl border-2 border-dashed ${group.color.replace('bg-', 'border-')}/40 bg-background`}>
                    {/* Cluster label */}
                    <p className="text-xs font-medium text-muted-foreground mb-3 text-center">
                      {group.label}
                    </p>
                    
                    {/* Words as dots with labels */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {group.words.map((word, wordIndex) => (
                        <motion.div
                          key={wordIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: groupIndex * 0.2 + wordIndex * 0.1 }}
                          className="flex items-center gap-1.5"
                        >
                          <span className={`w-3 h-3 rounded-full ${group.color} shadow-sm`} />
                          <span className="text-sm text-foreground">
                            {word}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Visual connection explanation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-highlight" />
                vicino a
                <span className="w-4 h-4 rounded-full bg-highlight" />
              </span>
              <span>=</span>
              <span className="font-medium text-foreground">significato simile!</span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Explanation */}
      {step >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-6 rounded-2xl bg-accent/10 border border-accent/30 max-w-lg"
        >
          <p className="text-foreground">
            💡 <strong>Cosa significa per ChatGPT?</strong>
            <br />
            <span className="text-muted-foreground">
              Quando "felice" e "contento" sono vicini nello spazio, 
              ChatGPT sa che possono essere usati in contesti simili!
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

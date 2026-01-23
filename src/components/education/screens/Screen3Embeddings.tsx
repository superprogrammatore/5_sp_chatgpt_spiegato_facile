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
        {/* Step 1: Show user words as list transforming to colored dots */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              🎯 Le tue parole diventano punti colorati:
            </p>
            
            {/* Words to dots transformation */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {tokens.map((token, index) => {
                const colorClass = tokenColors[index % tokenColors.length];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    {/* The word */}
                    <span className="text-foreground font-medium">{token}</span>
                    
                    {/* Arrow */}
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="text-muted-foreground"
                    >
                      →
                    </motion.span>
                    
                    {/* Colored dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                      className={`w-8 h-8 rounded-full ${colorClass} shadow-md flex items-center justify-center`}
                    >
                      <motion.div
                        className={`absolute w-8 h-8 rounded-full ${colorClass} opacity-40`}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Simple explanation */}
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
              >
                ✨ Ogni parola ha ora un <strong>colore unico</strong> che rappresenta il suo significato
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Step 2: Visual example of semantic proximity */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <p className="text-sm text-muted-foreground mb-6">
              🧲 <strong>Ecco la magia:</strong> parole con significato simile hanno colori simili e stanno vicine!
            </p>
            
            {/* Visual clusters with bubbles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wordGroups.map((group, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: groupIndex * 0.3, type: "spring" }}
                  className="relative"
                >
                  {/* Bubble background - visual cluster */}
                  <motion.div 
                    className={`absolute inset-0 ${group.color} opacity-15 rounded-3xl`}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: groupIndex * 0.5 }}
                  />
                  
                  <div className="relative p-5 rounded-3xl border-2 border-border bg-background/80 backdrop-blur-sm">
                    {/* Cluster emoji + label */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-xl">
                        {groupIndex === 0 ? "😊" : groupIndex === 1 ? "📏" : "🐾"}
                      </span>
                      <p className="text-sm font-semibold text-foreground">
                        {group.label}
                      </p>
                    </div>
                    
                    {/* Words as pills inside the bubble */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {group.words.map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: groupIndex * 0.3 + wordIndex * 0.1 }}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${group.color} ${group.textColor} shadow-sm`}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Simple visual explanation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 p-4 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">cane</span>
                  <span className="text-muted-foreground">e</span>
                  <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">gatto</span>
                </div>
                <span className="text-muted-foreground font-medium">→ stessa bolla = significato simile!</span>
              </div>
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

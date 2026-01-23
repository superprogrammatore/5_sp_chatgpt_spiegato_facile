import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface Screen3EmbeddingsProps {
  userInput: string;
}

// Word groups with similar meanings
const wordGroups = [
  { words: ["felice", "contento", "gioioso", "allegro"], color: "bg-highlight" },
  { words: ["triste", "malinconico", "depresso"], color: "bg-tertiary" },
  { words: ["grande", "enorme", "gigante", "immenso"], color: "bg-primary" },
  { words: ["piccolo", "minuscolo", "minuto"], color: "bg-accent" },
  { words: ["cane", "gatto", "animale", "cucciolo"], color: "bg-secondary" },
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

  // Generate random positions for dots
  const dotPositions = tokens.map(() => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  }));

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
        {/* Step 1: Numbers transforming */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              🎯 I numeri si trasformano in "vettori" - posizioni nello spazio:
            </p>
            
            {/* Vector space visualization */}
            <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-foreground/30"
                    style={{ top: `${(i + 1) * 20}%` }}
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-foreground/30"
                    style={{ left: `${(i + 1) * 20}%` }}
                  />
                ))}
              </div>

              {/* Animated dots for user tokens */}
              {step >= 2 && tokens.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: `${dotPositions[index].x}%`,
                    y: `${dotPositions[index].y}%`
                  }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="absolute"
                  style={{ left: 0, top: 0 }}
                >
                  <div className="relative group">
                    <div className="w-6 h-6 rounded-full bg-primary shadow-lg animate-pulse-soft" />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {token}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Similar words cluster */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <p className="text-sm text-muted-foreground mb-6">
              🧲 Parole con significato simile stanno vicine:
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              {wordGroups.slice(0, 3).map((group, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: groupIndex * 0.2 }}
                  className="p-4 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {group.words.map((word, wordIndex) => (
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: groupIndex * 0.2 + wordIndex * 0.1 }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${group.color} text-foreground`}
                      >
                        <span className={`w-2 h-2 rounded-full ${group.color}`} />
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
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
            💡 <strong>Cosa significa?</strong>
            <br />
            <span className="text-muted-foreground">
              ChatGPT capisce che "felice" e "contento" sono simili perché 
              i loro vettori sono vicini nello spazio!
            </span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

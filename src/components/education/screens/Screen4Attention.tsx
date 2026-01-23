import { motion } from "framer-motion";
import { Eye, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface Screen4AttentionProps {
  userInput: string;
}

export const Screen4Attention = ({ userInput }: Screen4AttentionProps) => {
  const tokens = userInput.split(/\s+/).filter(Boolean);
  const [focusedIndex, setFocusedIndex] = useState(tokens.length - 1);
  const [showConnections, setShowConnections] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Generate attention weights (random but deterministic-looking)
  const getAttentionWeight = (from: number, to: number) => {
    // More recent words get higher attention
    const recencyBonus = (to / tokens.length) * 0.5;
    const random = ((from * 7 + to * 13) % 100) / 100;
    return Math.min(0.2 + recencyBonus + random * 0.3, 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConnections(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setFocusedIndex(prev => (prev + 1) % tokens.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoPlay, tokens.length]);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-highlight/20 mb-6"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(250, 204, 21, 0.4)",
              "0 0 0 20px rgba(250, 204, 21, 0)",
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Eye className="w-10 h-10 text-highlight" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          L'attenzione
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          ChatGPT decide a quali parole prestare attenzione in ogni momento.
        </p>
      </motion.div>

      {/* Main visualization */}
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card mb-6"
        >
          <p className="text-sm text-muted-foreground mb-6">
            👁️ Clicca su una parola per vedere a cosa presta attenzione:
          </p>

          {/* Words with attention visualization */}
          <div className="relative p-8 bg-muted/30 rounded-xl">
            {/* Connection lines (SVG) */}
            {showConnections && (
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: 'visible' }}
              >
                {tokens.map((_, toIndex) => {
                  if (toIndex === focusedIndex) return null;
                  const weight = getAttentionWeight(focusedIndex, toIndex);
                  return (
                    <motion.line
                      key={toIndex}
                      x1={`${(focusedIndex / (tokens.length - 1)) * 80 + 10}%`}
                      y1="50%"
                      x2={`${(toIndex / (tokens.length - 1)) * 80 + 10}%`}
                      y2="50%"
                      stroke="hsl(var(--primary))"
                      strokeWidth={weight * 4}
                      strokeOpacity={weight}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: weight }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            )}

            {/* Word tokens */}
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              {tokens.map((token, index) => {
                const isFocused = index === focusedIndex;
                const weight = isFocused ? 1 : getAttentionWeight(focusedIndex, index);
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setFocusedIndex(index);
                      setAutoPlay(false);
                    }}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isFocused 
                        ? "bg-primary text-primary-foreground scale-110" 
                        : "bg-background border-2 border-border hover:border-primary"
                    }`}
                    style={{
                      opacity: 0.3 + weight * 0.7,
                      boxShadow: isFocused 
                        ? "0 0 20px rgba(var(--primary), 0.4)" 
                        : `0 0 ${weight * 15}px rgba(var(--primary), ${weight * 0.3})`
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {token}
                    {isFocused && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-4 h-4 bg-highlight rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Zap className="w-4 h-4 text-highlight-foreground" />
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Attention weights bar */}
          <div className="mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              Livello di attenzione per ogni parola:
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              {tokens.map((token, index) => {
                const weight = index === focusedIndex ? 1 : getAttentionWeight(focusedIndex, index);
                return (
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className="h-16 w-8 bg-muted rounded-full overflow-hidden flex items-end">
                      <motion.div
                        className="w-full bg-primary rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: `${weight * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-[60px]">
                      {token}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Auto-play toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setAutoPlay(!autoPlay)}
          className="edu-button-outline text-sm"
        >
          {autoPlay ? "⏸️ Pausa animazione" : "▶️ Riprendi animazione"}
        </motion.button>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 rounded-2xl bg-highlight/10 border border-highlight/30 max-w-lg"
      >
        <p className="text-foreground">
          💡 <strong>Perché è importante?</strong>
          <br />
          <span className="text-muted-foreground">
            L'attenzione permette a ChatGPT di capire il contesto. 
            Per esempio, in "La banca del fiume", sa che "banca" si riferisce al terreno, non ai soldi!
          </span>
        </p>
      </motion.div>
    </div>
  );
};

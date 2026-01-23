import { motion } from "framer-motion";
import { RefreshCw, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { ExplanationBox } from "../ExplanationBox";

interface Screen6LoopProps {
  userInput: string;
}

const responseWords = [
  "Il",
  "cervello",
  "umano",
  "è",
  "un",
  "organo",
  "incredibilmente",
  "complesso",
  "che",
  "controlla",
  "tutto",
  "il",
  "nostro",
  "corpo.",
];

export const Screen6Loop = ({ userInput }: Screen6LoopProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    if (currentWordIndex < responseWords.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      // Loop back after a pause
      const timer = setTimeout(() => {
        setCurrentWordIndex(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, isPlaying]);

  const visibleWords = responseWords.slice(0, currentWordIndex);

  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-accent/20 mb-3 md:mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <RefreshCw className="w-7 h-7 md:w-10 md:h-10 text-accent" />
        </motion.div>
        <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
          Ripeti il processo
        </h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-lg px-2">
          Ripetendo questo processo, parola dopo parola, nasce una risposta completa!
        </p>
      </motion.div>

      {/* Main visualization */}
      <div className="w-full max-w-2xl">
        {/* User question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card mb-4 md:mb-6"
        >
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">La tua domanda:</p>
          <p className="text-sm md:text-lg font-medium text-foreground break-words">"{userInput}"</p>
        </motion.div>

        {/* Response being built */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="edu-card"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <p className="text-xs md:text-sm text-muted-foreground">Risposta in costruzione:</p>
            <span className="text-xs font-mono text-primary">
              {currentWordIndex}/{responseWords.length} parole
            </span>
          </div>

          {/* Response text */}
          <div className="min-h-[80px] md:min-h-[100px] p-3 md:p-4 bg-muted/30 rounded-lg md:rounded-xl text-left">
            {visibleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10, scale: 1.2 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`inline-block mr-1 text-sm md:text-lg ${
                  index === visibleWords.length - 1 
                    ? "text-primary font-bold" 
                    : "text-foreground"
                }`}
              >
                {word}
              </motion.span>
            ))}
            
            {/* Cursor */}
            {currentWordIndex < responseWords.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 md:h-6 bg-primary ml-1 align-middle"
              />
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-3 md:mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              animate={{ width: `${(currentWordIndex / responseWords.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step indicator */}
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 p-2 md:p-3 bg-primary/10 rounded-lg md:rounded-xl">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
              </motion.div>
              <span className="text-xs md:text-sm font-medium">
                Parola {currentWordIndex + 1}
              </span>
            </div>
            
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xl md:text-2xl"
            >
              →
            </motion.div>
            
            <div className="p-2 md:p-3 bg-muted/50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-muted-foreground">
                Ripeti...
              </span>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 md:mt-6 flex gap-2 md:gap-3 justify-center"
        >
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="edu-button-outline text-sm md:text-base px-3 md:px-6 py-2 md:py-3"
          >
            {isPlaying ? "⏸️ Pausa" : "▶️ Riprendi"}
          </button>
          <button
            onClick={() => setCurrentWordIndex(0)}
            className="edu-button-outline text-sm md:text-base px-3 md:px-6 py-2 md:py-3"
          >
            🔄 Ricomincia
          </button>
        </motion.div>
      </div>

      {/* Explanation Box */}
      <ExplanationBox title="Il loop autoregressivo" delay={0.8}>
        <p className="text-muted-foreground">
          <strong className="text-foreground">ChatGPT genera una parola alla volta.</strong>{" "}
          Dopo aver scelto una parola, la aggiunge alla frase e ricomincia da capo!
        </p>
        <p className="text-muted-foreground">
          Questo processo si chiama <strong className="text-foreground">"generazione autoregressiva"</strong>: 
          ogni nuova parola dipende da tutte quelle precedenti. 
          È come scrivere una storia un passo alla volta.
        </p>
        <p className="text-muted-foreground">
          Il ciclo continua finché ChatGPT non produce un segnale di "fine risposta" 
          o raggiunge un limite di parole.
        </p>
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Curiosità:</strong> ChatGPT può generare circa 100 parole al secondo! 
            Ogni singola parola richiede miliardi di calcoli.
          </p>
        </div>
      </ExplanationBox>
    </div>
  );
};

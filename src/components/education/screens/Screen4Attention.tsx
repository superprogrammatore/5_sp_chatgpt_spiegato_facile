import { motion, AnimatePresence } from "framer-motion";
import { Eye, Lightbulb, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { ExplanationBox } from "../ExplanationBox";

interface Screen4AttentionProps {
  userInput: string;
}

// Example scenarios to explain attention
const attentionExamples = [
  {
    sentence: "La banca del fiume era piena di fiori",
    focusWord: "banca",
    highlightedWords: ["fiume", "fiori"],
    explanation: "ChatGPT guarda 'fiume' e 'fiori' per capire che 'banca' significa il bordo del fiume, non la banca dei soldi!",
  },
  {
    sentence: "Ho visto un cane che correva nel parco",
    focusWord: "correva",
    highlightedWords: ["cane", "parco"],
    explanation: "Per capire 'correva', ChatGPT guarda 'cane' (chi corre) e 'parco' (dove corre).",
  },
];

export const Screen4Attention = ({ userInput }: Screen4AttentionProps) => {
  const tokens = userInput.split(/\s+/).filter(Boolean);
  const [step, setStep] = useState(0);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 2500);
    const timer3 = setTimeout(() => setStep(3), 4500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Generate pseudo-random attention for user's words
  const getAttentionLevel = (fromIndex: number, toIndex: number): "high" | "medium" | "low" => {
    if (fromIndex === toIndex) return "high";
    const diff = Math.abs(fromIndex - toIndex);
    if (diff <= 1) return "high";
    if (diff <= 2) return "medium";
    return "low";
  };

  const currentExample = attentionExamples[exampleIndex];
  const exampleTokens = currentExample.sentence.split(/\s+/);

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
              "0 0 0 0 hsl(var(--highlight) / 0.4)",
              "0 0 0 20px hsl(var(--highlight) / 0)",
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
          ChatGPT "guarda" le parole precedenti per capire il significato.
        </p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Step 1: Simple metaphor */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-highlight/20">
                <Lightbulb className="w-5 h-5 text-highlight" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground mb-1">Immagina di leggere un libro...</p>
                <p className="text-sm text-muted-foreground">
                  Quando leggi una parola, il tuo cervello automaticamente "guarda indietro" 
                  alle parole precedenti per capire il significato. ChatGPT fa la stessa cosa!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Interactive example with user's words */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <p className="text-sm text-muted-foreground mb-4">
              👆 <strong>Clicca su una parola</strong> per vedere quali altre parole ChatGPT guarda:
            </p>

            {/* User's sentence with clickable words */}
            <div className="p-6 bg-muted/30 rounded-xl mb-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {tokens.map((token, index) => {
                  const isSelected = selectedWordIndex === index;
                  const attentionLevel = selectedWordIndex !== null 
                    ? getAttentionLevel(selectedWordIndex, index)
                    : null;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedWordIndex(index)}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isSelected 
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/30" 
                          : "bg-background border-2 border-border hover:border-primary"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={
                        attentionLevel && !isSelected
                          ? {
                              backgroundColor: 
                                attentionLevel === "high" 
                                  ? "hsl(var(--highlight))"
                                  : attentionLevel === "medium"
                                  ? "hsl(var(--highlight) / 0.5)"
                                  : "hsl(var(--muted))",
                              scale: attentionLevel === "high" ? 1.1 : attentionLevel === "medium" ? 1.05 : 1,
                            }
                          : {}
                      }
                    >
                      {token}
                      {isSelected && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Eye className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Attention explanation */}
              <AnimatePresence>
                {selectedWordIndex !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-4 border-t border-border"
                  >
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <span className="text-sm text-muted-foreground">Livello di attenzione:</span>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-highlight" />
                        <span className="text-xs text-foreground">Alta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-highlight/50" />
                        <span className="text-xs text-foreground">Media</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-muted" />
                        <span className="text-xs text-foreground">Bassa</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Per capire "<strong>{tokens[selectedWordIndex]}</strong>", ChatGPT guarda di più le parole vicine!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!selectedWordIndex && (
              <p className="text-xs text-muted-foreground italic">
                💡 Suggerimento: clicca sull'ultima parola per vedere l'effetto completo
              </p>
            )}
          </motion.div>
        )}

        {/* Step 3: Concrete example */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="edu-card"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/20">
                <HelpCircle className="w-5 h-5 text-accent" />
              </div>
              <p className="text-left text-sm text-foreground">
                <strong>Un esempio concreto:</strong>
              </p>
            </div>

            {/* Example sentence with highlights */}
            <div className="p-5 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl mb-4">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {exampleTokens.map((token, index) => {
                  const isFocus = token.toLowerCase() === currentExample.focusWord.toLowerCase();
                  const isHighlighted = currentExample.highlightedWords.some(
                    w => token.toLowerCase().includes(w.toLowerCase())
                  );
                  
                  return (
                    <motion.span
                      key={index}
                      className={`px-3 py-1.5 rounded-lg font-medium ${
                        isFocus 
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                          : isHighlighted
                          ? "bg-highlight text-highlight-foreground"
                          : "bg-background text-foreground border border-border"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isHighlighted ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        scale: { delay: 1 + index * 0.1, duration: 0.5 }
                      }}
                    >
                      {token}
                    </motion.span>
                  );
                })}
              </div>

              {/* Animated arrows showing attention */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center justify-center gap-2 text-sm"
              >
                <span className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium">
                  {currentExample.focusWord}
                </span>
                <span className="text-muted-foreground">👀 guarda →</span>
                {currentExample.highlightedWords.map((word, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-highlight text-highlight-foreground text-xs font-medium">
                    {word}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Explanation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3"
            >
              ✨ {currentExample.explanation}
            </motion.p>

            {/* Example toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              onClick={() => setExampleIndex((prev) => (prev + 1) % attentionExamples.length)}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Vedi un altro esempio →
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Explanation Box */}
      {step >= 3 && (
        <ExplanationBox title="Come funziona l'attenzione?" delay={3}>
          <p className="text-muted-foreground">
            <strong className="text-foreground">L'attenzione è il "superpotere" di ChatGPT.</strong>{" "}
            Invece di leggere le parole una alla volta, le guarda tutte insieme.
          </p>
          <p className="text-muted-foreground">
            Per ogni parola, ChatGPT decide: "Quali altre parole sono importanti per capire questa?". 
            Poi dà più <strong className="text-foreground">"peso"</strong> alle parole rilevanti.
          </p>
          <p className="text-muted-foreground">
            È così che ChatGPT può disambiguare parole come "banca" 
            (soldi? o fiume?) guardando il contesto!
          </p>
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Curiosità:</strong> ChatGPT ha 96 "teste di attenzione" 
              che guardano la frase in modi diversi contemporaneamente!
            </p>
          </div>
        </ExplanationBox>
      )}
    </div>
  );
};

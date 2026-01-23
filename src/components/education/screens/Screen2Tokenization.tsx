import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { useState, useEffect } from "react";
import { ExplanationBox } from "../ExplanationBox";

interface Screen2TokenizationProps {
  userInput: string;
}

export const Screen2Tokenization = ({ userInput }: Screen2TokenizationProps) => {
  const [showTokens, setShowTokens] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  // Simple tokenization (split by words)
  const tokens = userInput.split(/\s+/).filter(Boolean);
  
  // Generate fake token IDs
  const tokenIds = tokens.map((_, i) => Math.floor(Math.random() * 50000) + 1000);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTokens(true), 800);
    const timer2 = setTimeout(() => setShowNumbers(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
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
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/20 mb-6"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Scissors className="w-10 h-10 text-secondary" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Il testo diventa numeri
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Il computer non capisce le parole come noi. Le trasforma in numeri!
        </p>
      </motion.div>

      {/* Original text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="edu-card w-full max-w-2xl mb-8"
      >
        <p className="text-sm text-muted-foreground mb-3">La tua frase:</p>
        <p className="text-xl font-medium text-foreground">"{userInput}"</p>
      </motion.div>

      {/* Tokenization animation */}
      <div className="w-full max-w-2xl">
        {/* Step 1: Show tokens */}
        {showTokens && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              📦 Prima, la frase viene divisa in pezzi (chiamati "token"):
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {tokens.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="token-box text-lg"
                >
                  {token}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Transform to numbers */}
        {showNumbers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-2xl"
              >
                ⬇️
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              🔢 Poi, ogni pezzo diventa un numero:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {tokens.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs text-muted-foreground">{token}</span>
                  <div className="number-box text-lg">
                    {tokenIds[index]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Explanation Box */}
      {showNumbers && (
        <ExplanationBox title="Cos'è la tokenizzazione?" delay={0.5}>
          <p className="text-muted-foreground">
            <strong className="text-foreground">I computer non capiscono le parole</strong> come noi. 
            Possono lavorare solo con numeri!
          </p>
          <p className="text-muted-foreground">
            La <strong className="text-foreground">tokenizzazione</strong> è il primo passo: 
            la frase viene divisa in pezzi più piccoli chiamati "token". 
            Ogni token riceve un numero unico, come un codice identificativo.
          </p>
          <p className="text-muted-foreground">
            È come tradurre da italiano a... "numerese"! 📊
          </p>
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Curiosità:</strong> ChatGPT usa circa 100.000 token diversi. 
              Parole comuni hanno un solo token, parole rare ne hanno più di uno!
            </p>
          </div>
        </ExplanationBox>
      )}
    </div>
  );
};

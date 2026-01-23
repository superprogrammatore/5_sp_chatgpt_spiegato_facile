import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";

interface Screen1InputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  onSubmit: () => void;
}

export const Screen1Input = ({ userInput, setUserInput, onSubmit }: Screen1InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userInput.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageSquare className="w-10 h-10 text-primary" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Scrivi una frase
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Scrivi qualcosa come faresti normalmente con ChatGPT. 
          Ti mostreremo cosa succede dietro le quinte!
        </p>
      </motion.div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
            animate={{ opacity: isFocused ? 0.8 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          <div className="relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="Es: Come funziona il cervello umano?"
              className="edu-input min-h-[120px] resize-none text-xl"
              rows={3}
            />
          </div>
        </div>

        {userInput.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSubmit}
              className="edu-button-primary text-lg px-8 py-4"
            >
              <Sparkles className="w-5 h-5" />
              Scopri cosa succede
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Animated hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        💡 Le tue parole entreranno in una "scatola magica"...
      </motion.p>
    </div>
  );
};

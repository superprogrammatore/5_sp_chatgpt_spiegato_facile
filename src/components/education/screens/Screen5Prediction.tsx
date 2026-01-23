import { motion, AnimatePresence } from "framer-motion";
import { Target, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface Screen5PredictionProps {
  userInput: string;
}

const examplePredictions = [
  { word: "mondo", probability: 32 },
  { word: "cielo", probability: 25 },
  { word: "mare", probability: 18 },
  { word: "sole", probability: 12 },
  { word: "tempo", probability: 8 },
  { word: "altro", probability: 5 },
];

export const Screen5Prediction = ({ userInput }: Screen5PredictionProps) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);

  useEffect(() => {
    if (!playMode) {
      const timer = setTimeout(() => {
        setSelectedWord(examplePredictions[0].word);
        setShowResult(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [playMode]);

  const handleWordClick = (word: string) => {
    if (playMode && !userGuess) {
      setUserGuess(word);
      setTimeout(() => {
        setSelectedWord(examplePredictions[0].word);
        setShowResult(true);
      }, 500);
    }
  };

  const resetGame = () => {
    setSelectedWord(null);
    setShowResult(false);
    setUserGuess(null);
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
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary/20 mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Target className="w-10 h-10 text-secondary" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Scegliere la prossima parola
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          ChatGPT non "risponde". Sceglie la parola più probabile!
        </p>
      </motion.div>

      {/* Mode toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex gap-3"
      >
        <button
          onClick={() => { setPlayMode(false); resetGame(); }}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            !playMode 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          👀 Osserva
        </button>
        <button
          onClick={() => { setPlayMode(true); resetGame(); }}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            playMode 
              ? "bg-primary text-primary-foreground" 
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          🎮 Gioca
        </button>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card"
        >
          {/* Context phrase */}
          <div className="mb-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Contesto:</p>
            <p className="text-lg font-medium">
              "Il sole splende alto nel..."
              {showResult && selectedWord && (
                <motion.span
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-1 text-primary font-bold"
                >
                  {selectedWord}
                </motion.span>
              )}
            </p>
          </div>

          {/* Prediction list */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-4">
              {playMode 
                ? "🎯 Scegli quale parola credi che ChatGPT selezionerebbe:" 
                : "📊 Parole possibili con le loro probabilità:"}
            </p>
            
            <div className="space-y-3">
              {examplePredictions.map((prediction, index) => {
                const isSelected = selectedWord === prediction.word;
                const isUserGuess = userGuess === prediction.word;
                
                return (
                  <motion.div
                    key={prediction.word}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleWordClick(prediction.word)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      playMode && !showResult
                        ? "cursor-pointer hover:scale-[1.02] hover:shadow-md"
                        : ""
                    } ${
                      isSelected 
                        ? "ring-2 ring-primary bg-primary/10" 
                        : isUserGuess 
                          ? "ring-2 ring-secondary bg-secondary/10"
                          : "bg-muted/30"
                    }`}
                  >
                    {/* Progress bar background */}
                    <motion.div
                      className={`absolute inset-y-0 left-0 ${
                        isSelected ? "bg-primary/20" : "bg-muted"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.probability}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    />
                    
                    {/* Content */}
                    <div className="relative flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        {isSelected && showResult && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </motion.div>
                        )}
                        <span className={`font-medium text-lg ${
                          isSelected ? "text-primary" : ""
                        }`}>
                          {prediction.word}
                        </span>
                      </div>
                      <span className="font-mono text-muted-foreground">
                        {prediction.probability}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Result message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl ${
                  playMode && userGuess === selectedWord
                    ? "bg-accent/20 border border-accent"
                    : "bg-primary/10 border border-primary/30"
                }`}
              >
                {playMode ? (
                  userGuess === selectedWord ? (
                    <p className="text-accent font-medium">
                      🎉 Esatto! Hai indovinato come ChatGPT!
                    </p>
                  ) : (
                    <p className="text-foreground">
                      ChatGPT ha scelto "<strong>{selectedWord}</strong>" (la più probabile).
                      Tu avevi scelto "{userGuess}".
                    </p>
                  )
                ) : (
                  <p className="text-foreground">
                    ✨ ChatGPT ha scelto "<strong>{selectedWord}</strong>" perché ha la probabilità più alta!
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 rounded-2xl bg-secondary/10 border border-secondary/30 max-w-lg"
      >
        <p className="text-foreground">
          💡 <strong>È come un gioco di probabilità!</strong>
          <br />
          <span className="text-muted-foreground">
            ChatGPT non "pensa" - calcola quale parola è più probabile 
            in base a tutto ciò che ha letto durante l'allenamento.
          </span>
        </p>
      </motion.div>
    </div>
  );
};

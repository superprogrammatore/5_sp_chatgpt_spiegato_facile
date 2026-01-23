import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { ExplanationBox } from "../ExplanationBox";

export const Screen7Training = () => {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowStats(true), 1000);
    
    // Animate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { icon: BookOpen, label: "Libri letti", value: "~300 miliardi", color: "text-primary" },
    { icon: Brain, label: "Parametri", value: "~175 miliardi", color: "text-secondary" },
    { icon: TrendingUp, label: "Ore di training", value: "~1 milione", color: "text-accent" },
  ];

  const sources = [
    "📚 Libri di ogni genere",
    "🌐 Pagine web",
    "📰 Articoli di giornale",
    "💬 Conversazioni",
    "📖 Wikipedia",
    "💻 Codice sorgente",
  ];

  return (
    <div className="flex flex-col items-center text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-tertiary/20 mb-6"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(167, 139, 250, 0.4)",
              "0 0 0 20px rgba(167, 139, 250, 0)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="w-10 h-10 text-tertiary" />
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
          Perché sembra intelligente?
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          ChatGPT è stato allenato leggendo enormi quantità di testo.
        </p>
      </motion.div>

      {/* Main content */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Training visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card"
        >
          <p className="text-sm text-muted-foreground mb-4">
            📈 Processo di allenamento:
          </p>

          {/* Library animation */}
          <div className="relative h-40 bg-gradient-to-r from-primary/5 via-secondary/5 to-tertiary/5 rounded-xl overflow-hidden mb-4">
            {/* Floating books */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                initial={{ 
                  x: Math.random() * 100 + "%",
                  y: "110%",
                  opacity: 0 
                }}
                animate={{ 
                  y: "-10%",
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                📖
              </motion.div>
            ))}

            {/* Brain receiving knowledge */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-20 h-20 rounded-full bg-tertiary/20 flex items-center justify-center">
                <Brain className="w-10 h-10 text-tertiary" />
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Allenamento</span>
              <span className="text-primary font-medium">{trainingProgress}%</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary"
                style={{ width: `${trainingProgress}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 }}
                className="edu-card text-center"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="edu-card"
        >
          <p className="text-sm text-muted-foreground mb-4">
            📚 Da dove ha imparato:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {sources.map((source, index) => (
              <motion.span
                key={source}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="px-4 py-2 bg-muted rounded-xl text-sm"
              >
                {source}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Explanation Box */}
      <ExplanationBox title="Come è stato allenato?" delay={1}>
        <p className="text-muted-foreground">
          <strong className="text-foreground">L'allenamento di ChatGPT è avvenuto in due fasi.</strong>
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">1. Pre-training:</strong> ChatGPT ha letto miliardi di pagine web, 
          libri e articoli. Ha imparato i "pattern" del linguaggio: come le parole si combinano, 
          la grammatica, i fatti del mondo.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">2. Fine-tuning:</strong> Poi è stato "affinato" con l'aiuto di persone 
          che gli hanno insegnato a rispondere in modo utile, sicuro e conversazionale.
        </p>
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Importante:</strong> ChatGPT non "capisce" davvero. 
            È bravissimo a riconoscere pattern e prevedere cosa viene dopo, 
            ma non ha coscienza o comprensione come un umano!
          </p>
        </div>
      </ExplanationBox>

      {/* Celebration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="mt-8 text-center"
      >
        <span className="text-4xl">🎉</span>
        <p className="mt-2 text-xl font-display font-bold text-foreground">
          Complimenti! Ora sai come funziona ChatGPT!
        </p>
      </motion.div>
    </div>
  );
};

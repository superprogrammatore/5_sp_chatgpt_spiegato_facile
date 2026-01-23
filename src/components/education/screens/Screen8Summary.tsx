import { motion } from "framer-motion";
import { Workflow, MessageSquare, Scissors, Sparkles, Eye, Target, RefreshCw, Brain, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Screen8SummaryProps {
  userInput: string;
}

const steps = [
  {
    icon: MessageSquare,
    title: "1. Input",
    description: "Scrivi una frase",
    color: "bg-primary",
  },
  {
    icon: Scissors,
    title: "2. Tokenizzazione",
    description: "Parole → Numeri",
    color: "bg-secondary",
  },
  {
    icon: Sparkles,
    title: "3. Embeddings",
    description: "Numeri → Significati",
    color: "bg-accent",
  },
  {
    icon: Eye,
    title: "4. Attenzione",
    description: "Capire il contesto",
    color: "bg-highlight",
  },
  {
    icon: Target,
    title: "5. Predizione",
    description: "Scegliere la parola",
    color: "bg-tertiary",
  },
  {
    icon: RefreshCw,
    title: "6. Loop",
    description: "Ripetere il processo",
    color: "bg-accent",
  },
  {
    icon: Brain,
    title: "7. Training",
    description: "Miliardi di testi letti",
    color: "bg-primary",
  },
];

export const Screen8Summary = ({ userInput }: Screen8SummaryProps) => {
  const [activeStep, setActiveStep] = useState(-1);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const stepDuration = 800;
    const timers: NodeJS.Timeout[] = [];

    steps.forEach((_, index) => {
      timers.push(
        setTimeout(() => {
          setActiveStep(index);
        }, 1000 + index * stepDuration)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowFinalMessage(true);
        setIsAnimating(false);
      }, 1000 + steps.length * stepDuration + 500)
    );

    return () => timers.forEach(clearTimeout);
  }, [isAnimating]);

  const restartAnimation = () => {
    setActiveStep(-1);
    setShowFinalMessage(false);
    setIsAnimating(true);
  };

  return (
    <div className="flex flex-col items-center text-center w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-8"
      >
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-primary/20 mb-3 md:mb-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Workflow className="w-7 h-7 md:w-10 md:h-10 text-primary" />
        </motion.div>
        <h1 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-2 md:mb-4">
          Il processo completo
        </h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-lg px-2">
          Ecco come tutti i passaggi si collegano insieme!
        </p>
      </motion.div>

      {/* Process flow visualization */}
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="edu-card"
        >
          {/* User input reminder */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border border-border">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">La tua frase:</p>
            <p className="text-sm md:text-lg font-medium text-foreground break-words">"{userInput}"</p>
          </div>

          {/* Steps flow */}
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-2 md:space-y-4">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.4,
                      x: 0,
                      scale: isCurrent ? 1.02 : 1
                    }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`relative flex items-center gap-2 md:gap-4 p-2 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-muted/50 border border-border" 
                        : "bg-transparent"
                    } ${isCurrent ? "ring-2 ring-primary/50" : ""}`}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`relative z-10 w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive ? step.color : "bg-muted"
                      }`}
                      animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
                    >
                      <Icon className={`w-4 h-4 md:w-6 md:h-6 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 text-left min-w-0">
                      <p className={`font-semibold text-sm md:text-base ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </p>
                      <p className={`text-xs md:text-sm ${isActive ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                        {step.description}
                      </p>
                    </div>

                    {/* Checkmark for completed */}
                    {isActive && index < activeStep && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" />
                      </motion.div>
                    )}

                    {/* Arrow for current */}
                    {isCurrent && (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Final result animation */}
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 md:mt-8 p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
            >
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-xl md:text-2xl"
                >
                  ⚙️
                </motion.span>
                <p className="text-base md:text-lg font-semibold text-foreground">
                  Processo completato!
                </p>
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-xl md:text-2xl"
                >
                  ⚙️
                </motion.span>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Questi 7 passaggi avvengono <strong className="text-foreground">centinaia di volte al secondo</strong>, 
                per ogni singola parola della risposta. È così che ChatGPT "costruisce" le sue risposte!
              </p>
            </motion.div>
          )}

          {/* Restart button */}
          {showFinalMessage && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={restartAnimation}
              className="mt-6 edu-button-outline"
            >
              🔄 Rivedi l'animazione
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Summary card */}
      {showFinalMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-8 w-full max-w-2xl px-1"
        >
          <div className="edu-card">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">🎓</span> Riassunto finale
            </h3>
            
            <div className="space-y-2 md:space-y-3 text-left">
              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-primary">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  1. Input e Tokenizzazione
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Tu scrivi una frase. Il modello la spezza in pezzi chiamati <strong className="text-primary">token</strong> — possono essere parole intere o parti di parole. Ogni token viene convertito in un numero.
                </p>
              </div>
              
              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-accent">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  2. Embeddings (Vettori di significato)
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Ogni numero diventa una lista di valori chiamata <strong className="text-accent">vettore</strong>. Cattura il "significato" della parola: parole simili avranno vettori simili.
                </p>
              </div>
              
              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-highlight">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  3. Meccanismo di Attenzione
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Il modello decide quali parole sono più <strong className="text-highlight">importanti</strong> per capire il contesto, collegando parole correlate tra loro.
                </p>
              </div>
              
              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-tertiary">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  4. Predizione della parola successiva
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  ChatGPT calcola le probabilità e sceglie la parola più <strong className="text-tertiary">probabile</strong>. Come completare: "Il sole tramonta sul..." → "mare".
                </p>
              </div>
              
              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-secondary">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  5. Loop autoregressivo
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  La parola scelta viene aggiunta e il processo <strong className="text-secondary">ricomincia</strong>. Genera una parola alla volta costruendo la risposta completa!
                </p>
              </div>

              <div className="p-3 md:p-4 bg-muted/50 rounded-lg md:rounded-xl border-l-4 border-primary">
                <p className="font-semibold text-foreground mb-1 text-sm md:text-base">
                  6. Il segreto: l'allenamento
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Tutto funziona perché ChatGPT è stato <strong className="text-primary">allenato</strong> leggendo miliardi di testi, imparando pattern del linguaggio e fatti sul mondo.
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-primary/10 rounded-lg md:rounded-xl border border-primary/30">
              <p className="text-foreground text-center text-sm md:text-base">
                🧠 <strong>Tutto questo è reso possibile dall'allenamento</strong> su miliardi di testi!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Final celebration */}
      {showFinalMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="mt-6 md:mt-8 text-center pb-4"
        >
          <span className="text-4xl md:text-5xl">🎉</span>
          <p className="mt-2 md:mt-3 text-xl md:text-2xl font-display font-bold text-foreground">
            Ora sai come funziona ChatGPT!
          </p>
          <p className="mt-1 md:mt-2 text-sm md:text-base text-muted-foreground">
            Hai completato il tutorial interattivo.
          </p>
        </motion.div>
      )}
    </div>
  );
};

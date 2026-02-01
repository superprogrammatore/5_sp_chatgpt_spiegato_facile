import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";
import { validateAccessCode, setAuthenticated } from "@/lib/auth";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const isValid = await validateAccessCode(code);
      
      if (isValid) {
        setAuthenticated(true);
        onLoginSuccess();
      } else {
        setError("Codice di accesso non valido");
        setCode("");
      }
    } catch {
      setError("Errore durante la verifica");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 mb-4 md:mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lock className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </motion.div>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-3">
            Accesso Riservato
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Inserisci il codice di accesso per continuare
          </p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="edu-card p-4 md:p-6"
        >
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Inserisci il codice..."
                className="edu-input pr-12 text-sm md:text-base"
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCode ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!code.trim() || isLoading}
              className="edu-button-primary w-full text-sm md:text-base py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  Accedi
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 text-xs md:text-sm text-muted-foreground"
        >
          🔒 L'accesso è protetto da crittografia
        </motion.p>
      </motion.div>
    </div>
  );
};

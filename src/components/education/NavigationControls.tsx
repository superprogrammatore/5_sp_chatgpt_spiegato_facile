import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface NavigationControlsProps {
  currentScreen: number;
  totalScreens: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  canGoNext?: boolean;
}

export const NavigationControls = ({
  currentScreen,
  totalScreens,
  onNext,
  onPrev,
  onReset,
  canGoNext = true,
}: NavigationControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalScreens }).map((_, i) => (
            <motion.div
              key={i}
              className={`progress-dot ${
                i === currentScreen ? "progress-dot-active" : "progress-dot-inactive"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          {currentScreen > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrev}
              className="edu-button-outline flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Indietro</span>
            </motion.button>
          )}

          {currentScreen === totalScreens - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="edu-button-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Ricomincia</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              disabled={!canGoNext}
              className={`edu-button-primary flex items-center gap-2 ${
                !canGoNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>Avanti</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

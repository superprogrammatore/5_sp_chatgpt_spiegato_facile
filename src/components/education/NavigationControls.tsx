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
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-bottom"
    >
      <div className="max-w-3xl mx-auto px-3 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap max-w-[45%]">
          {Array.from({ length: totalScreens }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                i === currentScreen ? "bg-primary scale-110 md:scale-125 shadow-[0_0_10px_hsl(var(--primary)/0.4)]" : "bg-muted"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {currentScreen > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrev}
              className="edu-button-outline flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 text-sm md:text-base"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Indietro</span>
            </motion.button>
          )}

          {currentScreen === totalScreens - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className="edu-button-secondary flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 text-sm md:text-base"
            >
              <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Ricomincia</span>
              <span className="sm:hidden">🔄</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              disabled={!canGoNext}
              className={`edu-button-primary flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 text-sm md:text-base ${
                !canGoNext ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>Avanti</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

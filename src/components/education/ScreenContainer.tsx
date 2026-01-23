import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ScreenContainerProps {
  children: ReactNode;
  screenIndex: number;
}

export const ScreenContainer = ({ children, screenIndex }: ScreenContainerProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="screen-container"
      >
        <div className="content-wrapper">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

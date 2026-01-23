import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface ExplanationBoxProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export const ExplanationBox = ({ title, children, delay = 0 }: ExplanationBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mt-6 md:mt-8 w-full max-w-2xl px-1"
    >
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-border bg-gradient-to-br from-muted/50 to-background">
        {/* Header */}
        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 border-b border-border bg-muted/30">
          <div className="p-1.5 md:p-2 rounded-lg bg-primary/10">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-sm md:text-base">{title}</h3>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-5 space-y-2 md:space-y-3 text-left text-sm md:text-base">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

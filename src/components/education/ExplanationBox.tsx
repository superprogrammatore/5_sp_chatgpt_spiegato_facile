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
      className="mt-8 w-full max-w-2xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted/50 to-background">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-3 text-left">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

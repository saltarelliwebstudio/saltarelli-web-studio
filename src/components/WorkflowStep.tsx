import React from "react";
import { motion } from "framer-motion";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="relative flex gap-4 md:gap-6 group">
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow transition-shadow duration-300"
        >
          {number}
        </motion.div>
        {number < 4 && (
          <div className="w-0.5 h-full bg-border mt-3 group-hover:bg-primary/50 transition-colors duration-500" />
        )}
      </div>
      <div className="flex-1 pb-10 md:pb-12">
        <h3 className="font-heading font-semibold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

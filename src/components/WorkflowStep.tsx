import React from "react";

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
    <div className="relative flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:scale-110 transition-transform">
          {number}
        </div>
        {number < 4 && (
          <div className="w-0.5 h-full bg-border mt-2" />
        )}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
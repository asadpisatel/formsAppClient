import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto p-4", className)}>
      {children}
    </div>
  );
};

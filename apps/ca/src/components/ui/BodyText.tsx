import { BaseProps } from "@/types";
import { cn } from "@/lib/utils";

export function BodyText({ children, className }: BaseProps) {
  return (
    <p className={cn("font-serif text-sm md:text-base text-muted leading-relaxed", className)}>
      {children}
    </p>
  );
}

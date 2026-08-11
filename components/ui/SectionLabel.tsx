import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.15em] text-accent",
        className
      )}
    >
      {children}
    </p>
  );
}

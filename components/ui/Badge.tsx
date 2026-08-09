import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "sold" | "rented";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full",
        {
          "bg-card text-muted": variant === "default",
          "bg-accent/10 text-accent": variant === "accent",
          "bg-red-50 text-red-600": variant === "sold",
          "bg-blue-50 text-blue-600": variant === "rented",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

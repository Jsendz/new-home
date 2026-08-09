import FadeInUp from "./FadeInUp";
import SectionLabel from "./SectionLabel";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-card border-b border-border pt-28 pb-14">
      <div className="container-site">
        <FadeInUp>
          <SectionLabel className="mb-3">{label}</SectionLabel>
          <h1 className="font-display text-display-md text-foreground max-w-xl text-balance tracking-wider">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted mt-3 max-w-lg leading-relaxed">{subtitle}</p>
          )}
        </FadeInUp>
      </div>
    </div>
  );
}

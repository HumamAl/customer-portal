import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  relevance,
  outcome,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 rounded-xl p-4 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium">{title}</h3>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 shrink-0 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {relevance && (
        <p className="text-xs text-primary mt-2 font-medium">{relevance}</p>
      )}
      {outcome && (
        <div className="pt-2 mt-2 border-t border-border">
          <p className="text-sm font-medium text-[color:var(--success)]">{outcome}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

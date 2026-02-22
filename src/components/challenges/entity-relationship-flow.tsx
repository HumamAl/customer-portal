import {
  Building2,
  FolderKanban,
  Ticket,
  FileText,
  FileSignature,
  Package,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EntityNode {
  label: string;
  icon: LucideIcon;
  level: number;
  highlight?: boolean;
}

const entities: EntityNode[] = [
  { label: "Organization", icon: Building2, level: 0, highlight: true },
  { label: "Projects", icon: FolderKanban, level: 1 },
  { label: "Tickets", icon: Ticket, level: 2 },
  { label: "Documents", icon: FileText, level: 2 },
  { label: "Contracts", icon: FileSignature, level: 2 },
  { label: "Assets", icon: Package, level: 3 },
  { label: "Time Entries", icon: Clock, level: 3 },
];

export function EntityRelationshipFlow() {
  // Group entities by level
  const levels = [0, 1, 2, 3];

  return (
    <div className="rounded-lg border border-border bg-card/50 p-4">
      <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
        Entity Hierarchy
      </p>
      <div className="flex flex-col items-center gap-2">
        {levels.map((level) => {
          const nodesAtLevel = entities.filter((e) => e.level === level);
          return (
            <div key={level}>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {nodesAtLevel.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.label}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border px-3 py-2",
                        node.highlight
                          ? "border-primary/40 bg-primary/10 ring-1 ring-primary/20"
                          : "border-border bg-card"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs font-medium">{node.label}</span>
                    </div>
                  );
                })}
              </div>
              {/* Connector lines */}
              {level < 3 && (
                <div className="flex justify-center py-1">
                  <div className="flex items-center gap-1">
                    <div className="w-px h-3 bg-border" />
                    {nodesAtLevel.length > 1 && (
                      <>
                        <div className="w-8 h-px bg-border" />
                        <div className="w-px h-3 bg-border" />
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Cascade note */}
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] text-muted-foreground">
          Changes cascade through all connected entities automatically
        </span>
      </div>
    </div>
  );
}

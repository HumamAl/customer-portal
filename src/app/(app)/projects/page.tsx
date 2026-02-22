"use client";

import { useState } from "react";
import { projects, getUserById } from "@/data/mock-data";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectStatus } from "@/lib/types";

const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  planning: "bg-primary/10 text-primary",
  on_hold: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  completed: "bg-muted text-muted-foreground",
};

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  planning: "Planning",
  on_hold: "On Hold",
  completed: "Completed",
};

type FilterTab = "all" | ProjectStatus;

export default function ProjectsPage() {
  const [tab, setTab] = useState<FilterTab>("all");

  const filtered = projects.filter((p) =>
    tab === "all" ? true : p.status === tab
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage project timelines, budgets, and progress
        </p>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({projects.filter((p) => p.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="planning">
            Planning ({projects.filter((p) => p.status === "planning").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({projects.filter((p) => p.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="on_hold">
            On Hold ({projects.filter((p) => p.status === "on_hold").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const manager = getUserById(project.managerId);
          const budgetPercent =
            project.budget > 0
              ? Math.round((project.spent / project.budget) * 100)
              : 0;

          return (
            <Card key={project.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight">
                    {project.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={statusStyles[project.status]}
                  >
                    {statusLabels[project.status]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {project.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span>
                    <span className="font-medium">{formatCurrency(project.spent)}</span>
                    <span className="text-muted-foreground"> / {formatCurrency(project.budget)}</span>
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  {budgetPercent}% utilized
                </div>

                {/* Manager */}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Manager</span>
                  <span className="font-medium">{manager?.name ?? "Unassigned"}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No projects match the selected filter
        </div>
      )}
    </div>
  );
}

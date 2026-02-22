"use client";

import { useState } from "react";
import { contracts } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ContractStatus } from "@/lib/types";

const statusStyles: Record<ContractStatus, string> = {
  active: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  expiring: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  expired: "bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]",
  draft: "bg-muted text-muted-foreground",
  terminated: "bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]",
};

const statusLabels: Record<ContractStatus, string> = {
  active: "Active",
  expiring: "Expiring",
  expired: "Expired",
  draft: "Draft",
  terminated: "Terminated",
};

type FilterTab = "all" | ContractStatus;

export default function ContractsPage() {
  const [tab, setTab] = useState<FilterTab>("all");

  const filtered = contracts.filter((c) =>
    tab === "all" ? true : c.status === tab
  );

  const totalValue = filtered.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage client contracts, renewals, and agreements
        </p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Contract Value ({filtered.length} contracts)
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatCurrency(totalValue)}
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Active: </span>
                <span className="font-semibold">
                  {contracts.filter((c) => c.status === "active").length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Expiring: </span>
                <span className="font-semibold text-[color:var(--warning)]">
                  {contracts.filter((c) => c.status === "expiring").length}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Draft: </span>
                <span className="font-semibold">
                  {contracts.filter((c) => c.status === "draft").length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
        <TabsList>
          <TabsTrigger value="all">All ({contracts.length})</TabsTrigger>
          <TabsTrigger value="active">
            Active ({contracts.filter((c) => c.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="expiring">
            Expiring ({contracts.filter((c) => c.status === "expiring").length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Draft ({contracts.filter((c) => c.status === "draft").length})
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired ({contracts.filter((c) => c.status === "expired").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((contract) => (
          <Card key={contract.id} className="card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base leading-tight">
                  {contract.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={statusStyles[contract.status]}
                >
                  {statusLabels[contract.status]}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {contract.clientName}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Value</span>
                <span className="font-semibold">{formatCurrency(contract.value)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Period</span>
                <span className="text-xs">
                  {formatDate(contract.startDate)} — {formatDate(contract.endDate)}
                </span>
              </div>

              {contract.renewalDate && (
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Renewal</span>
                  <span className="text-xs font-medium">
                    {formatDate(contract.renewalDate)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No contracts match the selected filter
        </div>
      )}
    </div>
  );
}

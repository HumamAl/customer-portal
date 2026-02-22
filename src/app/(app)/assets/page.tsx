"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { assets } from "@/data/mock-data";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AssetStatus } from "@/lib/types";

type AssetCategory = "hardware" | "software" | "network" | "server" | "peripheral";

const statusStyles: Record<AssetStatus, string> = {
  operational: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  maintenance: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  decommissioned: "bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]",
  pending: "bg-muted text-muted-foreground",
};

const statusLabels: Record<AssetStatus, string> = {
  operational: "Operational",
  maintenance: "Maintenance",
  decommissioned: "Decommissioned",
  pending: "Pending",
};

const categoryStyles: Record<AssetCategory, string> = {
  hardware: "bg-primary/10 text-primary",
  software: "bg-[color:var(--chart-2)]/10 text-[color:var(--chart-2)]",
  network: "bg-[color:var(--chart-3)]/10 text-[color:var(--chart-3)]",
  server: "bg-[color:var(--chart-4)]/10 text-[color:var(--chart-4)]",
  peripheral: "bg-muted text-muted-foreground",
};

const categoryLabels: Record<AssetCategory, string> = {
  hardware: "Hardware",
  software: "Software",
  network: "Network",
  server: "Server",
  peripheral: "Peripheral",
};

type CategoryFilter = "all" | AssetCategory;

const categoryOptions: CategoryFilter[] = [
  "all",
  "hardware",
  "software",
  "network",
  "server",
  "peripheral",
];

export default function AssetsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");

  const filtered = assets.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ? true : a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assets</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track hardware, software, and network assets across organizations
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Tabs
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}
        >
          <TabsList className="flex-wrap h-auto">
            {categoryOptions.map((opt) => (
              <TabsTrigger key={opt} value={opt}>
                {opt === "all"
                  ? `All (${assets.length})`
                  : `${categoryLabels[opt]} (${assets.filter((a) => a.category === opt).length})`}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="card-hover overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Category</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[160px]">Location</TableHead>
              <TableHead className="w-[110px] text-right">Value</TableHead>
              <TableHead className="w-[120px] text-right">Warranty End</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No assets found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((asset) => (
                <TableRow key={asset.id} className="table-row-hover">
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={categoryStyles[asset.category]}>
                      {categoryLabels[asset.category]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusStyles[asset.status]}>
                      {statusLabels[asset.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {asset.location}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(asset.value)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatDate(asset.warrantyEnd)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

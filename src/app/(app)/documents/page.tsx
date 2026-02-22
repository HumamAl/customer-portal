"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { documents, getUserById, getProjectById } from "@/data/mock-data";
import { formatFileSize, formatDate } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DocumentType } from "@/lib/types";

const typeStyles: Record<DocumentType, string> = {
  invoice: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  report: "bg-primary/10 text-primary",
  contract: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  proposal: "bg-[color:var(--chart-3)]/10 text-[color:var(--chart-3)]",
  sow: "bg-[color:var(--chart-4)]/10 text-[color:var(--chart-4)]",
  other: "bg-muted text-muted-foreground",
};

const typeLabels: Record<DocumentType, string> = {
  invoice: "Invoice",
  report: "Report",
  contract: "Contract",
  proposal: "Proposal",
  sow: "SOW",
  other: "Other",
};

const typeOptions: (DocumentType | "all")[] = [
  "all",
  "invoice",
  "report",
  "contract",
  "proposal",
  "sow",
  "other",
];

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<DocumentType | "all">("all");

  const filtered = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" ? true : d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and manage project files, invoices, and contracts
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as DocumentType | "all")}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt === "all"
                  ? `All Types (${documents.length})`
                  : `${typeLabels[opt]} (${documents.filter((d) => d.type === opt).length})`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="card-hover overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead className="w-[160px]">Project</TableHead>
              <TableHead className="w-[90px] text-right">Size</TableHead>
              <TableHead className="w-[140px]">Uploaded By</TableHead>
              <TableHead className="w-[120px] text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((doc) => {
                const uploader = getUserById(doc.uploadedById);
                const project = getProjectById(doc.projectId);
                return (
                  <TableRow key={doc.id} className="table-row-hover">
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={typeStyles[doc.type]}>
                        {typeLabels[doc.type]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {project?.name ?? "—"}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatFileSize(doc.size)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {uploader?.name ?? "Unknown"}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDate(doc.uploadedAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

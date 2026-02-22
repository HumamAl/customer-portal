"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tickets, getUserById } from "@/data/mock-data";
import { formatRelativeDate } from "@/lib/formatters";
import type { TicketStatus, TicketPriority } from "@/lib/types";

type SortField = "id" | "title" | "status" | "priority" | "updatedAt";
type SortDir = "asc" | "desc";

const statusStyles: Record<TicketStatus, string> = {
  open: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  in_progress: "bg-primary/10 text-primary",
  waiting: "bg-muted text-muted-foreground",
  resolved: "bg-[color:var(--success)]/10 text-[color:var(--success)]",
  closed: "bg-muted text-muted-foreground",
};

const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  waiting: "Waiting",
  resolved: "Resolved",
  closed: "Closed",
};

const priorityStyles: Record<TicketPriority, string> = {
  critical: "bg-[color:var(--destructive)]/10 text-[color:var(--destructive)]",
  high: "bg-[color:var(--warning)]/10 text-[color:var(--warning)]",
  medium: "bg-primary/10 text-primary",
  low: "bg-muted text-muted-foreground",
};

const priorityOrder: Record<TicketPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const statusOrder: Record<TicketStatus, number> = { open: 0, in_progress: 1, waiting: 2, resolved: 3, closed: 4 };

type FilterTab = "all" | "open" | "in_progress" | "resolved";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FilterTab>("all");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    const result = tickets.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      const matchesTab = tab === "all" ? true : t.status === tab;
      return matchesSearch && matchesTab;
    });

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "id":
          cmp = a.id.localeCompare(b.id);
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "status":
          cmp = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "priority":
          cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "updatedAt":
          cmp = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, tab, sortField, sortDir]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track and manage support tickets across all projects
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Tabs value={tab} onValueChange={(v) => setTab(v as FilterTab)}>
          <TabsList>
            <TabsTrigger value="all">All ({tickets.length})</TabsTrigger>
            <TabsTrigger value="open">
              Open ({tickets.filter((t) => t.status === "open").length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({tickets.filter((t) => t.status === "in_progress").length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({tickets.filter((t) => t.status === "resolved").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[100px] cursor-pointer select-none"
                onClick={() => handleSort("id")}
              >
                <span className="inline-flex items-center">
                  ID <SortIcon field="id" />
                </span>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("title")}
              >
                <span className="inline-flex items-center">
                  Title <SortIcon field="title" />
                </span>
              </TableHead>
              <TableHead
                className="w-[120px] cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <span className="inline-flex items-center">
                  Status <SortIcon field="status" />
                </span>
              </TableHead>
              <TableHead
                className="w-[100px] cursor-pointer select-none"
                onClick={() => handleSort("priority")}
              >
                <span className="inline-flex items-center">
                  Priority <SortIcon field="priority" />
                </span>
              </TableHead>
              <TableHead className="w-[140px]">Assignee</TableHead>
              <TableHead
                className="w-[120px] text-right cursor-pointer select-none"
                onClick={() => handleSort("updatedAt")}
              >
                <span className="inline-flex items-center justify-end w-full">
                  Updated <SortIcon field="updatedAt" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((ticket) => {
                const assignee = getUserById(ticket.assigneeId);
                return (
                  <TableRow key={ticket.id} className="table-row-hover">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {ticket.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{ticket.title}</div>
                      <div className="flex gap-1 mt-1">
                        {ticket.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusStyles[ticket.status]}>
                        {statusLabels[ticket.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={priorityStyles[ticket.priority]}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {assignee?.name ?? "Unassigned"}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatRelativeDate(ticket.updatedAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

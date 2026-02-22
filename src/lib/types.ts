import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ── Customer Portal Domain Types ──

export type UserRole = "admin" | "viewer";
export type TicketStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "critical" | "high" | "medium" | "low";
export type ProjectStatus = "planning" | "active" | "on_hold" | "completed";
export type ContractStatus = "draft" | "active" | "expiring" | "expired" | "terminated";
export type AssetStatus = "operational" | "maintenance" | "decommissioned" | "pending";
export type DocumentType = "invoice" | "report" | "contract" | "proposal" | "sow" | "other";

export interface Organization {
  id: string;
  name: string;
  plan: "starter" | "professional" | "enterprise";
  domain: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assigneeId: string;
  reporterId: string;
  projectId: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  organizationId: string;
  managerId: string;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  projectId: string;
  uploadedById: string;
  organizationId: string;
  size: number;
  uploadedAt: string;
  url: string;
}

export interface Contract {
  id: string;
  title: string;
  clientName: string;
  status: ContractStatus;
  value: number;
  organizationId: string;
  projectId: string;
  startDate: string;
  endDate: string;
  renewalDate?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: "hardware" | "software" | "network" | "server" | "peripheral";
  status: AssetStatus;
  organizationId: string;
  assignedTo?: string;
  purchaseDate: string;
  warrantyEnd: string;
  value: number;
  location: string;
  serialNumber: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  ticketId?: string;
  description: string;
  hours: number;
  date: string;
  billable: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "ticket" | "project" | "contract" | "system";
}

// Dashboard stat type
export interface DashboardStat {
  title: string;
  value: string;
  description: string;
  trend: number;
  trendDirection: "up" | "down";
}

// Chart data
export interface TicketTrendPoint {
  month: string;
  opened: number;
  resolved: number;
}

export interface ProjectBudgetPoint {
  project: string;
  budget: number;
  spent: number;
}

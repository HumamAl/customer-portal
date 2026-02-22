import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline: "Full-stack developer shipping production-ready customer portals",
  bio: "I build MVPs and production apps that solve real operational problems. This demo shows my approach to your customer portal — clean architecture, secure multi-tenant design, and a polished UI that your users will actually enjoy using.",
  approach: [
    {
      title: "Understand",
      description:
        "Requirements deep-dive, core pain points, right questions first",
    },
    {
      title: "Build",
      description:
        "Working code from day one, visible progress every few days",
    },
    {
      title: "Ship",
      description:
        "Production-ready, clean architecture, easy to extend",
    },
    {
      title: "Iterate",
      description: "Short feedback cycles, no surprises",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
    },
    {
      name: "Backend & Auth",
      skills: ["Node.js", "REST APIs", "RBAC", "MFA/TOTP", "Multi-tenant"],
    },
    {
      name: "Data & Storage",
      skills: [
        "PostgreSQL",
        "Prisma",
        "File Uploads",
        "PDF Processing",
      ],
    },
    {
      name: "DevOps",
      skills: ["Vercel", "GitHub Actions", "CI/CD", "Testing"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "Fleet and maintenance management platform with asset tracking, work orders, and preventive maintenance scheduling.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    outcome:
      "6-module SaaS managing 500+ assets with preventive maintenance scheduling",
    relevance:
      "Multi-module SaaS with complex entity relationships — similar architecture to your portal",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "Custom lead intake system with dashboard, lead scoring, pipeline management, and automation rules.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    outcome: "Handles 200+ leads/day with automated scoring and routing",
    relevance:
      "Dashboard + CRUD + filtering — core patterns your portal needs",
  },
  {
    id: "dealer-hub",
    title: "DealerHub — Automotive SaaS",
    description:
      "Multi-tenant dealership platform with inventory management, lead scoring, and reconditioning tracking.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    outcome:
      "Multi-tenant SaaS managing 187+ vehicles and $892K monthly revenue",
    liveUrl: "https://dealer-platform-neon.vercel.app",
    relevance:
      "Multi-tenant RBAC architecture — exactly what your portal requires",
  },
  {
    id: "payguard",
    title: "PayGuard — Transaction Monitor",
    description:
      "Transaction monitoring dashboard with real-time flagging, linked accounts, and alert management.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    outcome: "Monitors 847+ transactions with 94.2% alert delivery",
    liveUrl: "https://payment-monitor.vercel.app",
    relevance:
      "Real-time dashboards with filtering and role-based data access",
  },
];

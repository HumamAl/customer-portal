export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most teams rush to build features and bolt on security and structure later — leading to data leaks, brittle code, and painful rewrites at scale.",
  differentApproach:
    "I build the tenant isolation and data contracts first — so every feature ships on a secure, clean foundation from day one.",
  accentWord: "tenant isolation",
};

export const challenges: Challenge[] = [
  {
    id: "multi-tenant",
    title: "Secure Multi-Tenant Data Isolation",
    description:
      "Multiple organizations sharing one codebase means every query, every API call, and every cache entry must be scoped to the correct tenant — or risk catastrophic data leaks.",
    outcome:
      "Eliminates cross-tenant data leaks while maintaining single-codebase simplicity",
  },
  {
    id: "clean-architecture",
    title: "Clean Architecture at MVP Speed",
    description:
      "Shipping fast usually means cutting corners. But a messy MVP becomes unmaintainable within months, making every new feature slower than the last.",
    outcome:
      "Ship in weeks, not months — without accumulating crippling tech debt",
  },
  {
    id: "entity-relationships",
    title: "Complex Entity Relationships",
    description:
      "Organizations own projects, which have tickets, documents, contracts, and assets — all interconnected with cascading updates and referential integrity requirements.",
    outcome:
      "Every entity stays connected — changes cascade correctly across the system",
  },
  {
    id: "search-filter",
    title: "Search, Filter, and Pagination at Scale",
    description:
      "Users need instant results across thousands of tickets, documents, and assets with complex filter combinations — without the page grinding to a halt.",
    outcome:
      "Users find what they need in under 2 seconds across 10,000+ records",
  },
];

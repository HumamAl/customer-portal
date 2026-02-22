"use client";

import { useRef, useState, useEffect, type RefObject } from "react";
import { ExternalLink, ArrowRight, Code2, Shield, Database, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile, portfolioProjects } from "@/data/proposal";

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

const categoryIcons: Record<string, typeof Code2> = {
  Frontend: Code2,
  "Backend & Auth": Shield,
  "Data & Storage": Database,
  DevOps: Rocket,
};

const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "15+", label: "Industries Served" },
  { value: "< 48hr", label: "Demo Turnaround" },
];

export default function ProposalPage() {
  const proofRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const proofInView = useInView(proofRef);
  const howInView = useInView(howRef);
  const skillsInView = useInView(skillsRef);
  const ctaInView = useInView(ctaRef);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* ── Section 1: Dark Gradient Hero ── */}
        <section
          className="relative rounded-3xl overflow-hidden noise-overlay"
          style={{ background: "oklch(0.10 0.02 var(--primary-h))" }}
        >
          {/* Multi-layer radial backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(from_var(--primary)_calc(l+0.05)_c_h_/_0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0_0_0_/_0.3),transparent_70%)]" />

          <div className="relative z-10 px-8 pt-10 pb-8 md:px-12 md:pt-14 md:pb-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-medium mb-6 animate-badge-pop">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--success)] animate-pulse" />
              Built this demo for your project
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl tracking-tight leading-none mb-4 text-white">
              <span className="font-light">Clean</span>{" "}
              <span className="font-black">MVP Architecture</span>
            </h1>

            {/* Tagline */}
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {profile.tagline}
            </p>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 bg-white/5 px-8 py-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              {heroStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                  style={{ animationDelay: `${i * 150}ms`, animationDuration: "500ms" }}
                >
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section ref={proofRef} className={`reveal ${proofInView ? "in-view" : ""}`}>
          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight">Relevant Projects</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
              Recent builds that share architecture patterns with your customer portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className={`card-hover-elevated rounded-xl bg-gradient-to-br from-accent/5 to-background border border-primary/10 shadow-lg p-5 ${proofInView ? "animate-in fade-in slide-in-from-bottom-4 fill-mode-both" : "opacity-0"}`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: "500ms",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base">{project.title}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors shrink-0 mt-0.5"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {project.description}
                </p>

                {project.outcome && (
                  <p className="text-sm text-[color:var(--success)] font-medium mt-3">
                    {project.outcome}
                  </p>
                )}

                {project.relevance && (
                  <p className="text-xs text-primary/80 mt-2 italic">
                    {project.relevance}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-0 text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section ref={howRef} className={`reveal ${howInView ? "in-view" : ""}`}>
          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {profile.approach.map((step, i) => (
              <div
                key={step.title}
                className={`relative rounded-xl border bg-card p-5 card-hover ${howInView ? "animate-in fade-in slide-in-from-bottom-2 fill-mode-both" : "opacity-0"}`}
                style={{
                  animationDelay: `${i * 150}ms`,
                  animationDuration: "500ms",
                }}
              >
                <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {i < profile.approach.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section ref={skillsRef} className={`reveal ${skillsInView ? "in-view" : ""}`}>
          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
              Tech Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              Skills Relevant to This Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.skillCategories.map((category, i) => {
              const Icon = categoryIcons[category.name] || Code2;
              return (
                <div
                  key={category.name}
                  className={`rounded-xl border bg-card p-5 card-hover ${skillsInView ? "animate-in fade-in slide-in-from-bottom-2 fill-mode-both" : "opacity-0"}`}
                  style={{
                    animationDelay: `${i * 150}ms`,
                    animationDuration: "500ms",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0 text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Section 5: CTA Footer ── */}
        <section
          ref={ctaRef}
          className={`rounded-t-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 -mx-6 px-6 py-12 mt-12 noise-overlay ${ctaInView ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="text-center space-y-5">
            {/* Pulsing green dot */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--success)]" />
              </span>
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                Available Now
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Let&apos;s build this together
            </h2>

            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              This demo is just the starting point. I can have the production
              version scoped and started within days.
            </p>

            <Button
              size="lg"
              className="btn-magnetic btn-premium btn-cta-pulse relative z-10 text-sm font-semibold px-8"
            >
              Start the Conversation
            </Button>

            <p className="text-sm font-medium text-primary pt-2">
              &mdash; {profile.name}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

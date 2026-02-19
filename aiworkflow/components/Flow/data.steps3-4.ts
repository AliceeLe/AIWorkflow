import { ActionItem } from "./types";

// ── Step 3: Getting Started ──────────────────────────────────────────────────
// Shown on the first shared action-items screen (same for all result paths).
export const STEP3_TITLE = "Getting Started";
export const STEP3_SUBTITLE =
  "Before you adopt any new AI tooling, these four steps will save you from the most common implementation mistakes.";

export const STEP3_ACTIONS: ActionItem[] = [
  {
    step: "01",
    title: "Audit Your Current Stack",
    description:
      "Document every place AI is already being used (or experimented with) in your team. Identify overlaps, gaps, and redundant subscriptions. Build a single source of truth before adding new tools.",
  },
  {
    step: "02",
    title: "Define Your Evaluation Criteria",
    description:
      "Set measurable benchmarks before you commit: latency targets, cost-per-request budgets, quality thresholds on your actual tasks. Avoid vendor benchmarks — run your own evals on representative prompts.",
  },
  {
    step: "03",
    title: "Run a Constrained Pilot",
    description:
      "Pick one workflow, one team, and a 30-day window. Instrument everything. Track real usage, not perceived value. Let data drive the broader rollout decision.",
  },
  {
    step: "04",
    title: "Establish Governance Early",
    description:
      "Define who can approve new AI integrations, how sensitive data is handled, and what review process AI-generated code goes through before merging. Policy debt is much harder to repay later.",
  },
];

// ── Step 4: Scale & Sustain ──────────────────────────────────────────────────
// Shown on the second shared action-items screen (same for all result paths).
export const STEP4_TITLE = "Scale & Sustain";
export const STEP4_SUBTITLE =
  "Once your pilot is live, these steps determine whether AI adoption becomes a durable capability or a forgotten experiment.";

export const STEP4_ACTIONS: ActionItem[] = [
  {
    step: "05",
    title: "Build Your Prompt Library",
    description:
      "Create a shared repository of battle-tested prompts for your most common tasks. Treat them like code — version controlled, reviewed, and continuously improved based on output quality.",
  },
  {
    step: "06",
    title: "Implement Cost Monitoring",
    description:
      "Set up token usage dashboards and budget alerts before you scale. Per-team or per-project cost attribution prevents surprise bills and helps you identify which workflows deliver the most ROI.",
  },
  {
    step: "07",
    title: "Plan for Model Transitions",
    description:
      "Models are updated and deprecated on 6–18 month cycles. Abstract your integration behind an interface so you can swap providers or versions without rewriting application logic.",
  },
  {
    step: "08",
    title: "Invest in Developer Education",
    description:
      "The biggest failure mode for AI adoption isn't the technology — it's developers who don't know how to prompt effectively or who distrust outputs and ignore the tools entirely. Run workshops, share wins, and create feedback loops.",
  },
];

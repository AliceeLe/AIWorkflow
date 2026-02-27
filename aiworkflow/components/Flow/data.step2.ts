import { Step2Content } from "./types";

// One entry per result index (1–5), keyed to match RESULTS in data.step1.ts.
// Each entry has a headline, a summary paragraph, and info blocks.
// block.body can be a string OR a string[] for bullet points.
export const STEP2_CONTENT: Record<number, Step2Content> = {
  // ── Result 1: Self-Hosted Open-Weight + RAG ──────────────────────────────
  1: {
    headline: "Self-Hosted Open-Weight + RAG",
    summary:
      "This option means the company runs its own open-weight language model (such as Llama or Mistral) on internal infrastructure and connects it to company data using Retrieval-Augmented Generation (RAG).",
    blocks: [
      {
        icon: "✅",
        title: "Pros:",
        body:  "Maximum control over data privacy, customization, and internal workflows. Long-term cost benefits at scale if your team has infrastructure expertise.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body: "Requires significant upfront investment in hardware and engineering talent. Ongoing maintenance and model updates are your responsibility.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Identify projects with strict data sovereignty or compliance requirements",
          "Set up internal ML infrastructure (GPUs, storage, networking)",
          "Deploy the open-weight model and connect it to internal data sources via RAG",
          "Establish monitoring, logging, and update procedures",
          "Train your team on operational best practices for model governance",
        ],
      },
    ],
  },

  // ── Result 2: Large-Context Premium ─────────────────────────────────────
  2: {
    headline: "Large-Context Premium (GPT-4 class / Claude Opus)",
    summary:
      "This option means subscribing to a commercial AI provider that offers high-performance models with large context windows and a low infrastructure burden.",
    blocks: [
      {
        icon: "✅",
        title: "Pros:",
        body:
          "Fast deployment, state-of-the-art performance, large context support, and minimal technical overhead for internal teams.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body:
          "Subject to token limits, latency considerations, and recurring usage costs. Governance and security depend on the provider’s policies.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Negotiate enterprise licensing and SLAs",
          "Define internal governance and data handling policies",
          "Integrate APIs with internal tools, IDEs, and documentation systems",
          "Train staff on best practices for prompt design and result verification",
          "Monitor usage, costs, and performance metrics regularly",
        ],
      },
    ],
  },

  // ── Result 3: Agent-Capable API ──────────────────────────────────────────
  3: {
    headline: "Agent-Capable API (GPT Agents / Gemini via Vertex)",
    summary:
      "This option involves using AI systems designed to take multi-step actions (e.g., reading code, running tests, updating tickets).",
    blocks: [
      {
        icon: "✅",
        title: "Pros:",
        body: "Enables autonomous workflows for complex or repetitive tasks, reducing manual effort and accelerating development pipelines.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body:
          "Requires careful monitoring and governance to prevent unintended actions. Human verification is essential for critical workflows.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Define permitted tools and system access (e.g., GitHub, CI logs, internal documentation)",
          "Set up guardrails, permission boundaries, and safety checks",
          "Implement monitoring, logging, and alerting for autonomous actions",
          "Train staff on interpreting agent outputs and approving critical actions",
        ],
      },
    ],
  },

  // ── Result 4: Cost-Optimized Router ─────────────────────────────────────
  4: {
    headline: "Cost-Optimized Router (Small Model + Premium Escalation)",
    summary:
      "This option means using a smaller, lower-cost model for routine tasks and automatically escalating complex queries to a more powerful model.",
    blocks: [
      {
        icon: "✅",
        title: "Pros:",
        body:
          "Provides cost efficiency without sacrificing quality for critical queries. Ideal for startups or mid-size enterprises seeking scalable AI adoption.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body:
          "Requires active monitoring of usage patterns, query routing, and budget management to ensure cost-effectiveness.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Define routing logic based on query complexity or priority",
          "Integrate both small and premium model APIs",
          "Implement monitoring for performance and cost tracking",
          "Adjust routing thresholds to optimize cost vs. accuracy",
        ],
      },
    ],
  },

  // ── Result 5: IDE-Integrated Fast ────────────────────────────────────────
  5: {
    headline: "IDE-Integrated Fast (GitHub Copilot / Claude Haiku)",
    summary:
      "This option focuses on embedding AI directly inside developers' IDEs for real-time code suggestions and documentation assistance.",
    blocks: [
      {
        icon: "✅",
        title: "Pros:",
        body:
          "Instant access in the IDE, minimal setup required, and fastest adoption since no separate deployment or infrastructure is needed.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body:
          "Limited control over model behavior, privacy depends on the provider, and may not support complex multi-step reasoning tasks.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Obtain enterprise licensing or subscriptions for the chosen IDE AI plugin",
          "Configure access controls and authentication",
          "Establish coding guidelines for AI-assisted development",
          "Train developers on prompt strategies and result validation",
          "Monitor usage, integration issues, and productivity impact",
        ],
      },
    ],
  },
};
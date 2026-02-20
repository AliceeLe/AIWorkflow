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
        body: "Maximum control over privacy and customization but requires technical talent and infrastructure investment.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body: "Upfront investment is high but long-term ownership is favorable at scale.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Organizations with strict data sovereignty requirements",
          "Regulated industries (finance, healthcare, defense)",
          "Teams with ML infrastructure experience",
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
        body: "Fast deployment and access to state-of-the-art performance without managing infrastructure.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body: "Token limits, latency, and usage costs.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Negotiate enterprise licensing",
          "Define governance policies",
          "Integrate the API into internal tools (e.g., IDEs, documentation systems)",
          "Establish secure data handling policies",
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
        icon: "⚠️",
        title: "Cons:",
        body: "Unlike simple chat models, these systems act autonomously within boundaries, so governance and monitoring are critical. Human verification and oversight are also required.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Define permitted tool access (e.g., GitHub, CI logs, internal docs)",
          "Implement guardrails",
          "Monitor logs for safety and compliance",
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
        body: "Balances cost efficiency with performance. Suitable for startups and mid-size enterprises instead of defaulting to premium models.",
      },
      {
        icon: "⚠️",
        title: "Cons:",
        body: "Needs careful usage tracking and workload management.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Define routing logic (e.g., based on query length or complexity)",
          "Integrate both APIs",
          "Track usage costs to ensure savings",
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
        body: "Fastest because no deployment is needed.",
      },
      {
        icon: "📋",
        title: "Steps:",
        body: [
          "Enterprise licensing",
          "Configuring access controls",
          "Establishing coding guidelines for AI use",
          "Training employees on prompt and review skills",
        ],
      },
    ],
  },
};
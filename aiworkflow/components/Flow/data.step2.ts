import { Step2Content } from "./types";

// One entry per result index (1–5), keyed to match RESULTS in data.step1.ts.
// Each entry has a headline, a summary paragraph, and 4 info blocks.
// You can freely edit the text, icons, and block titles here.
export const STEP2_CONTENT: Record<number, Step2Content> = {
  // ── Result 1: Self-Hosted Open-Weight + RAG ──────────────────────────────
  1: {
    headline: "Self-Hosted Open-Weight + RAG",
    summary:
      "Your profile points toward running open-weight models on your own infrastructure, augmented with Retrieval-Augmented Generation to ground outputs in your private codebase.",
    blocks: [
      {
        icon: "🖥️",
        title: "What This Means",
        body: "You'll deploy models like Llama 3, Mistral, or CodeLlama on your own GPU servers or on-prem hardware. No data ever leaves your network, giving you full compliance control.",
      },
      {
        icon: "📚",
        title: "Why RAG Matters Here",
        body: "RAG lets the model query your internal docs, wikis, and codebase at inference time — dramatically improving accuracy for domain-specific tasks without expensive fine-tuning.",
      },
      {
        icon: "⚠️",
        title: "Key Tradeoffs",
        body: "Expect higher upfront DevOps investment and ongoing hardware costs. Model quality may lag frontier APIs by 3–6 months, and you'll own the update cycle.",
      },
      {
        icon: "✅",
        title: "Best Fit For",
        body: "Organizations with strict data sovereignty requirements, regulated industries (finance, healthcare, defense), and teams with ML infra experience.",
      },
    ],
  },

  // ── Result 2: Large-Context Premium ─────────────────────────────────────
  2: {
    headline: "Large-Context Premium Models",
    summary:
      "Your use case demands the highest reasoning quality and large context windows. Frontier models like GPT-4 or Claude Opus are the right fit.",
    blocks: [
      {
        icon: "🧠",
        title: "What This Means",
        body: "You'll call frontier APIs directly — OpenAI, Anthropic, or Google — to get the most capable models available. Context windows of 100k–200k tokens let you feed entire codebases in a single prompt.",
      },
      {
        icon: "📐",
        title: "Why Context Size Matters",
        body: "Large-context models can reason across entire modules, understand cross-file dependencies, and produce coherent refactors without losing track of earlier constraints.",
      },
      {
        icon: "⚠️",
        title: "Key Tradeoffs",
        body: "These are the most expensive models per token. Latency is higher than smaller models. You'll need to manage API rate limits and build cost alerting from day one.",
      },
      {
        icon: "✅",
        title: "Best Fit For",
        body: "Complex architectural decisions, deep legacy refactors, and tasks requiring sustained reasoning over very large bodies of code or documentation.",
      },
    ],
  },

  // ── Result 3: Agent-Capable API ──────────────────────────────────────────
  3: {
    headline: "Agent-Capable API Architecture",
    summary:
      "Your workflow calls for AI that can act, not just respond. Agent frameworks let the model plan multi-step tasks, call tools, and iterate autonomously.",
    blocks: [
      {
        icon: "🤖",
        title: "What This Means",
        body: "You'll use platforms like OpenAI Assistants API, Gemini via Vertex AI Agent Builder, or Claude's tool-use capabilities to build agents that can browse docs, run shell commands, write and execute tests, and file PRs.",
      },
      {
        icon: "🔗",
        title: "Why Agents Change Everything",
        body: "Agents collapse multi-step workflows into a single invocation. Instead of prompting, reviewing, and re-prompting, the model handles iteration loops itself — reducing developer interrupt cycles.",
      },
      {
        icon: "⚠️",
        title: "Key Tradeoffs",
        body: "Agents require careful sandboxing and permission scoping. Unexpected tool calls can cause real side effects. Invest in observability and human-in-the-loop checkpoints before going fully autonomous.",
      },
      {
        icon: "✅",
        title: "Best Fit For",
        body: "Teams running CI/CD-integrated AI, autonomous test generation, PR review agents, and organizations comfortable with asynchronous AI-driven workflows.",
      },
    ],
  },

  // ── Result 4: Cost-Optimized Router ─────────────────────────────────────
  4: {
    headline: "Cost-Optimized Model Router",
    summary:
      "Your volume and budget profile calls for a tiered routing strategy — cheap fast models handle the majority of traffic, with escalation to premium models for hard problems.",
    blocks: [
      {
        icon: "⚡",
        title: "What This Means",
        body: "You build a routing layer that classifies incoming requests by complexity. Simple completions go to a small model (GPT-4o-mini, Haiku, Gemini Flash). Complex requests escalate to a frontier model.",
      },
      {
        icon: "💰",
        title: "The Cost Math",
        body: "Small models cost 10–50× less per token than frontier models. If even 70% of your requests can be handled by the small tier, your average cost per request drops dramatically.",
      },
      {
        icon: "⚠️",
        title: "Key Tradeoffs",
        body: "Routing logic adds engineering overhead. Misclassified requests waste money (over-routing) or degrade quality (under-routing). You'll need evaluation pipelines to tune the classifier.",
      },
      {
        icon: "✅",
        title: "Best Fit For",
        body: "High-volume production systems, internal developer tooling at scale, and teams that want to control AI costs without sacrificing capability for the tasks that need it.",
      },
    ],
  },

  // ── Result 5: IDE-Integrated Fast ────────────────────────────────────────
  5: {
    headline: "IDE-Integrated Fast Inference",
    summary:
      "Your workflow is centered on in-editor speed. Tight IDE integration with low-latency models gives you autocomplete and generation that feels native.",
    blocks: [
      {
        icon: "✏️",
        title: "What This Means",
        body: "Tools like GitHub Copilot, Cursor, or Claude in your IDE of choice provide sub-second inline suggestions, tab completions, and edit-mode generation without breaking your flow state.",
      },
      {
        icon: "🚀",
        title: "Why Latency Is the Priority",
        body: "At typing speed, a 3-second response is unusable. Fast models (Haiku, GPT-4o-mini, Codestral) are specifically optimized for the <500ms response times that make inline assistance feel natural.",
      },
      {
        icon: "⚠️",
        title: "Key Tradeoffs",
        body: "Fast models have lower reasoning depth than frontier models. For architectural questions or complex debugging, you'll want a secondary workflow with a premium model. Don't rely solely on autocomplete for hard problems.",
      },
      {
        icon: "✅",
        title: "Best Fit For",
        body: "Individual developers, small teams with straightforward codebases, and anyone who values flow-state productivity over peak model intelligence.",
      },
    ],
  },
};

import { ActionItem } from "./types";

// ── Step 3: Getting Started ──────────────────────────────────────────────────
// Shown on the first shared action-items screen (same for all result paths).
export const STEP3_TITLE = "Upgrading relevant skills";
export const STEP3_SUBTITLE =
  "After setting up AI into your workflow, you would want to train engineers on relevant skills so they can best utilize the new technology";

export const STEP3_ACTIONS: ActionItem[] = [
  {
    step: "01",
    title: "Upload your code files",
    description:
      "Strategically select specific code files to build up context information to feed the AI without wasting tokens.",
  },
  {
    step: "02",
    title: "Prompt engineering",
    description:
      "Apply prompt engineering techniques to the input to improve the quality of the generated code.",
  },
  {
    step: "03",
    title: "Code review",
    description:
      "PReview the generated code thoroughly, utilizing fundamental knowledge of the programming language to ensure accuracy.",
  },
  {
    step: "04",
    title: "Test your code",
    description:
      "Test the AI-generated code to verify its functionality and correctness before integration.",
  },
];

// ── Step 4: Scale & Sustain ──────────────────────────────────────────────────
// Shown on the second shared action-items screen (same for all result paths).
export const STEP4_TITLE = "Establish Performance Metrics";
export const STEP4_SUBTITLE =
  "These steps determine whether your employees are using AI tools well enough.";

export const STEP4_ACTIONS: ActionItem[] = [
  {
    step: "01",
    title: "Performance metrics",
    description:
      "Define measurable performance indicators that evaluate employee effectiveness when using AI tools",
  },
  {
    step: "02",
    title: "Tracking mechanisms",
    description:
      "Develop tracking mechanisms to monitor AI-assisted workflow outcomes such as productivity, code quality, and efficiency.",
  },
  {
    step: "03",
    title: "Define evaluation framework",
    description:
      "Create incentive or evaluation frameworks that reward effective and responsible AI usage.",
  },
  {
    step: "04",
    title: "Continuous work",
    description:
      "Continuously review and adjust metrics to ensure alignment with organizational goals and workflow improvements.",
  },
];

import { Question } from "./types";

// The label shown on Step 2 and Step 4 for each result index (1–5).
// Index 0 is unused — scoring always produces 1–5.
export const RESULTS = [
  "none",
  "Self-Hosted Open-Weight (Llama / Mistral) + RAG",
  "Large-Context Premium (GPT-4-class / Claude Opus)",
  "Agent-Capable API (GPT Agents / Gemini via Vertex)",
  "Cost-Optimized Router (Small model + Premium escalation)",
  "IDE-Integrated Fast (GitHub Copilot / Claude Haiku)",
];

export const STEP1_MATERIALS_REQUIRED = [
  "A computer capable of running your development environment reliably.",
  "An IDE or code editor configured for your project language and tooling.",
  "Access to your code repository and required project dependencies.",
  "Access to an approved AI coding tool account or API credentials.",
  "Stable internet connection and terminal or command-line access.",
];

// Each option's `value` is a comma-separated list of result indices that
// this answer votes for. Every value within a question must be unique,
// otherwise React treats two options as the same radio button.
export const QUESTIONS: Question[] = [
  {
    id: 1,
    legend: "1. What is your primary coding workflow?",
    description: "Identify your team size and structure so we can recommend AI tools that scale appropriately for your workflow.",
    options: [
      { label: "A. Solo developer / student", value: "2,4,5" },
      { label: "B. Small team (2–10 engineers)", value: "2,3,5" },
      { label: "C. Medium team (10–50 engineers)", value: "2,3,4" },
      { label: "D. Large organization (50+ engineers)", value: "1,3,4" },
    ],
  },
  {
    id: 2,
    legend: "2. What is your main AI coding use case?",
    description: "Focus on your organization's primary AI purpose to ensure the tool recommendation aligns with your core tasks and projects.",
    options: [
      { label: "A. Autocomplete & small snippets", value: "5" },
      { label: "B. Large feature generation", value: "4,5" },
      { label: "C. Refactoring legacy code", value: "1,2" },
      { label: "D. Code review & bug detection", value: "2,4" },
      { label: "E. Multi-file repository reasoning", value: "2,3" },
      { label: "F. Agent-based autonomous coding", value: "1,3" },
    ],
  },
  {
    id: 3,
    legend: "3. How important is multi-file / repo-wide context?",
    description: "If your projects involve multiple repositories or interdependent modules, this helps select AI tools capable of reasoning across large codebases.",
    options: [
      { label: "A. Not important", value: "4,5" },
      { label: "B. Somewhat important", value: "2,3" },
      { label: "C. Critical", value: "1,2" },
    ],
  },
  {
    id: 4,
    legend: "4. Do you need strong reasoning for complex algorithms?",
    description: "Choose this if your AI needs to handle tasks requiring multi-step logic or nuanced decision-making—like quantitative analysis, healthcare diagnostics, or risk modeling.",
    options: [
      { label: "A. Yes", value: "2,3" },
      { label: "B. Sometimes", value: "2,4" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 5,
    legend: "5. Do you require strict data privacy (no code sent externally)?",
    description: "Select the level of data privacy your organization requires to determine if self-hosted or enterprise AI solutions are needed.",
    image: { type: "image", content: "/privacy.jpg" },
    options: [
      { label: "A. Yes (Strict Local/Self-hosted)", value: "1" },
      { label: "B. Prefer enterprise API (Zero retention)", value: "1,2" },
      { label: "C. No restriction", value: "2,3,4,5" },
    ],
  },
  {
    id: 6,
    legend: "6. Do you have DevOps capability to host models?",
    description: "Your DevOps team’s ability to deploy, monitor, and scale AI models determines whether you can run models in-house or need cloud-managed solutions.",
    image: { type: "image", content: "/cicd.png" },
    options: [
      { label: "A. No", value: "4,5" },
      { label: "B. Limited", value: "2,3" },
      { label: "C. Yes (GPU infra / ML Team)", value: "1,3" },
    ],
  },
  {
    id: 7,
    legend: "7. Are you using:",
    description: "Identify your primary development environment to recommend AI tools that integrate seamlessly with your workflow.",
    options: [
      { label: "A. VSCode", value: "3,5" },
      { label: "B. JetBrains", value: "3,4" },
      { label: "C. Neovim / Custom", value: "1,2" },
      { label: "D. Cloud IDE", value: "2,4" },
    ],
  },
  {
    id: 8,
    legend: "8. Do you use CI/CD pipelines?",
    description: "Knowing whether you have automated deployment and testing pipelines helps align AI tool recommendations with your development lifecycle.",
    options: [
      { label: "A. Yes", value: "1,3" },
      { label: "B. Planning to", value: "2,3" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 9,
    legend: "9. Do you want AI to run tests automatically?",
    description: "Determine if you want AI to handle automated testing for efficiency and continuous integration support.",
    options: [
      { label: "A. Yes", value: "1,3" },
      { label: "B. Sometimes", value: "2,3" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 10,
    legend: "10. Expected monthly token usage?",
    description: "Estimate your expected AI usage to guide cost planning and model selection: low (prototypes), medium (team workflows), or high (production-scale automation).",
    options: [
      { label: "A. Low (light internal use or prototypes)", value: "5" },
      { label: "B. Medium (department-level workflows or customer-facing features)", value: "2,3" },
      { label: "C. High (production-scale automation, large user bases, or continuous model processing)", value: "1,4" },
    ],
  },
  {
    id: 11,
    legend: "11. Willing to pay for premium reasoning?",
    description: "Choose whether you are ready to invest in advanced AI reasoning that improves accuracy and performance for complex, high-stakes tasks.",
    image: { type: "image", content: "/aireasoning.webp" },
    options: [
      { label: "A. Yes", value: "2,3" },
      { label: "B. Mixed", value: "4" },
      { label: "C. No", value: "1,5" },
    ],
  },
];
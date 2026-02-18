import { useState } from "react";

const RESULTS = [
  "none",
  "Self-Hosted Open-Weight (Llama / Mistral) + RAG",
  "Large-Context Premium (GPT-4-class / Claude Opus)",
  "Agent-Capable API (GPT Agents / Gemini via Vertex)",
  "Cost-Optimized Router (Small model + Premium escalation)",
  "IDE-Integrated Fast (GitHub Copilot / Claude Haiku)",
];

interface Question {
  id: number;
  legend: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    legend: "1. What is your primary coding workflow?",
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
    options: [
      { label: "A. Autocomplete & small snippets", value: "" },
      { label: "B. Large feature generation", value: "4,5" },
      { label: "C. Refactoring legacy code", value: "1,2" },
      { label: "D. Code review & bug detection", value: "2,3" },
      { label: "E. Multi-file repository reasoning", value: "" },
      { label: "F. Agent-based autonomous coding", value: "1,2" },
    ],
  },
  {
    id: 3,
    legend: "3. How important is multi-file / repo-wide context?",
    options: [
      { label: "A. Not important", value: "4,5" },
      { label: "B. Somewhat important", value: "2,3" },
      { label: "C. Critical", value: "1,2" },
    ],
  },
  {
    id: 4,
    legend: "4. Do you need strong reasoning for complex algorithms?",
    options: [
      { label: "A. Yes", value: "2,3" },
      { label: "B. Sometimes", value: "2,4" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 5,
    legend: "5. Do you require strict data privacy (no code sent externally)?",
    options: [
      { label: "A. Yes (Strict Local/Self-hosted)", value: "1" },
      { label: "B. Prefer enterprise API (Zero retention)", value: "1" },
      { label: "C. No restriction", value: "2,3,4,5" },
    ],
  },
  {
    id: 6,
    legend: "6. Do you have DevOps capability to host models?",
    options: [
      { label: "A. No", value: "4,5" },
      { label: "B. Limited", value: "2,3" },
      { label: "C. Yes (GPU infra / ML Team)", value: "1,3" },
    ],
  },
  {
    id: 7,
    legend: "7. Are you using:",
    options: [
      { label: "A. VSCode", value: "3,5" },
      { label: "B. JetBrains", value: "3,5" },
      { label: "C. Neovim / Custom", value: "1,2" },
      { label: "D. Cloud IDE", value: "3,4" },
    ],
  },
  {
    id: 8,
    legend: "8. Do you use CI/CD pipelines?",
    options: [
      { label: "A. Yes", value: "1,3" },
      { label: "B. Planning to", value: "2,3" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 9,
    legend: "9. Do you want AI to run tests automatically?",
    options: [
      { label: "A. Yes", value: "1,3" },
      { label: "B. Sometimes", value: "2,3" },
      { label: "C. No", value: "4,5" },
    ],
  },
  {
    id: 10,
    legend: "10. Expected monthly token usage?",
    options: [
      { label: "A. Low", value: "5" },
      { label: "B. Medium", value: "2,3" },
      { label: "C. High", value: "1,4" },
    ],
  },
  {
    id: 11,
    legend: "11. Willing to pay for premium reasoning?",
    options: [
      { label: "A. Yes", value: "2,3" },
      { label: "B. Mixed", value: "4" },
      { label: "C. No", value: "1,5" },
    ],
  },
];

export default function StepOne({
  onNext,
}: {
  onNext: (choice: string) => void;
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = QUESTIONS.filter((q) => answers[q.id] === undefined).length;
    if (missing > 0) {
      setError(
        `You missed ${missing} question${missing > 1 ? "s" : ""}. Please answer all to get an accurate result.`
      );
      return;
    }

    const nums = new Array(6).fill(0);
    for (const question of QUESTIONS) {
      const val = answers[question.id];
      if (val) {
        val.split(",").forEach((v) => {
          const idx = parseInt(v);
          if (!isNaN(idx)) nums[idx]++;
        });
      }
    }

    let maxScore = -1;
    let winnerIndex = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > maxScore) {
        maxScore = nums[i];
        winnerIndex = i;
      }
    }

    setResult(
      maxScore === 0 || winnerIndex === 0
        ? "No specific recommendation based on your inputs."
        : RESULTS[winnerIndex]
    );
  };

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block border border-indigo-500 text-indigo-400 text-xs tracking-widest uppercase px-3 py-1 rounded mb-4">
            LLM Architecture Tool
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            AI Strategy Selector
          </h1>
          <p className="text-slate-400 text-sm">
            Answer 11 questions to identify the best LLM architecture for your team.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{answeredCount} / {QUESTIONS.length} answered</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {QUESTIONS.map((question) => (
            <div
              key={question.id}
              className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-slate-800">
                <p className="text-sm font-semibold text-slate-200">
                  {question.legend}
                </p>
              </div>
              <div className="p-3 space-y-1">
                {question.options.map((option, idx) => {
                  const isSelected = answers[question.id] === option.value;
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-indigo-600/20 border border-indigo-500/50 text-indigo-300"
                          : "hover:bg-slate-800 border border-transparent text-slate-400"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-indigo-400 bg-indigo-500"
                            : "border-slate-600"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => handleChange(question.id, option.value)}
                        className="sr-only"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm text-center border border-red-500/30 bg-red-500/10 rounded-lg py-3 px-4">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-base rounded-xl transition-all duration-150 tracking-wide mt-2"
          >
            Calculate Recommendation →
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-8 border border-indigo-500/40 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 p-8 text-center animate-pulse-once">
            <p className="text-xs tracking-widest uppercase text-indigo-400 mb-3 font-semibold">
              Your Recommended Strategy
            </p>
            <p className="text-2xl font-bold text-white leading-snug mb-4">
              {result}
            </p>
            <p className="text-slate-400 text-sm">
              This recommendation is based on a weighted analysis of your infrastructure, privacy needs, and workflow complexity.
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setResult(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-6 text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

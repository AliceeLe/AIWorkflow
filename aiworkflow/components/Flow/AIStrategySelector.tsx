import { useState } from "react";
import { RESULTS, QUESTIONS } from "./data.step1";
import { STEP2_CONTENT } from "./data.step2";
import {
  STEP3_TITLE, STEP3_SUBTITLE, STEP3_ACTIONS,
  STEP4_TITLE, STEP4_SUBTITLE, STEP4_ACTIONS,
} from "./data.steps3-4";

export default function AIStrategySelector() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultIndex, setResultIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const handleChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const handleStep1Submit = () => {
    const missing = QUESTIONS.filter((q) => answers[q.id] === undefined).length;
    if (missing > 0) {
      setError(`You missed ${missing} question${missing > 1 ? "s" : ""}. Please answer all to get an accurate result.`);
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
    let winner = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > maxScore) { maxScore = nums[i]; winner = i; }
    }
    setResultIndex(winner);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goTo = (s: 1 | 2 | 3 | 4) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const step2Data = STEP2_CONTENT[resultIndex] ?? STEP2_CONTENT[1];
  const resultLabel = RESULTS[resultIndex] ?? RESULTS[1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 font-mono">
      <div className="max-w-2xl mx-auto">

        {/* ── Global Header ── */}
        <div className="mb-10 text-center">
          <div className="inline-block border border-indigo-500 text-indigo-400 text-xs tracking-widest uppercase px-3 py-1 rounded mb-4">
            LLM Architecture Tool
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            AI Strategy Selector
          </h1>
          <p className="text-slate-400 text-sm">
            A 4-step framework for identifying your ideal LLM architecture.
          </p>
        </div>

        {/* ── Step Indicators ── */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {([1, 2, 3, 4] as const).map((s, i) => {
            const isCompleted = step > s;
            const isActive = step === s;
            return (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => { if (isCompleted) goTo(s); }}
                  disabled={!isCompleted}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200
                    ${isActive ? "border-indigo-400 bg-indigo-600 text-white scale-110" : ""}
                    ${isCompleted ? "border-indigo-600 bg-indigo-900 text-indigo-300 cursor-pointer hover:bg-indigo-800" : ""}
                    ${!isActive && !isCompleted ? "border-slate-700 bg-slate-900 text-slate-600 cursor-default" : ""}
                  `}
                >
                  {isCompleted ? "✓" : s}
                </button>
                {i < 3 && (
                  <div className={`w-12 h-0.5 mx-1 transition-colors duration-300 ${step > s ? "bg-indigo-600" : "bg-slate-800"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════
            STEP 1 — Quiz
        ══════════════════════════════════════ */}
        {step === 1 && (
          <div>
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

            <div className="space-y-4">
              {QUESTIONS.map((question) => (
                <div key={question.id} className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-800">
                    <p className="text-sm font-semibold text-slate-200">{question.legend}</p>
                  </div>
                  <div className="p-3 space-y-1">
                    {question.options.map((option, idx) => {
                      const isSelected = answers[question.id] === option.value;
                      return (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-150
                            ${isSelected
                              ? "bg-indigo-600/20 border border-indigo-500/50 text-indigo-300"
                              : "hover:bg-slate-800 border border-transparent text-slate-400"
                            }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                            ${isSelected ? "border-indigo-400 bg-indigo-500" : "border-slate-600"}`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
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

              {error && (
                <div className="text-red-400 text-sm text-center border border-red-500/30 bg-red-500/10 rounded-lg py-3 px-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleStep1Submit}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold text-base rounded-xl transition-all duration-150 tracking-wide"
              >
                Calculate & Continue →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 2 — Unique result content per outcome
        ══════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <div className="mb-8 border border-indigo-500/40 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 p-6 text-center">
              <p className="text-xs tracking-widest uppercase text-indigo-400 mb-2 font-semibold">Your Recommended Strategy</p>
              <p className="text-xl font-bold text-white leading-snug">{resultLabel}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{step2Data.headline}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{step2Data.summary}</p>
            </div>

            <div className="space-y-4 mb-8">
              {step2Data.blocks.map((block, i) => (
                <div key={i} className="border border-slate-800 rounded-xl bg-slate-900 p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{block.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-200 mb-1">{block.title}</p>
                      {Array.isArray(block.body) ? (
                        <ul className="space-y-1 mt-2">
                          {block.body.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                              <span className="text-indigo-500 mt-0.5 flex-shrink-0">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-400 leading-relaxed">{block.body}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => goTo(1)}
                className="flex-1 py-3 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 rounded-xl transition-all duration-150 text-sm font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => goTo(3)}
                className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-150 text-sm tracking-wide"
              >
                Next: Action Plan →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 3 — Shared action items (part 1)
        ══════════════════════════════════════ */}
        {step === 3 && (
          <div>
            <div className="mb-8">
              <div className="inline-block text-xs tracking-widest uppercase text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded mb-3">
                Action Plan · Part 1
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{STEP3_TITLE}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{STEP3_SUBTITLE}</p>
            </div>

            <div className="space-y-4 mb-8">
              {STEP3_ACTIONS.map((item) => (
                <div key={item.step} className="border border-slate-800 rounded-xl bg-slate-900 p-5 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => goTo(2)}
                className="flex-1 py-3 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 rounded-xl transition-all duration-150 text-sm font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => goTo(4)}
                className="flex-[2] py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all duration-150 text-sm tracking-wide"
              >
                Next: {STEP4_TITLE} →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 4 — Shared action items (part 2)
        ══════════════════════════════════════ */}
        {step === 4 && (
          <div>
            <div className="mb-8">
              <div className="inline-block text-xs tracking-widest uppercase text-amber-400 border border-amber-500/40 px-3 py-1 rounded mb-3">
                Action Plan · Part 2
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{STEP4_TITLE}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{STEP4_SUBTITLE}</p>
            </div>

            <div className="space-y-4 mb-8">
              {STEP4_ACTIONS.map((item) => (
                <div key={item.step} className="border border-slate-800 rounded-xl bg-slate-900 p-5 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200 mb-1">{item.title}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-indigo-500/30 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900 p-6 text-center mb-6">
              <p className="text-2xl mb-2">🎯</p>
              <p className="text-white font-bold mb-1">You're ready to move forward.</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your recommended architecture is{" "}
                <span className="text-indigo-300 font-semibold">{resultLabel}</span>.
                Use the action items above as your implementation checklist.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => goTo(3)}
                className="flex-1 py-3 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 rounded-xl transition-all duration-150 text-sm font-semibold"
              >
                ← Back
              </button>
              <button
                onClick={() => { setAnswers({}); setResultIndex(0); goTo(1); }}
                className="flex-1 py-3 border border-indigo-700 text-indigo-400 hover:bg-indigo-900/30 rounded-xl transition-all duration-150 text-sm font-semibold"
              >
                Start Over ↺
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
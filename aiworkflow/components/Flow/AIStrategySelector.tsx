import { useLayoutEffect, useState } from "react";
import { RESULTS, QUESTIONS } from "./data.step1";
import { STEP2_CONTENT } from "./data.step2";
import {
  STEP3_TITLE, STEP3_SUBTITLE, STEP3_ACTIONS,
  STEP4_TITLE, STEP4_SUBTITLE, STEP4_ACTIONS,
} from "./data.steps3-4";

const extractTemplateFields = (template: string): string[] => {
  const fields: string[] = [];
  for (const match of template.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)) {
    const field = match[1].trim();
    if (field && !fields.includes(field)) fields.push(field);
  }
  return fields;
};

const fillTemplate = (template: string, values: Record<string, string>): string => {
  return template.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (_, rawField: string) => {
    const field = rawField.trim();
    const value = values[field];
    return value && value.trim().length > 0 ? value : `{{${field}}}`;
  });
};

const formatFieldLabel = (field: string): string => {
  const normalized = field.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  return normalized.length > 0 ? normalized : field;
};

const buildPart3PreconditionChecklist = (
  blocks: { title: string; body: string | string[] }[],
  strategyLabel: string,
): string[] => {
  const normalizedStrategyLabel = strategyLabel.replace(/\s*\([^)]*\)/g, "").trim();
  const part2StepHints: string[] = [];
  for (const block of blocks) {
    if (/steps?/i.test(block.title) && Array.isArray(block.body)) {
      for (const step of block.body) {
        if (part2StepHints.length < 3) part2StepHints.push(step);
      }
    }
  }

  let strategyReady = "Execution environment and access controls are ready for safe delivery.";
  if (/self-hosted|open-weight/i.test(strategyLabel)) {
    strategyReady = "Model runtime environment is reachable permissioned and passing health checks.";
  } else if (/premium|api|agent|claude|gpt|gemini/i.test(strategyLabel)) {
    strategyReady = "Provider credentials are scoped monitored and protected by usage and budget limits.";
  } else if (/router|cost-optimized/i.test(strategyLabel)) {
    strategyReady = "Routing and escalation behavior matches expected outcomes in validation samples.";
  } else if (/ide-integrated|copilot|haiku/i.test(strategyLabel)) {
    strategyReady = "IDE usage policy is enforced and onboarding coverage is confirmed for target teams.";
  }

  const part2Readiness =
    part2StepHints.length > 0
      ? `Part 2 setup evidence is available for key actions including ${part2StepHints.join(", ")}.`
      : "Part 2 setup evidence is available for all required onboarding actions.";

  return [
    `Selected strategy ${normalizedStrategyLabel} is locked and communicated to delivery stakeholders.`,
    part2Readiness,
    strategyReady,
    "Context package is sanitized with no secrets or regulated data and aligned to the implementation scope.",
  ];
};

export default function AIStrategySelector() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultIndex, setResultIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [expandedStep3, setExpandedStep3] = useState<Record<string, boolean>>({});
  const [expandedStep4, setExpandedStep4] = useState<Record<string, boolean>>({});
  const [templateValues, setTemplateValues] = useState<Record<string, Record<string, string>>>({});
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Record<string, boolean>>({});
  const [copiedTemplateKey, setCopiedTemplateKey] = useState<string | null>(null);

  const resetScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useLayoutEffect(() => {
    resetScrollTop();
    const rafId = window.requestAnimationFrame(() => resetScrollTop());
    return () => window.cancelAnimationFrame(rafId);
  }, [step]);

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
  };

  const toggleStep3Item = (itemStep: string) => {
    setExpandedStep3((prev) => ({ ...prev, [itemStep]: !prev[itemStep] }));
  };

  const toggleStep4Item = (itemStep: string) => {
    setExpandedStep4((prev) => ({ ...prev, [itemStep]: !prev[itemStep] }));
  };

  const handleTemplateValueChange = (templateKey: string, field: string, value: string) => {
    setTemplateValues((prev) => ({
      ...prev,
      [templateKey]: {
        ...(prev[templateKey] ?? {}),
        [field]: value,
      },
    }));
  };

  const toggleChecklistItem = (checkKey: string) => {
    setCheckedChecklistItems((prev) => ({
      ...prev,
      [checkKey]: !prev[checkKey],
    }));
  };

  const copyPromptTemplate = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplateKey(key);
      setTimeout(() => setCopiedTemplateKey((prev) => (prev === key ? null : prev)), 1500);
    } catch {
      setCopiedTemplateKey(null);
    }
  };

  const goTo = (s: 1 | 2 | 3 | 4) => {
    setStep(s);
  };

  const step2Data = STEP2_CONTENT[resultIndex] ?? STEP2_CONTENT[1];
  const resultLabel = RESULTS[resultIndex] ?? RESULTS[1];
  const part3PreconditionItems = buildPart3PreconditionChecklist(step2Data.blocks, resultLabel);
  const part3PreconditionCheckedCount = part3PreconditionItems.reduce((total, _, idx) => {
    const checkKey = `step3-precondition-${resultIndex}-${idx}`;
    return total + (checkedChecklistItems[checkKey] ? 1 : 0);
  }, 0);
  const part3PreconditionProgress = part3PreconditionItems.length > 0
    ? Math.round((part3PreconditionCheckedCount / part3PreconditionItems.length) * 100)
    : 0;
  const isPart3Ready = part3PreconditionItems.length > 0
    && part3PreconditionCheckedCount === part3PreconditionItems.length;

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

            <div className="mb-6 rounded-xl border border-emerald-500/35 bg-emerald-950/15 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-xs tracking-widest uppercase text-emerald-300 font-semibold">
                  Part3 Precondition
                </p>
                <span className="text-[11px] text-emerald-200">
                  {part3PreconditionCheckedCount}/{part3PreconditionItems.length} done
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                Verify Part 2 readiness with concrete evidence before starting Part 3 execution.
              </p>
              <div className="h-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/20 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500/70 to-emerald-300/80 transition-all duration-300"
                  style={{ width: `${part3PreconditionProgress}%` }}
                />
              </div>
              <ul className="space-y-1.5">
                {part3PreconditionItems.map((checkItem, checkIndex) => {
                  const checkKey = `step3-precondition-${resultIndex}-${checkIndex}`;
                  const checked = !!checkedChecklistItems[checkKey];
                  return (
                    <li key={checkKey} className="text-sm leading-relaxed">
                      <label
                        className={`group flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer transition-all duration-150
                          ${checked
                            ? "border-emerald-500/45 bg-emerald-900/25"
                            : "border-emerald-500/15 bg-slate-900/35 hover:border-emerald-500/30 hover:bg-slate-900/60"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleChecklistItem(checkKey)}
                          className="sr-only"
                        />
                        <span
                          className={`mt-0.5 h-5 w-5 flex items-center justify-center rounded border text-[11px] font-bold transition-colors
                            ${checked
                              ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-200"
                              : "border-emerald-500/35 bg-slate-900 text-transparent group-hover:border-emerald-400/60"
                            }`}
                        >
                          ✓
                        </span>
                        <span className={checked ? "text-slate-400 line-through" : "text-slate-200"}>
                          {checkItem}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {isPart3Ready && (
                <div className="mt-3 rounded-md border border-emerald-500/35 bg-emerald-900/20 px-3 py-2 text-xs text-emerald-100">
                  Part3 preconditions verified. You can start working on Part 3.
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {STEP3_ACTIONS.map((item) => {
                const isExpanded = !!expandedStep3[item.step];
                const templateKey = `step3-${item.step}`;
                const fieldValues = templateValues[templateKey] ?? {};
                const templateFields = item.promptTemplate ? extractTemplateFields(item.promptTemplate) : [];
                const renderedPrompt = item.promptTemplate ? fillTemplate(item.promptTemplate, fieldValues) : "";
                const moreSourcesUrl = item.moreSourcesUrl ?? "https://google.github.io/eng-practices/review/";
                const totalChecklistCount = item.checklistSections
                  ? item.checklistSections.reduce((total, section) => total + section.items.length, 0)
                  : 0;
                const checkedChecklistCount = item.checklistSections
                  ? item.checklistSections.reduce(
                    (total, section, sectionIndex) => total + section.items.reduce((sectionTotal, _, checkIndex) => {
                      const checkKey = `${templateKey}-section-${sectionIndex}-item-${checkIndex}`;
                      return sectionTotal + (checkedChecklistItems[checkKey] ? 1 : 0);
                    }, 0),
                    0,
                  )
                  : 0;
                const checklistProgress = totalChecklistCount > 0
                  ? Math.round((checkedChecklistCount / totalChecklistCount) * 100)
                  : 0;
                const summaryCardCount = [item.pros, item.cons, item.bestFor, item.guidingQuestions]
                  .filter((group) => group && group.length > 0)
                  .length;
                return (
                  <div key={item.step} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleStep3Item(item.step)}
                      aria-expanded={isExpanded}
                      className={`w-full rounded-xl p-5 text-left transition-all duration-200 border
                        ${isExpanded
                          ? "border-emerald-500/50 bg-emerald-950/20"
                          : "border-slate-800 bg-slate-900 hover:border-slate-700"
                        }`}
                    >
                      <div className="flex gap-5">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center">
                            <span className="text-emerald-400 font-bold text-sm">{item.step}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <p className="text-sm font-bold text-slate-200">{item.title}</p>
                            <span className="text-xs text-emerald-300 font-semibold tracking-wide">
                              {isExpanded ? "Hide details" : "Show details"}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-4">
                        <p className="text-xs tracking-wider uppercase text-emerald-300 mb-2">
                          Expanded Notes
                        </p>

                        {item.warningNote && (
                          <div className="mt-4 rounded-lg border border-red-500/40 bg-red-950/20 p-3">
                            <p className="text-xs text-red-300 tracking-wide uppercase mb-2">Warning</p>
                            <p className="text-sm text-red-100 font-semibold leading-relaxed">{item.warningNote}</p>
                            {item.warningBody && item.warningBody.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {item.warningBody.map((line, idx) => (
                                  <p key={idx} className="text-sm text-red-100/90 leading-relaxed">{line}</p>
                                ))}
                              </div>
                            )}
                            {item.warningRisks && item.warningRisks.length > 0 && (
                              <div className="mt-3">
                                <p className="text-xs text-red-200/90 mb-2">Failure to validate may result in:</p>
                                <ul className="space-y-1.5">
                                  {item.warningRisks.map((risk, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-red-100/90 leading-relaxed">
                                      <span className="text-red-300 mt-0.5">•</span>
                                      <span>{risk}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {item.details && item.details.length > 0 && (
                          <div className="mt-4 rounded-lg border border-yellow-400/45 bg-gradient-to-br from-yellow-500/15 to-amber-500/10 p-3 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
                            <p className="text-xs tracking-wide uppercase text-yellow-200 font-semibold mb-2">
                              Core Principles
                            </p>
                            <ul className="space-y-2">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-yellow-50/95 leading-relaxed">
                                  <span className="text-yellow-300 mt-0.5">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.procedureSteps && item.procedureSteps.length > 0 && (
                          <div className="mt-4 rounded-lg border border-emerald-500/25 bg-slate-950/50 p-3">
                            <p className="text-xs text-emerald-300 tracking-wide uppercase mb-3">Procedural Steps</p>
                            <div className="space-y-3">
                              {item.procedureSteps.map((step, idx) => (
                                <div key={idx} className="rounded-md border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 to-slate-900/60 p-3">
                                  <p className="text-sm text-emerald-200 font-semibold mb-2">{step.title}</p>
                                  <ul className="space-y-1.5">
                                    {step.items.map((line, lineIdx) => (
                                      <li key={lineIdx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                        <span className="text-emerald-400 mt-0.5">•</span>
                                        <span>{line}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {(item.pros || item.cons || item.bestFor || item.guidingQuestions) && (
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            {item.pros && item.pros.length > 0 && (
                              <div className={`rounded-lg border border-emerald-500/25 bg-emerald-950/15 p-3 ${summaryCardCount === 1 ? "md:col-span-2" : ""}`}>
                                <p className="text-xs text-emerald-300 tracking-wide uppercase mb-2">Pros</p>
                                <ul className="space-y-1.5">
                                  {item.pros.map((line, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                      <span className="text-emerald-400 mt-0.5">+</span>
                                      <span>{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {item.cons && item.cons.length > 0 && (
                              <div className={`rounded-lg border border-amber-500/25 bg-amber-950/15 p-3 ${summaryCardCount === 1 ? "md:col-span-2" : ""}`}>
                                <p className="text-xs text-amber-300 tracking-wide uppercase mb-2">Cons</p>
                                <ul className="space-y-1.5">
                                  {item.cons.map((line, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                      <span className="text-amber-300 mt-0.5">-</span>
                                      <span>{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {item.bestFor && item.bestFor.length > 0 && (
                              <div className={`rounded-lg border border-indigo-500/25 bg-indigo-950/15 p-3 ${summaryCardCount === 1 ? "md:col-span-2" : ""}`}>
                                <p className="text-xs text-indigo-300 tracking-wide uppercase mb-2">Best For</p>
                                <ul className="space-y-1.5">
                                  {item.bestFor.map((line, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                      <span className="text-indigo-300 mt-0.5">•</span>
                                      <span>{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {item.guidingQuestions && item.guidingQuestions.length > 0 && (
                              <div className={`rounded-lg border border-sky-500/25 bg-sky-950/15 p-3 ${summaryCardCount === 1 ? "md:col-span-2" : ""}`}>
                                <p className="text-xs text-sky-300 tracking-wide uppercase mb-2">Guiding Questions</p>
                                <ul className="space-y-1.5">
                                  {item.guidingQuestions.map((line, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                      <span className="text-sky-300 mt-0.5">?</span>
                                      <span>{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {item.checklistSections && item.checklistSections.length > 0 && (
                          <div className="mt-4 rounded-lg border border-emerald-500/25 bg-slate-950/50 p-3">
                            <div className="mb-3">
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <p className="text-xs text-emerald-300 tracking-wide uppercase">
                                  AI-Generated Code Review Checklist
                                </p>
                                <span className="text-[11px] text-emerald-200">
                                  {checkedChecklistCount}/{totalChecklistCount} done
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/20 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500/70 to-emerald-300/80 transition-all duration-300"
                                  style={{ width: `${checklistProgress}%` }}
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              {item.checklistSections.map((section, sectionIndex) => {
                                const sectionCheckedCount = section.items.reduce((sectionTotal, _, checkIndex) => {
                                  const checkKey = `${templateKey}-section-${sectionIndex}-item-${checkIndex}`;
                                  return sectionTotal + (checkedChecklistItems[checkKey] ? 1 : 0);
                                }, 0);
                                return (
                                <div key={sectionIndex} className="rounded-md border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 to-slate-900/60 p-3">
                                  <div className="flex items-center justify-between gap-3 mb-2">
                                    <p className="text-sm text-emerald-200 font-semibold">{section.title}</p>
                                    <span className="text-[11px] text-emerald-200/80">
                                      {sectionCheckedCount}/{section.items.length}
                                    </span>
                                  </div>
                                  <ul className="space-y-1.5">
                                    {section.items.map((checkItem, checkIndex) => {
                                      const checkKey = `${templateKey}-section-${sectionIndex}-item-${checkIndex}`;
                                      const checked = !!checkedChecklistItems[checkKey];
                                      return (
                                        <li key={checkIndex} className="text-sm leading-relaxed">
                                          <label
                                            className={`group flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer transition-all duration-150
                                              ${checked
                                                ? "border-emerald-500/45 bg-emerald-900/25"
                                                : "border-emerald-500/15 bg-slate-900/35 hover:border-emerald-500/30 hover:bg-slate-900/60"
                                              }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => toggleChecklistItem(checkKey)}
                                              className="sr-only"
                                            />
                                            <span
                                              className={`mt-0.5 h-5 w-5 flex items-center justify-center rounded border text-[11px] font-bold transition-colors
                                                ${checked
                                                  ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-200"
                                                  : "border-emerald-500/35 bg-slate-900 text-transparent group-hover:border-emerald-400/60"
                                                }`}
                                            >
                                              ✓
                                            </span>
                                            <span className={checked ? "text-slate-400 line-through" : "text-slate-200"}>
                                              {checkItem}
                                            </span>
                                          </label>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {item.resources && item.resources.length > 0 && (
                          <div className="mt-4 rounded-lg border border-emerald-500/25 bg-slate-950/50 p-3">
                            <p className="text-xs text-emerald-300 tracking-wide uppercase mb-2">Resources</p>
                            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                              Use the sources below for deeper code review practices to help ensure code quality.
                              For a quick start, check{" "}
                              <a
                                href={moreSourcesUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-200 hover:text-emerald-100 underline underline-offset-2 break-all"
                              >
                                this guide
                              </a>
                              .
                            </p>
                            <ul className="space-y-2">
                              {item.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="text-sm leading-relaxed">
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-emerald-200 hover:text-emerald-100 underline underline-offset-2 break-words"
                                  >
                                    {resource.label}
                                  </a>
                                  <p className="text-xs text-slate-400 break-all">{resource.url}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.promptTemplate && (
                          <div className="mt-4 border border-emerald-500/30 rounded-lg bg-slate-950/80">
                            <div className="flex items-center justify-between border-b border-emerald-500/20 px-3 py-2">
                              <p className="text-xs text-emerald-300 tracking-wide uppercase">Prompt Template</p>
                              <button
                                type="button"
                                onClick={() => copyPromptTemplate(templateKey, renderedPrompt)}
                                className="text-xs px-2 py-1 rounded border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/30 transition-colors"
                              >
                                {copiedTemplateKey === templateKey ? "Copied" : "Copy Filled Prompt"}
                              </button>
                            </div>
                            <div className="p-3 border-b border-emerald-500/20">
                              <p className="text-[11px] text-slate-400 mb-2">Fill in the blanks:</p>
                              <div className="grid gap-2 sm:grid-cols-2">
                                {templateFields.map((field) => (
                                  <label key={field} className="text-[11px] text-slate-300">
                                    <span className="block mb-1">{formatFieldLabel(field)}</span>
                                    <input
                                      type="text"
                                      value={fieldValues[field] ?? ""}
                                      onChange={(e) => handleTemplateValueChange(templateKey, field, e.target.value)}
                                      placeholder={`Fill ${field}`}
                                      className="w-full rounded border border-emerald-500/30 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                                    />
                                  </label>
                                ))}
                              </div>
                            </div>
                            <pre className="ui-scrollbar ui-scrollbar-emerald max-h-[24rem] overflow-auto p-3 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                              {renderedPrompt}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
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
              {STEP4_ACTIONS.map((item) => {
                const isExpanded = !!expandedStep4[item.step];
                const templateKey = `step4-${item.step}`;
                const fieldValues = templateValues[templateKey] ?? {};
                const templateFields = item.promptTemplate ? extractTemplateFields(item.promptTemplate) : [];
                const renderedPrompt = item.promptTemplate ? fillTemplate(item.promptTemplate, fieldValues) : "";
                const totalChecklistCount = item.checklistSections
                  ? item.checklistSections.reduce((total, section) => total + section.items.length, 0)
                  : 0;
                const checkedChecklistCount = item.checklistSections
                  ? item.checklistSections.reduce(
                    (total, section, sectionIndex) => total + section.items.reduce((sectionTotal, _, checkIndex) => {
                      const checkKey = `${templateKey}-section-${sectionIndex}-item-${checkIndex}`;
                      return sectionTotal + (checkedChecklistItems[checkKey] ? 1 : 0);
                    }, 0),
                    0,
                  )
                  : 0;
                const checklistProgress = totalChecklistCount > 0
                  ? Math.round((checkedChecklistCount / totalChecklistCount) * 100)
                  : 0;
                return (
                  <div key={item.step} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleStep4Item(item.step)}
                      aria-expanded={isExpanded}
                      className={`w-full rounded-xl p-5 text-left transition-all duration-200 border
                        ${isExpanded
                          ? "border-amber-500/50 bg-amber-950/20"
                          : "border-slate-800 bg-slate-900 hover:border-slate-700"
                        }`}
                    >
                      <div className="flex gap-5">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center">
                            <span className="text-amber-400 font-bold text-sm">{item.step}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <p className="text-sm font-bold text-slate-200">{item.title}</p>
                            <span className="text-xs text-amber-300 font-semibold tracking-wide">
                              {isExpanded ? "Hide details" : "Show details"}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="overflow-hidden rounded-xl border border-amber-500/30 bg-amber-950/10 p-4">
                        <p className="text-xs tracking-wider uppercase text-amber-300 mb-2">
                          Expanded Notes
                        </p>
                        {item.details && item.details.length > 0 && (
                          (item.step === "01" || item.step === "02" || item.step === "03" || item.step === "04") ? (
                            <div className="rounded-lg border border-yellow-400/45 bg-gradient-to-br from-yellow-500/15 to-amber-500/10 p-3 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
                              <p className="text-xs tracking-wide uppercase text-yellow-200 font-semibold mb-2">
                                Core Principle
                              </p>
                              <ul className="space-y-2">
                                {item.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-yellow-50/95 leading-relaxed">
                                    <span className="text-yellow-300 mt-0.5">•</span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <ul className="space-y-2">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                                  <span className="text-amber-400 mt-0.5">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )
                        )}

                        {item.procedureSteps && item.procedureSteps.length > 0 && (
                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="contents">
                              {item.procedureSteps.map((step, idx) => (
                                <div
                                  key={idx}
                                  className={`h-full rounded-md border p-3 ${
                                    idx % 2 === 0
                                      ? "border-cyan-500/25 bg-gradient-to-br from-cyan-950/20 to-slate-900/60"
                                      : "border-indigo-500/25 bg-gradient-to-br from-indigo-950/20 to-slate-900/60"
                                  }`}
                                >
                                  <p
                                    className={`text-sm font-semibold mb-2 ${
                                      idx % 2 === 0 ? "text-cyan-200" : "text-indigo-200"
                                    }`}
                                  >
                                    {step.title}
                                  </p>
                                  <ul className="space-y-1.5">
                                    {step.items.map((line, lineIdx) => (
                                      <li key={lineIdx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                                        <span className={idx % 2 === 0 ? "text-cyan-300 mt-0.5" : "text-indigo-300 mt-0.5"}>•</span>
                                        <span>{line}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.checklistSections && item.checklistSections.length > 0 && (
                          <div className="mt-4 rounded-lg border border-amber-500/25 bg-slate-950/50 p-3">
                            <div className="mb-3">
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <p className="text-xs text-amber-300 tracking-wide uppercase">
                                  Metrics Checklist
                                </p>
                                <span className="text-[11px] text-amber-200">
                                  {checkedChecklistCount}/{totalChecklistCount} done
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-amber-950/70 border border-amber-500/20 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-500/70 to-amber-300/80 transition-all duration-300"
                                  style={{ width: `${checklistProgress}%` }}
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              {item.checklistSections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="rounded-md border border-amber-500/25 bg-gradient-to-br from-amber-950/20 to-slate-900/60 p-3">
                                  <p className="text-sm text-amber-200 font-semibold mb-2">{section.title}</p>
                                  <ul className="space-y-1.5">
                                    {section.items.map((checkItem, checkIndex) => {
                                      const checkKey = `${templateKey}-section-${sectionIndex}-item-${checkIndex}`;
                                      const checked = !!checkedChecklistItems[checkKey];
                                      return (
                                        <li key={checkIndex} className="text-sm leading-relaxed">
                                          <label
                                            className={`group flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer transition-all duration-150
                                              ${checked
                                                ? "border-amber-500/45 bg-amber-900/25"
                                                : "border-amber-500/15 bg-slate-900/35 hover:border-amber-500/30 hover:bg-slate-900/60"
                                              }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={checked}
                                              onChange={() => toggleChecklistItem(checkKey)}
                                              className="sr-only"
                                            />
                                            <span
                                              className={`mt-0.5 h-5 w-5 flex items-center justify-center rounded border text-[11px] font-bold transition-colors
                                                ${checked
                                                  ? "border-amber-300/80 bg-amber-400/20 text-amber-200"
                                                  : "border-amber-500/35 bg-slate-900 text-transparent group-hover:border-amber-400/60"
                                                }`}
                                            >
                                              ✓
                                            </span>
                                            <span className={checked ? "text-slate-400 line-through" : "text-slate-200"}>
                                              {checkItem}
                                            </span>
                                          </label>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.promptTemplate && (
                          <div className="mt-4 border border-amber-500/30 rounded-lg bg-slate-950/80">
                            <div className="flex items-center justify-between border-b border-amber-500/20 px-3 py-2">
                              <p className="text-xs text-amber-300 tracking-wide uppercase">Prompt Template</p>
                              <button
                                type="button"
                                onClick={() => copyPromptTemplate(templateKey, renderedPrompt)}
                                className="text-xs px-2 py-1 rounded border border-amber-500/40 text-amber-200 hover:bg-amber-900/30 transition-colors"
                              >
                                {copiedTemplateKey === templateKey ? "Copied" : "Copy Filled Prompt"}
                              </button>
                            </div>
                            <div className="p-3 border-b border-amber-500/20">
                              <p className="text-[11px] text-slate-400 mb-2">Fill in the blanks:</p>
                              <div className="grid gap-2 sm:grid-cols-2">
                                {templateFields.map((field) => (
                                  <label key={field} className="text-[11px] text-slate-300">
                                    <span className="block mb-1">{formatFieldLabel(field)}</span>
                                    <input
                                      type="text"
                                      value={fieldValues[field] ?? ""}
                                      onChange={(e) => handleTemplateValueChange(templateKey, field, e.target.value)}
                                      placeholder={`Fill ${field}`}
                                      className="w-full rounded border border-amber-500/30 bg-slate-900 px-2 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                                    />
                                  </label>
                                ))}
                              </div>
                            </div>
                            <pre className="ui-scrollbar ui-scrollbar-amber max-h-[24rem] overflow-auto p-3 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                              {renderedPrompt}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border border-indigo-500/30 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-900 p-6 text-center mb-6">
              <p className="text-2xl mb-2">🎯</p>
              <p className="text-white font-bold mb-1">You&apos;re ready to move forward.</p>
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

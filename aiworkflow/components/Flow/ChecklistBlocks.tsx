import { ChecklistSection } from "./types";

export interface ChecklistTheme {
  containerClass: string;
  titleClass: string;
  countClass: string;
  descriptionClass: string;
  progressTrackClass: string;
  progressFillClass: string;
  itemCheckedClass: string;
  itemUncheckedClass: string;
  checkboxCheckedClass: string;
  checkboxUncheckedClass: string;
  textCheckedClass: string;
  textUncheckedClass: string;
  successClass: string;
  sectionCardClass: string;
  sectionTitleClass: string;
  sectionCountClass: string;
}

export const CHECKLIST_THEMES: {
  yellow: ChecklistTheme;
  emerald: ChecklistTheme;
  amber: ChecklistTheme;
} = {
  yellow: {
    containerClass:
      "rounded-xl border border-yellow-400/45 bg-gradient-to-br from-yellow-500/15 to-amber-500/10 p-4 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]",
    titleClass: "text-yellow-200",
    countClass: "text-yellow-100",
    descriptionClass: "text-yellow-50/90",
    progressTrackClass: "bg-amber-950/45 border border-yellow-400/25",
    progressFillClass: "bg-gradient-to-r from-yellow-400/80 to-amber-300/85",
    itemCheckedClass: "border-yellow-400/55 bg-amber-500/10",
    itemUncheckedClass: "border-yellow-400/30 bg-slate-900/35 hover:border-yellow-300/45 hover:bg-slate-900/60",
    checkboxCheckedClass: "border-yellow-300/90 bg-yellow-300/15 text-yellow-100",
    checkboxUncheckedClass: "border-yellow-400/40 bg-slate-900 text-transparent group-hover:border-yellow-300/70",
    textCheckedClass: "text-yellow-100/55 line-through",
    textUncheckedClass: "text-yellow-50/95",
    successClass: "rounded-md border border-yellow-300/55 bg-amber-500/15 px-3 py-2 text-xs text-yellow-100",
    sectionCardClass: "rounded-md border border-yellow-400/25 bg-gradient-to-br from-amber-950/20 to-slate-900/60 p-3",
    sectionTitleClass: "text-sm text-yellow-100 font-semibold",
    sectionCountClass: "text-[11px] text-yellow-100/80",
  },
  emerald: {
    containerClass: "rounded-xl border border-emerald-500/35 bg-emerald-950/15 p-4",
    titleClass: "text-emerald-300",
    countClass: "text-emerald-200",
    descriptionClass: "text-slate-300",
    progressTrackClass: "bg-emerald-950/70 border border-emerald-500/20",
    progressFillClass: "bg-gradient-to-r from-emerald-500/70 to-emerald-300/80",
    itemCheckedClass: "border-emerald-500/45 bg-emerald-900/25",
    itemUncheckedClass: "border-emerald-500/15 bg-slate-900/35 hover:border-emerald-500/30 hover:bg-slate-900/60",
    checkboxCheckedClass: "border-emerald-300/80 bg-emerald-400/20 text-emerald-200",
    checkboxUncheckedClass: "border-emerald-500/35 bg-slate-900 text-transparent group-hover:border-emerald-400/60",
    textCheckedClass: "text-slate-400 line-through",
    textUncheckedClass: "text-slate-200",
    successClass: "rounded-md border border-emerald-500/35 bg-emerald-900/20 px-3 py-2 text-xs text-emerald-100",
    sectionCardClass: "rounded-md border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 to-slate-900/60 p-3",
    sectionTitleClass: "text-sm text-emerald-200 font-semibold",
    sectionCountClass: "text-[11px] text-emerald-200/80",
  },
  amber: {
    containerClass: "rounded-lg border border-amber-500/25 bg-slate-950/50 p-3",
    titleClass: "text-amber-300",
    countClass: "text-amber-200",
    descriptionClass: "text-slate-300",
    progressTrackClass: "bg-amber-950/70 border border-amber-500/20",
    progressFillClass: "bg-gradient-to-r from-amber-500/70 to-amber-300/80",
    itemCheckedClass: "border-amber-500/45 bg-amber-900/25",
    itemUncheckedClass: "border-amber-500/15 bg-slate-900/35 hover:border-amber-500/30 hover:bg-slate-900/60",
    checkboxCheckedClass: "border-amber-300/80 bg-amber-400/20 text-amber-200",
    checkboxUncheckedClass: "border-amber-500/35 bg-slate-900 text-transparent group-hover:border-amber-400/60",
    textCheckedClass: "text-slate-400 line-through",
    textUncheckedClass: "text-slate-200",
    successClass: "rounded-md border border-amber-500/35 bg-amber-900/20 px-3 py-2 text-xs text-amber-100",
    sectionCardClass: "rounded-md border border-amber-500/25 bg-gradient-to-br from-amber-950/20 to-slate-900/60 p-3",
    sectionTitleClass: "text-sm text-amber-200 font-semibold",
    sectionCountClass: "text-[11px] text-amber-200/80",
  },
};

export interface FlatChecklistItem {
  key: string;
  label: string;
}

interface FlatChecklistCardProps {
  title: string;
  description?: string;
  items: FlatChecklistItem[];
  checkedItems: Record<string, boolean>;
  onToggle: (checkKey: string) => void;
  theme: ChecklistTheme;
  doneMessage?: string;
  className?: string;
}

interface SectionedChecklistCardProps {
  title: string;
  sections: ChecklistSection[];
  checklistKeyPrefix: string;
  checkedItems: Record<string, boolean>;
  onToggle: (checkKey: string) => void;
  theme: ChecklistTheme;
  className?: string;
  showSectionProgress?: boolean;
}

const computeProgress = (checkedCount: number, totalCount: number): number => {
  if (totalCount === 0) return 0;
  return Math.round((checkedCount / totalCount) * 100);
};

export function FlatChecklistCard({
  title,
  description,
  items,
  checkedItems,
  onToggle,
  theme,
  doneMessage,
  className,
}: FlatChecklistCardProps) {
  const checkedCount = items.reduce((total, item) => total + (checkedItems[item.key] ? 1 : 0), 0);
  const progress = computeProgress(checkedCount, items.length);
  const isDone = items.length > 0 && checkedCount === items.length;

  return (
    <div className={`${theme.containerClass}${className ? ` ${className}` : ""}`}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className={`text-xs tracking-widest uppercase font-semibold ${theme.titleClass}`}>{title}</p>
        <span className={`text-[11px] ${theme.countClass}`}>
          {checkedCount}/{items.length} done
        </span>
      </div>
      {description && (
        <p className={`text-xs mb-3 leading-relaxed ${theme.descriptionClass}`}>{description}</p>
      )}
      <div className={`h-1.5 rounded-full overflow-hidden mb-3 ${theme.progressTrackClass}`}>
        <div
          className={`h-full transition-all duration-300 ${theme.progressFillClass}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const checked = !!checkedItems[item.key];
          return (
            <li key={item.key} className="text-sm leading-relaxed">
              <label
                className={`group flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer transition-all duration-150 ${
                  checked ? theme.itemCheckedClass : theme.itemUncheckedClass
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.key)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 h-5 w-5 min-h-5 min-w-5 shrink-0 flex items-center justify-center rounded border text-[11px] font-bold transition-colors ${
                    checked ? theme.checkboxCheckedClass : theme.checkboxUncheckedClass
                  }`}
                >
                  ✓
                </span>
                <span className={checked ? theme.textCheckedClass : theme.textUncheckedClass}>
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {isDone && doneMessage && <div className={`mt-3 ${theme.successClass}`}>{doneMessage}</div>}
    </div>
  );
}

export function SectionedChecklistCard({
  title,
  sections,
  checklistKeyPrefix,
  checkedItems,
  onToggle,
  theme,
  className,
  showSectionProgress = false,
}: SectionedChecklistCardProps) {
  const totalCount = sections.reduce((total, section) => total + section.items.length, 0);
  const checkedCount = sections.reduce(
    (total, section, sectionIndex) => total + section.items.reduce((sectionTotal, _, checkIndex) => {
      const checkKey = `${checklistKeyPrefix}-section-${sectionIndex}-item-${checkIndex}`;
      return sectionTotal + (checkedItems[checkKey] ? 1 : 0);
    }, 0),
    0,
  );
  const progress = computeProgress(checkedCount, totalCount);

  return (
    <div className={`${theme.containerClass}${className ? ` ${className}` : ""}`}>
      <div className="mb-3">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className={`text-xs tracking-wide uppercase ${theme.titleClass}`}>{title}</p>
          <span className={`text-[11px] ${theme.countClass}`}>
            {checkedCount}/{totalCount} done
          </span>
        </div>
        <div className={`h-1.5 rounded-full overflow-hidden ${theme.progressTrackClass}`}>
          <div
            className={`h-full transition-all duration-300 ${theme.progressFillClass}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {sections.map((section, sectionIndex) => {
          const sectionCheckedCount = section.items.reduce((sectionTotal, _, checkIndex) => {
            const checkKey = `${checklistKeyPrefix}-section-${sectionIndex}-item-${checkIndex}`;
            return sectionTotal + (checkedItems[checkKey] ? 1 : 0);
          }, 0);
          return (
            <div key={sectionIndex} className={theme.sectionCardClass}>
              {showSectionProgress ? (
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className={theme.sectionTitleClass}>{section.title}</p>
                  <span className={theme.sectionCountClass}>
                    {sectionCheckedCount}/{section.items.length}
                  </span>
                </div>
              ) : (
                <p className={`${theme.sectionTitleClass} mb-2`}>{section.title}</p>
              )}
              <ul className="space-y-1.5">
                {section.items.map((checkItem, checkIndex) => {
                  const checkKey = `${checklistKeyPrefix}-section-${sectionIndex}-item-${checkIndex}`;
                  const checked = !!checkedItems[checkKey];
                  return (
                    <li key={checkKey} className="text-sm leading-relaxed">
                      <label
                        className={`group flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer transition-all duration-150 ${
                          checked ? theme.itemCheckedClass : theme.itemUncheckedClass
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(checkKey)}
                          className="sr-only"
                        />
                        <span
                          className={`mt-0.5 h-5 w-5 min-h-5 min-w-5 shrink-0 flex items-center justify-center rounded border text-[11px] font-bold transition-colors ${
                            checked ? theme.checkboxCheckedClass : theme.checkboxUncheckedClass
                          }`}
                        >
                          ✓
                        </span>
                        <span className={checked ? theme.textCheckedClass : theme.textUncheckedClass}>
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
  );
}

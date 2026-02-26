export interface Question {
  id: number;
  legend: string;
  options: { label: string; value: string }[];
}

export interface InfoBlock {
  icon: string;
  title: string;
  body: string | string[];
}

export interface Step2Content {
  headline: string;
  summary: string;
  blocks: InfoBlock[];
}

export interface ChecklistSection {
  title: string;
  items: string[];
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface ProcedureStep {
  title: string;
  items: string[];
}

export interface ActionItem {
  step: string;
  title: string;
  description: string;
  details?: string[];
  warningNote?: string;
  warningBody?: string[];
  warningRisks?: string[];
  procedureSteps?: ProcedureStep[];
  pros?: string[];
  cons?: string[];
  bestFor?: string[];
  guidingQuestions?: string[];
  promptTemplate?: string;
  checklistSections?: ChecklistSection[];
  resources?: ResourceLink[];
  moreSourcesUrl?: string;
}

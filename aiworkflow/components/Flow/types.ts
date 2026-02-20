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

export interface ActionItem {
  step: string;
  title: string;
  description: string;
}

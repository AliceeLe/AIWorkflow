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
    details: [
      "Do: Start with architecture docs, shared libraries, and the exact module you want to change.",
      "Do: Include concise context notes (goal, constraints, expected output, coding standards).",
      "Do not: Dump the entire repository at once if only a small scope is needed.",
      "Do not: Upload unrelated assets or generated files that add noise and waste tokens.",
    ],
    warningNote:
      "Never upload secrets, personal data, production credentials, or private keys into AI context inputs.",
    warningBody: [
      "Sanitize files before upload and remove any sensitive values from config, logs, environment files, and test fixtures.",
    ],
    warningRisks: [
      "Sensitive data exposure",
      "Compliance/privacy violations",
      "Security incidents caused by leaked credentials",
      "Unnecessary token usage and degraded output quality",
    ],
    procedureSteps: [
      {
        title: "1) Define scope before upload",
        items: [
          "Write a one-sentence task goal.",
          "List what is in scope vs out of scope.",
          "Identify exact target files and modules.",
        ],
      },
      {
        title: "2) Upload architecture and interface context",
        items: [
          "Include architecture overview docs and API/interface contracts.",
          "Add dependency diagrams or key service boundaries if available.",
          "Provide critical domain rules the model must not violate.",
        ],
      },
      {
        title: "3) Upload implementation files in priority order",
        items: [
          "Prioritize business logic files first.",
          "Then include shared utilities and related data models.",
          "Add only directly relevant tests and fixtures.",
        ],
      },
      {
        title: "4) Add operation constraints",
        items: [
          "Specify coding conventions and lint/test requirements.",
          "State performance, security, and reliability constraints.",
          "Describe expected output format and acceptance criteria.",
        ],
      },
      {
        title: "5) Sanitize and verify",
        items: [
          "Redact secrets and PII before submission.",
          "Remove unrelated files and generated artifacts.",
          "Ensure uploaded context is sufficient but minimal.",
        ],
      },
    ],
    checklistSections: [
      {
        title: "Upload Readiness Checklist",
        items: [
          "Task goal is clearly defined.",
          "In-scope and out-of-scope boundaries are explicit.",
          "Only relevant files are included.",
          "Architecture/interface context is provided.",
          "Acceptance criteria are provided.",
        ],
      },
      {
        title: "Security and Privacy Checklist",
        items: [
          "No secrets/tokens/passwords in uploaded files.",
          "No personal or regulated data is exposed.",
          "No production credentials or private keys are included.",
          "Config and logs are sanitized.",
        ],
      },
      {
        title: "Quality Checklist",
        items: [
          "The model can understand dependencies from provided context.",
          "Coding style and constraints are clearly documented.",
          "Related test files are included when needed.",
          "Noise files (build output, binaries, large unrelated docs) are excluded.",
        ],
      },
    ],
    guidingQuestions: [
      "Can the model complete the task using only these files?",
      "Did I provide enough context without overloading tokens?",
      "Are all critical constraints explicitly written?",
      "Is any uploaded content risky from a security or compliance perspective?",
    ],
  },
  {
    step: "02",
    title: "Prompt engineering",
    description:
      "Apply prompt engineering techniques to the input to improve the quality of the generated code.",
    details: [
      "Define the role, objective, scope boundaries, and expected output format in every prompt.",
      "Include acceptance criteria (tests, lint rules, edge cases) so results are verifiable.",
      "Iterate in small turns: generate, review, and refine instead of requesting a full solution in one shot.",
    ],
    promptTemplate: `You are an expert {{role}} working on {{project_or_product}}.

Goal:
- Complete {{task_goal}}.

Context:
- Business background: {{business_context}}
- Current state/problem: {{current_state_or_issue}}
- Target users: {{target_users}}
- Relevant files/modules: {{relevant_files_or_modules}}
- Tech stack: {{tech_stack}}

Requirements:
1) {{requirement_1}}
2) {{requirement_2}}
3) {{requirement_3}}

Constraints:
- Must follow: {{coding_standards_or_policies}}
- Must not change: {{out_of_scope_items}}
- Deadline/priority: {{deadline_or_priority}}

Quality bar:
- Include edge cases for: {{edge_cases}}
- Security/privacy considerations: {{security_requirements}}
- Performance expectations: {{performance_requirements}}
- Testing requirements: {{test_requirements}}

Expected output format:
1) Brief implementation plan
2) Proposed code changes (with clear file-level breakdown)
3) Validation checklist (tests/lint/manual checks)
4) Risks and fallback plan

If any required information is missing, ask focused clarification questions before generating the final solution.`,
  },
  {
    step: "03",
    title: "Code review",
    description:
      "Review the generated code thoroughly, utilizing fundamental knowledge of the programming language to ensure accuracy.",
    details: [
      "Review for correctness, security, and maintainability before merging into shared branches.",
      "Check dependency changes, error handling paths, and any assumptions the model made implicitly.",
      "Use peer review plus automated checks to reduce hidden regressions.",
    ],
    checklistSections: [
      {
        title: "1) Basic Correctness Checks",
        items: [
          "Core logic is correct.",
          "Inputs and outputs match expected specs.",
          "Boundary conditions are explicitly handled.",
          "Fail-safe behavior exists for exceptional paths.",
          "No uninitialized variables are used.",
        ],
      },
      {
        title: "2) Security Checks",
        items: [
          "No SQL/NoSQL injection risks.",
          "No plaintext sensitive data (secrets/tokens/passwords).",
          "External dependencies/APIs are called safely.",
          "User input is validated/sanitized.",
          "Sensitive operations enforce authorization and verification.",
          "Secure random generation is used when required.",
          "XSS/CSRF defenses are applied for frontend scenarios.",
        ],
      },
      {
        title: "3) Maintainability",
        items: [
          "Naming is clear and consistent.",
          "Team coding standards are followed.",
          "No unnecessary duplication.",
          "Important logic has concise explanation where needed.",
          "TODO/FIXME items are tracked and intentional.",
          "Code layering and separation are readable.",
        ],
      },
      {
        title: "4) Edge Cases and Error Paths",
        items: [
          "Zero/null/undefined cases are handled.",
          "Missing file/permission issues are handled.",
          "Network failure/timeout paths are handled.",
          "No uncaught exceptions remain.",
        ],
      },
      {
        title: "5) Dependencies and Third-Party Libraries",
        items: [
          "Dependency versions are explicitly recorded.",
          "Outdated or vulnerable libraries are avoided.",
          "License risks are checked for dependencies.",
          "No unnecessary dependencies are introduced.",
        ],
      },
      {
        title: "6) Performance and Resource Usage",
        items: [
          "Avoids unnecessary loops or high complexity paths.",
          "No obvious memory leak or large-object copy risk.",
          "Caching strategy is reasonable.",
          "Avoids blocking threads/main event loop.",
        ],
      },
      {
        title: "7) Concurrency and Thread Safety",
        items: [
          "No race conditions in shared-state paths.",
          "Locking/atomic usage is correct when required.",
          "Deadlock risk is assessed.",
        ],
      },
      {
        title: "8) Test Coverage",
        items: [
          "Unit tests are included/updated.",
          "Integration tests are included where needed.",
          "Error/exception paths are tested.",
          "Edge cases are covered.",
        ],
      },
      {
        title: "9) Logging and Observability",
        items: [
          "Sufficient debug and operational logs exist.",
          "Logs do not expose sensitive data.",
          "Logs contain traceable context.",
          "Structured logging is used where applicable (JSON/Trace ID).",
        ],
      },
      {
        title: "10) Build and Static Analysis",
        items: [
          "Static analysis tools pass.",
          "Warnings from static analysis are resolved or justified.",
          "Type checks pass (TypeScript/type hints).",
        ],
      },
      {
        title: "11) Standards Consistency",
        items: [
          "Matches team linter/formatting standards.",
          "Follows existing commit/branch strategy.",
          "Aligns with project architecture conventions.",
        ],
      },
    ],
    resources: [
      {
        label: "Google Engineering Practices — Code Review Guide",
        url: "https://google.github.io/eng-practices/review/",
      },
      {
        label: "Mozilla Secure Code Review Checklist",
        url: "https://infosec.mozilla.org/guidelines/web_security",
      },
      {
        label: "OWASP Secure Coding Checklist",
        url: "https://owasp.org/www-project-secure-coding-practices/",
      },
      {
        label: "CERT C/C++ Secure Coding Standard",
        url: "https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard",
      },
      {
        label: "Unix Code Review Guidelines",
        url: "http://www.dwheeler.com/",
      },
    ],
    moreSourcesUrl: "https://google.github.io/eng-practices/review/",
  },
  {
    step: "04",
    title: "Test and Validate AI-Generated Code",
    description:
      "All AI-generated code must pass a structured multi-layer testing process to verify correctness, safety, and performance under realistic conditions.",
    warningNote:
      "Never merge AI-generated code directly into shared or production branches without structured testing.",
    warningBody: [
      "Skipping validation may introduce hidden vulnerabilities, logic errors, or regression bugs that can compromise system stability and security.",
    ],
    warningRisks: [
      "Data corruption",
      "Security breaches",
      "Service downtime",
      "Compliance violations",
      "Irreversible production incidents",
    ],
    procedureSteps: [
      {
        title: "1) Run Unit Tests",
        items: [
          "Validate core logic.",
          "Mock external dependencies.",
          "Cover normal and edge cases.",
        ],
      },
      {
        title: "2) Run Integration Tests",
        items: [
          "Verify interaction between modules.",
          "Test database, API, and external services.",
          "Confirm data consistency.",
        ],
      },
      {
        title: "3) Execute Regression Tests",
        items: [
          "Ensure existing functionality remains intact.",
          "Compare outputs before and after AI-generated changes.",
        ],
      },
      {
        title: "4) Perform Security Validation",
        items: [
          "Check for injection risks.",
          "Validate input sanitization.",
          "Ensure no hardcoded secrets.",
          "Run static security scans.",
        ],
      },
      {
        title: "5) Conduct Performance Testing",
        items: [
          "Measure latency.",
          "Monitor memory and CPU usage.",
          "Detect scalability bottlenecks.",
        ],
      },
      {
        title: "6) Validate in Production-like Environment",
        items: [
          "Use staging environment.",
          "Match configuration variables.",
          "Simulate real traffic patterns.",
        ],
      },
      {
        title: "7) Prepare Rollback Plan",
        items: [
          "Maintain previous stable build.",
          "Enable feature flags if applicable.",
          "Document recovery procedure.",
        ],
      },
    ],
    pros: [
      "Prevents catastrophic production failures.",
      "Ensures compliance and audit readiness.",
      "Reduces technical debt.",
      "Improves long-term system stability.",
    ],
    cons: [
      "Requires testing infrastructure.",
      "Adds time before release.",
      "May require cross-team coordination.",
    ],
    bestFor: [
      "Enterprise systems.",
      "Regulated industries.",
      "CI/CD environments.",
      "Multi-team repositories.",
    ],
    guidingQuestions: [
      "Did coverage decrease after AI modification?",
      "Could this introduce regression bugs?",
      "Are security checks automated?",
      "Can we revert changes within minutes?",
    ],
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
    details: [
      "Track time-to-delivery, defect rates, and rework percentage before and after AI adoption.",
      "Separate velocity metrics from quality metrics to avoid rewarding low-quality output.",
      "Set team-level and individual-level goals that are realistic and auditable.",
    ],
    procedureSteps: [
      {
        title: "KPI Taxonomy (What to Measure)",
        items: [
          "Outcome metrics: lead time, defect rate, rework rate.",
          "Quality metrics: review pass rate, rollback rate, production incident rate.",
          "Efficiency metrics: AI-assisted completion ratio, PR cycle time.",
          "Risk/compliance metrics: security findings, policy/compliance violations.",
        ],
      },
      {
        title: "Metric Spec Card (How to Define Each KPI)",
        items: [
          "Name and business intent.",
          "Exact definition and formula.",
          "Data source and update cadence.",
          "Owner, target value, and alert threshold.",
          "Anti-gaming rule (how to prevent misleading optimization).",
        ],
      },
    ],
    checklistSections: [
      {
        title: "Metric Design Checklist",
        items: [
          "The KPI is measurable and unambiguous.",
          "Data collection can be automated.",
          "Ownership and review cadence are assigned.",
          "Target and alert threshold are explicitly defined.",
          "The metric is auditable and reproducible.",
        ],
      },
      {
        title: "Quality Guardrail Checklist",
        items: [
          "Speed metrics are paired with quality metrics.",
          "Security and compliance indicators are included.",
          "The metric discourages local optimization and gaming.",
          "Trend can be attributed to AI adoption vs unrelated variables.",
          "Weekly or biweekly review ritual is defined.",
        ],
      },
    ],
  },
  {
    step: "02",
    title: "Tracking mechanisms",
    description:
      "Develop tracking mechanisms to monitor AI-assisted workflow outcomes such as productivity, code quality, and efficiency.",
    details: [
      "Track AI impact with comparable, auditable metrics across repos and teams.",
      "Balance productivity metrics with quality and risk indicators to prevent one-dimensional optimization.",
    ],
    procedureSteps: [
      {
        title: "1) Define Tracking Scope and AI-Assist Criteria",
        items: [
          "Define what qualifies as AI-assisted work (code generation, review suggestions, test generation, etc.).",
          "Specify included repositories, teams, and workflows.",
          "Document metric boundaries so comparisons remain fair over time.",
        ],
      },
      {
        title: "2) Instrument Data Sources",
        items: [
          "Collect data from Git/PR activity, CI pipelines, issue tracking, and deployment systems.",
          "Standardize event fields (team, repo, author, timestamp, AI flag, outcome).",
          "Use automated ETL pipelines instead of manual spreadsheet aggregation.",
        ],
      },
      {
        title: "3) Design Dashboard Layers",
        items: [
          "Create individual, team, and organization dashboard views.",
          "Add filters for time range, repository, product area, and release train.",
          "Show both trend charts and distribution charts to catch outliers.",
        ],
      },
      {
        title: "4) Set Alerts and Triage Rules",
        items: [
          "Define thresholds for quality regressions (defect spikes, rollback rate, CI instability).",
          "Configure alert channels and assign response owners.",
          "Attach playbooks so responders know first checks and escalation paths.",
        ],
      },
      {
        title: "5) Add Data Quality and Anti-Gaming Controls",
        items: [
          "Detect missing, delayed, or duplicated records.",
          "Pair speed metrics with quality guardrails to prevent metric gaming.",
          "Track context variables (release pressure, incident windows) to avoid false conclusions.",
        ],
      },
      {
        title: "6) Run Operating Cadence",
        items: [
          "Review dashboards weekly for tactical issues and monthly for strategic adjustments.",
          "Assign metric owners and require update notes for significant trend changes.",
          "Retire low-signal metrics and add new indicators when workflow changes.",
        ],
      },
    ],
    checklistSections: [
      {
        title: "Tracking Implementation Checklist",
        items: [
          "AI-assisted work definition is documented and shared.",
          "Core systems (Git, CI, issue tracker, deploy logs) are connected.",
          "Metric formulas and field definitions are versioned.",
          "Dashboards support filters by team, repository, and time range.",
          "Alert thresholds and owner assignments are configured.",
        ],
      },
      {
        title: "Governance and Quality Checklist",
        items: [
          "Data quality checks run automatically.",
          "Productivity metrics are paired with quality metrics.",
          "Security/compliance signals are included in reporting.",
          "There is a recurring review ritual (weekly/monthly).",
          "A process exists to update or retire weak metrics.",
        ],
      },
    ],
  },
  {
    step: "03",
    title: "Define evaluation framework",
    description:
      "Create incentive or evaluation frameworks that reward effective and responsible AI usage.",
    details: [
      "Reward engineers for reliable outcomes, not only for faster output.",
      "Include safe-use criteria such as data handling, attribution, and policy compliance.",
      "Document clear escalation paths when model output is uncertain or high-risk.",
    ],
    procedureSteps: [
      {
        title: "1) Define Evaluation Goals and Principles",
        items: [
          "State what behaviors are rewarded (quality, reliability, responsible AI usage).",
          "Define non-negotiable principles (security, compliance, user impact, reproducibility).",
          "Document failure modes the framework must explicitly discourage.",
        ],
      },
      {
        title: "2) Build a Weighted Scoring Model",
        items: [
          "Use weighted dimensions: delivery efficiency, code quality, security/compliance, and collaboration.",
          "Publish exact scoring formulas so teams understand how performance is measured.",
          "Set minimum guardrail thresholds that override high speed scores.",
        ],
      },
      {
        title: "3) Create Role-Specific Rubrics",
        items: [
          "Define separate expectations for ICs, reviewers, tech leads, and managers.",
          "List observable behaviors for each score band (meets, exceeds, below expectations).",
          "Include examples of good and poor AI-assisted decision patterns.",
        ],
      },
      {
        title: "4) Define Evidence and Auditability",
        items: [
          "Map each metric to verifiable evidence (PRs, CI logs, incident reports, review comments).",
          "Keep an auditable trail of evaluation decisions and score changes.",
          "Run periodic calibration reviews to maintain consistency across teams.",
        ],
      },
      {
        title: "5) Add Anti-Gaming Controls",
        items: [
          "Pair output metrics with quality/safety guardrails to prevent gaming.",
          "Detect suspicious patterns (artificial PR splitting, avoiding complex tasks, metric inflation).",
          "Apply penalties or review flags for repeated low-integrity optimization behavior.",
        ],
      },
      {
        title: "6) Set Cadence, Incentives, and Appeals",
        items: [
          "Run weekly check-ins, monthly evaluations, and quarterly framework recalibration.",
          "Link outcomes to incentives, growth plans, and targeted coaching.",
          "Provide an appeal/review path so teams can challenge inaccurate evaluations.",
        ],
      },
    ],
    checklistSections: [
      {
        title: "Evaluation Framework Checklist",
        items: [
          "Evaluation goals and principles are documented and communicated.",
          "The weighted scoring model is transparent and reproducible.",
          "Role-specific rubrics are defined and approved.",
          "Security and compliance are included as hard constraints.",
          "Evidence sources are mapped for every scoring dimension.",
        ],
      },
      {
        title: "Governance and Fairness Checklist",
        items: [
          "Anti-gaming controls are defined and monitored.",
          "Calibration review cadence is active across teams.",
          "An escalation process exists for high-risk AI output.",
          "Appeal and correction workflow is available for disputed scores.",
          "Framework updates are versioned and tracked over time.",
        ],
      },
    ],
  },
  {
    step: "04",
    title: "Continuous work",
    description:
      "Continuously review and adjust metrics to ensure alignment with organizational goals and workflow improvements.",
    details: [
      "Revisit KPI definitions quarterly as tooling and team maturity evolve.",
      "Retire metrics that no longer predict impact and introduce new leading indicators.",
      "Share lessons learned across teams to speed up adoption and reduce repeated mistakes.",
    ],
    procedureSteps: [
      {
        title: "1) KPI Lifecycle Management",
        items: [
          "Define clear add/keep/retire criteria for every KPI.",
          "Assign an owner, review cadence, and change log to each KPI.",
          "Document why a metric was introduced, modified, or deprecated.",
        ],
      },
      {
        title: "2) Drift and Anomaly Monitoring",
        items: [
          "Detect baseline drift, seasonal effects, and sudden data shifts.",
          "Set investigation triggers for abnormal spikes or drops.",
          "Define fallback actions when metric quality is compromised.",
        ],
      },
      {
        title: "3) Controlled Experiments and Iteration",
        items: [
          "Validate new metrics through pilot teams or staged rollout.",
          "Use before/after and cohort comparisons to confirm signal quality.",
          "Promote to organization-wide usage only after validation passes.",
        ],
      },
      {
        title: "4) Closed-Loop Improvement",
        items: [
          "Convert review findings into action items with owner and due date.",
          "Track completion rate and impact of each remediation action.",
          "Require follow-up verification in the next reporting cycle.",
        ],
      },
      {
        title: "5) Cross-Team Knowledge Operations",
        items: [
          "Run recurring cross-team metric review and alignment sessions.",
          "Maintain shared templates for retrospectives and metric-change proposals.",
          "Publish lessons learned to reduce repeated mistakes across teams.",
        ],
      },
      {
        title: "6) Ongoing Risk and Compliance Review",
        items: [
          "Continuously check AI usage against policy, security, and legal requirements.",
          "Retain audit evidence for decisions, exceptions, and incident handling.",
          "Escalate policy drift quickly with a defined governance path.",
        ],
      },
    ],
    checklistSections: [
      {
        title: "Continuous Governance Checklist",
        items: [
          "Each KPI has an owner and review cadence.",
          "Metric change history is documented and traceable.",
          "Drift/anomaly detection thresholds are configured.",
          "Pilot validation is required before scaling new metrics.",
          "Cross-team review ritual is active and recurring.",
        ],
      },
      {
        title: "Risk and Audit Checklist",
        items: [
          "Compliance and security checks are part of metric reviews.",
          "Audit evidence is retained for key metric decisions.",
          "Escalation path exists for policy drift or major anomalies.",
          "Action items from retrospectives are tracked to closure.",
          "Weak or noisy metrics are retired on schedule.",
        ],
      },
    ],
  },
];

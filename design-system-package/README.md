# How To Use This Specification Package

This folder is the executable source package for the 101HR AI design system.

Files:

- `admin-design-system-spec.md`: full design principles, evaluation, token rules, component rules and role usage.
- `tokens.json`: Figma Variables and frontend token source.
- `figma-page-manifest.json`: Figma page structure and build order.
- `component-manifest.json`: component categories, variants, states, usage and code names.
- `interaction-guidelines.md`: interaction decision rules for page mode, container choice, layout, editing, confirmation and records.
- `figma-build-prompts.md`: phased prompts for Codex, AI Agent or Figma MCP.
- `qa-checklist.md`: pass/fail checklist for Figma and frontend implementation.
- `page-qa-audit.md`: current six-page interaction QA audit and repair priority list.

## 1. Codex Usage

Use Codex to implement or refactor pages by reading files in this order:

1. `admin-design-system-spec.md`
2. `tokens.json`
3. `component-manifest.json`
4. `interaction-guidelines.md`
5. the target HTML/CSS/JS page
6. `qa-checklist.md`
7. `page-qa-audit.md` when working on existing sample pages

Codex should not invent a new style or interaction model for each page. It should identify the page mode, choose the right container and layout pattern, use the component manifest and then run QA.

## 2. Figma MCP Usage

Use Figma MCP in phases:

1. Create pages and Variables from `figma-page-manifest.json` and `tokens.json`.
2. Build foundations: icons, charts, typography, color, spacing, radius, shadow.
3. Build Basic Components.
4. Build Data, Navigation, Feedback and AI Components.
5. Build Interaction Patterns before templates.
6. Build Admin Templates.
7. Create QA frames and repair failed frames.

Do not ask Figma MCP to generate the whole design system in one prompt.

## 3. AI Agent Usage

Use an AI Agent as a controlled builder, not as a free-form visual generator.

Agent workflow:

1. Read `admin-design-system-spec.md` to understand the 101HR AI style boundary and product modes.
2. Read `tokens.json` and refuse to create unbound visual values unless the user explicitly asks for a new token.
3. Read `component-manifest.json` before creating any new component.
4. Read `interaction-guidelines.md` before choosing drawer, modal, page, column layout or edit mode.
5. Use `figma-build-prompts.md` phase by phase.
6. Run `qa-checklist.md` after each phase and stop when a hard-fail rule appears.
7. Generate a short repair plan before changing a failed frame or component.

AI Agent must not:

- Generate a whole design system in one pass.
- Invent generic Ant Design / Arco / Material visual styles.
- Add decorative AI effects that do not help business operation.
- Create detached one-off components when a manifest component can be reused.

## 4. Phased Generation Rule

Generate in small batches:

- Batch 1: pages and variables only.
- Batch 2: foundations only.
- Batch 3: basic controls.
- Batch 4: data, navigation, feedback and AI components.
- Batch 5: interaction patterns.
- Batch 6: templates.
- Batch 7: QA and fixes.

This prevents layout drift, unbound variables, duplicate chart styles and one-off components.

## 5. QA Repair Workflow

When QA fails:

1. Find the failed rule in `qa-checklist.md`.
2. Use the matching repair prompt in `figma-build-prompts.md`.
3. For the six current sample pages, check `page-qa-audit.md` for known page-level risks.
4. Repair the smallest affected frame or component set.
5. Re-run the checklist.
6. Do not proceed to template generation until component-level QA passes.

## 6. Extending With Real Business Pages

For each new business page:

1. Write the user role and primary task.
2. Choose one product mode: task processing, intent routing, trusted Q&A, process embedded, conversation action or operations configuration.
3. Choose the closest template.
4. Use `interaction-guidelines.md` to choose full page, drawer, modal, popover, inline expansion or new page.
5. Add only missing business components after checking whether existing basic/data/AI components can compose it.
6. Update `component-manifest.json` only when a reusable component is truly new.
7. Add QA evidence to the QA page.

## 7. Code Component Library And Code Connect

Frontend should map:

- `tokens.json` to CSS custom properties or theme variables.
- `Component/Basic/*` to base UI components.
- `Component/Data/*` to table, list, record and statistic components.
- `Component/AI/*` to reusable AI-specific components.
- `Component/Business/*` to 101HR domain components.
- `Template/AI/*` to page templates.

Code Connect should use the `figmaName`, `codeName`, `variants` and `states` in `component-manifest.json`.

## 8. Product Manager Usage

PMs use:

- `admin-design-system-spec.md` to understand page modes and business boundaries.
- `interaction-guidelines.md` to decide page flow, confirmation point, exception path and record behavior.
- `component-manifest.json` to know which components already exist.
- `qa-checklist.md` to review whether a page satisfies the PRD and workflow.

PM review focus:

- Is the user role correct?
- Is the primary task obvious?
- Does AI stop at draft/recommendation where needed?
- Are exceptions and records meaningful?
- Is the chosen container and layout appropriate for the task?

## 9. UI Designer Usage

UI designers use:

- `tokens.json` for Variables.
- `figma-page-manifest.json` for page structure.
- `figma-build-prompts.md` for phased Figma generation.
- `component-manifest.json` for component sets and variants.
- `interaction-guidelines.md` for drawer/page/modal/layout/editing decisions.
- `qa-checklist.md` for visual QA.

UI review focus:

- Component reuse.
- Visual hierarchy.
- Spacing consistency.
- Tag and button alignment.
- Module relationship clarity.
- Primary/secondary/tertiary interaction hierarchy.
- Figma Variables binding.

## 10. Frontend Engineer Usage

Frontend engineers use:

- `tokens.json` as implementation source.
- `component-manifest.json` as code component map.
- `admin-design-system-spec.md` for layout, state and naming rules.
- `interaction-guidelines.md` for route, drawer, modal, inline edit and record interaction implementation.
- `qa-checklist.md` for implementation acceptance.

Frontend review focus:

- Token implementation.
- Component props and variants.
- State coverage.
- Responsive behavior.
- Interaction state transitions.
- Code Connect readiness.

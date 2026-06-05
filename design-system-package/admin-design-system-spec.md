# 101HR AI Design System Specification

Version: v2.3 executable interaction package
Date: 2026-06-05
Source pages: `component-library.html`, `product-samples.html`, `smart-onboarding-tool.html`, `smart-ticket-tool.html`, `smart-policy-assistant.html`, `service-expedite-tool.html`, `smart-assistant-tool.html`, `ai-ops-dashboard.html`, `frontend-tokens.html`, `styles.css`

## 0. Decision Summary

This system is suitable to continue only if it is treated as an admin workbench design system, not as a set of decorative AI demo pages.

The long-term direction is valid: 101HR bright blue navigation, white work surfaces, light gray-blue page background, restrained status colors, dense but readable tables, and AI components that explain boundaries, sources, confidence and next actions.

The weak points found in the current pages are not fatal, but they must be governed:

- Too many bordered cards create visual noise and make modules look equally important.
- Adjacent containers sometimes look stuck together, so users cannot tell whether they are one module or two.
- Buttons and tags are sometimes used where icon buttons, chips, tabs or inline actions are more appropriate.
- AI input is important, but it should be prominent only when the page's main task is input-first. For result-first pages, confirmed business output should become primary.
- Component styles exist in code, but the system still needs stable Figma Variables, component manifests and QA rules to prevent drift.

## 1. Phase 1 Evaluation

### 1.1 Long-Term Use

Verdict: conditionally suitable.

Why it can last:

- The visual identity is already tied to 101HR rather than a generic AI product.
- The system supports six recurring product modes: task processing, intent routing, trusted Q&A, process embedded, conversation action and operations configuration.
- Existing CSS variables already provide a usable primitive palette, status colors, spacing and shadows.

Conditions:

- Use fewer container borders. Prefer background separation, whitespace, section headers and hierarchy.
- Treat result tables and business forms as primary work areas, not as secondary card content.
- Maintain one step strip, one tag system and one action-button sizing rule across pages.

### 1.2 Fit With Prior Product Requirements

Verdict: mostly suitable.

Mapping:

- Smart onboarding: AI input, field mapping, backfill checks, employee confirmation and record tracking.
- Smart ticket: natural language demand, intent recognition, service form draft and service record.
- Policy assistant: trusted answer, source traceability, follow-up and export.
- Service expedite: embedded decision support inside service-ticket context.
- Smart assistant: conversation plus action panel.
- AI operations dashboard: agent status, configuration, failure samples and recovery.

Gap:

- Product samples are not all implemented to the same depth.
- Component library still needs to be the stable source of truth rather than a page-by-page byproduct.

### 1.3 AI Stable Reproduction

Verdict: suitable if generated in phases.

Stable reproduction rules:

- Do not generate all pages and components in one prompt.
- Use `tokens.json` first, then Figma pages, then components, then templates, then QA.
- Every component must include variants, states, Auto Layout rules and token bindings.
- Every business template must state its primary user task before layout generation.

### 1.4 Figma Variables And Component Library

Verdict: suitable.

Required Figma Variable Collections:

- Primitive
- Theme / Light
- Theme / Dark
- Layout
- Typography
- Component
- Motion
- Chart

Risk:

- If pages are generated before Variables are bound, Figma will become a static mockup library and will drift from code.

### 1.5 Code Component Alignment

Verdict: suitable.

Alignment basis:

- Code already uses `hr-ai-*` CSS custom properties and class prefixes.
- Component naming can align to `Component/Basic/Button`, `Component/Data/Table`, `Component/AI/PrimaryInput`, `Template/AI/SmartOnboarding`.
- Code Connect can map Figma variants to props such as `variant`, `size`, `state`, `tone`, `density`, `status`.

### 1.6 Aesthetic Identity

Verdict: has identity, but must be sharpened.

Identity:

- Bright 101HR blue navigation and action color.
- Calm gray-blue work background.
- White primary work surfaces.
- Business-first density.
- Trustable AI expression: source, boundary, confidence, next action.

Avoid:

- Generic Ant Design / Arco / Material defaults.
- Marketing hero layouts.
- Decorative gradients, glassmorphism, cyber tech style or flashy dark mode.
- Over-carded dashboards where everything has equal weight.

### 1.7 Design Risks

- Overuse of borders creates visual interference.
- Too-small module spacing weakens information hierarchy.
- Equal-width columns are often unjustified for real B-side workflows.
- Button overload makes pages feel noisy and unclear.
- Tags used as decoration rather than semantic status confuse users.
- Chat surfaces can be either under-prioritized or over-prioritized if the page mode is not declared.
- Component library and product samples can diverge if QA does not check both.

### 1.8 Current Optimization Direction

The next standardization layer is interaction and visual governance. The goal is to make every page answer:

1. What is the primary business task?
2. Which module is primary, secondary and tertiary?
3. Which container relationship is being used: same module, separate module or parent-child module?
4. Which actions are text buttons and which are icon actions?
5. Which tags are semantic business states and which should be removed?
6. Does the page still work if AI processing detail is collapsed?

This governance layer is required because the pages can otherwise regress into:

- too many equal cards,
- too many visible text buttons,
- unclear adjacent containers,
- decorative status tags,
- inconsistent step strips,
- and input areas competing with generated business results.

## 2. Design Goal And Scope

Goal:

Build a reusable 101HR AI admin design system that supports real AI-assisted HR operations: input, recognition, source tracing, field confirmation, exception handling, submission and record tracking.

Scope:

- AI workbench pages
- AI-assisted form pages
- Policy trusted-answer pages
- Service-ticket decision pages
- Conversation-action pages
- Operations configuration dashboards
- Component library and Figma component sets
- Frontend token and Code Connect mapping

Out of scope:

- Marketing pages
- Employee consumer-facing onboarding pages
- Decorative AI landing pages
- Pure presentation dashboards without operations

## 3. Style Keywords And Aesthetic Boundary

Keywords:

- Professional
- Calm
- Trustworthy
- Dense
- Scan-friendly
- Operational
- Restrained AI
- 101HR bright blue

Boundaries:

- Use blue for navigation, primary action and active state.
- Use status colors only when a business state changes user action.
- Use cards for clear work surfaces, not for every small item.
- Use tables, forms and lists as first-class surfaces.
- Use whitespace to separate modules; use borders sparingly.
- AI must be transparent, but AI processing details should be summarized and expandable.

## 4. Figma Page Planning

Required page order:

1. Cover
2. Variables
3. Icons
4. Charts
5. Basic Components
6. Data Components
7. Feedback Components
8. Navigation Components
9. Interaction Patterns
10. AI Components
11. Business Components
12. Templates - Workbench
13. Templates - List
14. Templates - Card
15. Templates - Form
16. Templates - Detail
17. Templates - AI Onboarding
18. Templates - AI Ticket
19. Templates - Policy Assistant
20. Templates - Service Expedite
21. Templates - Smart Assistant
22. Templates - AI Ops
23. Dark Theme
24. Code Connect
25. QA

## 5. Variables Collections Planning

Collections:

- Primitive: raw color, spacing, radius, shadow, font, size.
- Theme / Light: semantic light theme tokens.
- Theme / Dark: semantic dark theme tokens.
- Layout: page width, sidebar, topbar, grid, content spacing.
- Typography: role-based text tokens.
- Component: component-specific tokens.
- Motion: duration and easing.
- Chart: categorical and status chart colors.

Modes:

- Light
- Dark
- Optional future high-contrast

## 6. Token Naming Rules

Use slash-friendly names for Figma Variables and dot-friendly aliases for code.

Figma example:

- `Primitive/Color/Blue/600`
- `Theme/Light/Surface/Page`
- `Layout/Space/24`
- `Typography/Body/14/Regular`
- `Component/Button/Primary/Bg/Default`

Code example:

- `--hr-ai-primary`
- `--hr-ai-surface-page`
- `--hr-ai-space-24`
- `--hr-ai-button-primary-bg`

Rules:

- Primitive tokens never reference theme tokens.
- Theme tokens reference primitive tokens.
- Component tokens reference theme or layout tokens.
- Do not encode page names into foundation tokens.
- Status tokens must describe meaning: `success`, `warning`, `danger`, `info`, `neutral`, `review`, `conflict`, `duplicate`.

## 7. Primitive Tokens

Primitive tokens define raw values:

- Blue: navigation and primary action.
- Neutral: text, line, page, surface.
- Status: green, orange, yellow, red, purple, cyan.
- Space: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48.
- Radius: 0, 4, 6, 8, 10, 12, 16.
- Border width: 0, 1, 2.
- Shadow: none, soft, card, focus, overlay.
- Font family: system Chinese admin stack.

## 8. Theme Tokens

Theme tokens define semantic usage:

- Surface: page, nav, card, card-muted, input, input-disabled.
- Text: primary, secondary, muted, inverse, link, danger.
- Border: subtle, default, strong, focus.
- Fill: primary, primary-hover, primary-active, selected, hover.
- Status: success, warning, danger, info, review, conflict, duplicate.

## 9. Layout Tokens

Admin shell:

- Sidebar width: 220px for sample tools, 224px for system templates.
- Topbar height: 56px.
- Content max width: 1180px for tool pages, 1200px for design-system pages.
- Content padding: 24px desktop, 16px tablet, 12px mobile.
- Module gap: 24px.
- Related submodule gap: 16px.
- Section title to content gap: 12px.
- Dense control gap: 8px.

Grid:

- Desktop: 12 columns, 24px gutter.
- Tablet: 8 columns, 16px gutter.
- Mobile: 4 columns, 12px gutter.

## 10. Typography Tokens

Use system fonts:

- `PingFang SC`, `Microsoft YaHei`, `Inter`, `Arial`, sans-serif.

Roles:

- Page title: 24/32, 600.
- Section title: 18/26, 600.
- Card title: 16/24, 600.
- Body: 14/22, 400.
- Body strong: 14/22, 600.
- Caption: 12/18, 400.
- Data number: 24/32 or 28/36, 700.
- Table header: 13/20, 600.

Do not scale type by viewport width.

## 11. Component Tokens

Component tokens cover:

- Button height, padding, radius, state fill and border.
- Tag height, padding, radius, tone backgrounds.
- Input height, padding, border, focus shadow.
- Table row height, header background, hover background.
- Card padding, radius, shadow and section gaps.
- Step strip height, active color and connector.
- AI input area focus and send button size.
- Record item density and action alignment.

## 12. Light And Dark Theme

Light theme is the product default and must be fully built first.

Dark theme exists for future operating contexts:

- Keep dark mode calm, not flashy.
- Use blue as active navigation and primary action.
- Preserve contrast ratios.
- Do not invert all status colors blindly; tune status backgrounds for dark surfaces.

## 13. Color System

Primary:

- Bright blue for navigation, active and primary actions.
- Blue should not be used as decorative blocks without interaction or status meaning.

Status:

- Success: created, completed, available.
- Warning:待补充, needs action, pending.
- Danger: failed, blocking, high risk.
- Review/yellow: conflict, partial success, uncertain.
- Purple/gray-blue: duplicate, reference, secondary AI state.
- Cyan: policy source, AI helper, neutral intelligence.

Source colors:

- Official source: red label only, not red background blocks.
- Internal rule: blue.
- Case: green.
- Expired/conflict: orange or red depending on risk.

## 14. Font System

Rules:

- Page title appears once per page.
- Do not use hero-scale text inside work cards.
- Labels use 13 or 14px.
- Table cells use 14px with sufficient line height for Chinese text.
- Long text should wrap; critical IDs may truncate with tooltip.

## 15. Spacing System

Use a 4px base scale:

- 4px: icon-to-text gap.
- 8px: compact control gap.
- 12px: label-to-field, tag group gap.
- 16px: related submodules.
- 24px: independent modules.
- 32px: page title to first primary section when no alert exists.

Hard rules:

- Independent cards cannot touch.
- If two blocks visually touch, they must be one component with an internal header/body layout.
- Do not use double divider lines between step strips and summaries.

## 16. Grid System

Use content-driven layout:

- Input-first tools: single primary column, optional compact record list below.
- Result-first tools: full-width result table/form, compact summary above.
- Policy Q&A: conversation/answer surface first, scenario templates secondary.
- Embedded decision pages: source business object and AI decision side-by-side only when the right panel has a distinct action role.
- Operations dashboard: two-column layout allowed, but KPI and issue cards must have visible surface contrast.

Avoid:

- Three equal columns by default.
- Right panels that consume space without a clear action.

## 17. Radius System

- Button, input, tag: 6px.
- Work cards: 8px.
- Large app shell or container: 12px max.
- Modal and drawer panels: 12px.
- Avoid pill buttons except filter chips and segmented controls.

## 18. Border System

Use borders sparingly:

- Inputs and tables need borders.
- Cards usually use white surface plus shadow or subtle border, not both heavy.
- Dashed border only for upload or empty drop zones.
- Focus border is blue and must be paired with focus shadow.
- Do not use decorative colored side bars unless status or selection is explicit.

## 18.1 Surface And Container Governance

Before drawing a card, decide the module relationship.

| Relationship | Token treatment | Rule |
| --- | --- | --- |
| Same module | One white container, internal `Layout/Space/SectionGap` | Header, body, footer belong to one card. Do not split them into touching cards. |
| Separate module | Separate white containers with `Layout/Space/ModuleGap` | Each module needs its own title and primary task. |
| Parent-child | Parent white container, child subtle fill or no separate border | Child block should not equal parent weight. |

Container acceptance:

- No two independent cards may touch.
- No double divider lines between step strip and summary.
- Nested cards may appear only for repeated list items, modals, drawers, or framed tools.
- Business tables and forms are primary surfaces; avoid wrapping every row in card-like containers.

## 18.2 Action And Button Governance

Action type determines component choice:

- Primary workflow actions use `Component/Basic/Button` with `variant=primary`.
- Secondary explicit actions use `variant=secondary`.
- Upload, attachment, voice, send, delete, expand, collapse, copy and download use `Component/Basic/IconButton` when the surrounding context already names the action.
- Mode choices use `Segmented` or `Tabs`, not multiple buttons.
- Scenario templates use chips or task items, not primary buttons.

Button acceptance:

- One module usually has one primary action.
- Buttons in one action group must share height and baseline.
- Icon-only actions require tooltip.
- Record actions must name the object or outcome.

## 18.3 Tag Governance

Tags are semantic, not decorative.

A tag is allowed only if it expresses:

- business status,
- required user action,
- AI/source status,
- risk or permission boundary.

Tag acceptance:

- Text is vertically centered.
- Field-level tags sit near field label or value.
- Module-level tags sit in the module header.
- Decorative tags such as vague "AI 感" labels fail QA.

## 18.4 Input Priority Governance

AI input is prominent only in input-first states.

| Workflow state | Primary surface | Input rule |
| --- | --- | --- |
| Before processing | Input or composer | Large and focused, with examples and primary action |
| Processing | Compact process summary | Input disabled or visually secondary |
| Draft generated | Confirmation table/form/answer | Input collapses to task summary and "modify input" |
| Tracking | Record list or result summary | Input is hidden or secondary |

If the generated business result exists, the result must outrank the input.

## 19. Shadow System

- Page sections: no shadow or soft card shadow.
- Primary work cards: soft shadow.
- Hover cards: slight elevation only.
- Modal/drawer: overlay shadow.
- Avoid multiple nested shadows.

## 20. Motion Principles

- Motion supports feedback, not decoration.
- Loading and AI processing use progress, skeleton or compact step status.
- Drawer: 180-240ms ease-out.
- Modal: 160-200ms.
- Table row expansion: 160ms.
- Avoid looping animation except active loading states.

## 21. Icon System

Rules:

- Use line icons with 16, 18, 20, 24px sizes.
- Tool actions such as upload, attachment, voice, send, expand, delete should use icon buttons where text is obvious or already labeled.
- Use icon + text only for primary commands that require clarity.
- Every icon-only action needs tooltip.
- Do not draw ad hoc SVGs when a standard line icon exists.

## 22. Chart System

Chart types:

- KPI card
- Trend line
- Bar chart
- Horizontal bar
- Donut
- Funnel
- Heatmap
- Failure distribution

Rules:

- Charts must have business title, time range and unit.
- Use chart tokens, not random colors.
- Avoid multiple chart styles for the same metric type.

## 23. Basic Component Specification

Core components:

- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch
- Tag
- Badge
- Tooltip
- Upload
- Tabs
- Segmented
- SearchInput

Every component requires:

- Size variants: sm, md, lg where applicable.
- States: default, hover, active, focus, disabled, loading, error.
- Token bindings.
- Auto Layout.
- Code mapping.

## 24. Data Component Specification

Core components:

- Table
- FilterBar
- RecordList
- DescriptionList
- Timeline
- Statistic
- SourceCard
- ResultSummary
- FieldMappingTable
- EmployeeReviewTable
- TicketRecordList

Rules:

- Business result records should prioritize status, title, key result, owner/time, next action.
- Tables should support horizontal scroll for dense fields.
- Action columns must be right-aligned and consistently sized.

## 25. Navigation Component Specification

Core components:

- AppSidebar
- ProductSidebar
- Topbar
- Breadcrumb
- BackLink
- StepStrip
- Tabs
- SubMenu

Rules:

- Active navigation uses the bright-blue system.
- `返回工具集` must be clickable and consistent across all tool samples.
- StepStrip must use one shared style across sample pages.
- Tabs must not stretch one item wider than its content unless full-width mode is explicitly selected.

## 26. Feedback Component Specification

Core components:

- Alert
- Toast
- Modal
- Drawer
- Popover
- Empty
- Loading
- Progress
- ConfirmBar
- InlineError

Rules:

- AI boundary alert is not a decorative banner; it states what AI will not do.
- Blocking alerts must include next action.
- Drawer is for details, source, guide or edit side tasks.
- Modal is for destructive, irreversible or high-risk confirmation.

## 27. Admin Template Page Specification

Templates:

- Workbench
- List
- Card
- Form
- Detail
- AI Onboarding
- AI Ticket
- Policy Assistant
- Service Expedite
- Smart Assistant
- AI Ops Dashboard

Template rules:

- Start from user task priority.
- Primary work area receives the largest visual weight.
- Records and logs are secondary unless the page task is tracking.
- Avoid equal-weight cards when one module is clearly the decision point.

## 28. Component Naming Rules

Figma:

- `Component/Basic/Button`
- `Component/Data/Table`
- `Component/Navigation/StepStrip`
- `Component/Feedback/Alert`
- `Component/AI/PrimaryInput`
- `Component/Business/EmployeeReviewTable`
- `Template/AI/SmartOnboarding`

Code:

- Prefix base system classes with `hr-c-`.
- Prefix AI components with `hr-ai-c-`.
- Prefix business modules with `hr-ai-b-`.
- Prefix page templates with `hr-ai-t-`.
- Prefix utility/state classes with `is-`, `has-`, `u-`.

## 29. Component Variant Rules

Required variant axes:

- Size: sm, md, lg.
- Tone: neutral, primary, success, warning, danger, review, info, duplicate.
- State: default, hover, active, focus, disabled, loading, selected, error.
- Density: compact, regular, spacious.
- Layout: horizontal, vertical, inline, stacked.

Do not create separate components for what should be variants.

## 30. Auto Layout Requirements

Figma component requirements:

- Every component uses Auto Layout.
- Text must resize and wrap.
- Buttons have fixed height and hug-content width except full-width mode.
- Tables use fixed header height, row min-height and horizontal scroll frame.
- Cards use vertical Auto Layout with explicit internal gaps.
- Component sets use consistent variant property names.
- No manually positioned repeated list items.

## 31. Interaction Decision Rules

Use `interaction-guidelines.md` as the source for interaction decisions. This is required before building or refactoring any AI product page.

Required decisions before layout:

- Page mode: task processing, intent routing, trusted Q&A, process embedded, conversation action or operations configuration.
- Primary surface: input, answer, table, form, service-ticket detail, chat or operations table.
- Container mode: full page, drawer, modal, popover, inline expansion or toast.
- Layout mode: one-column workflow, two-column support panel, three-pane workspace, list-detail or chat-action.
- Editing mode: inline table edit, inline form edit, drawer edit, modal edit or new page edit.
- Submit guard: disabled until complete, confirmation modal, partial submit, approval path or audit requirement.
- Record behavior: recent support list, full work queue, row expansion, drawer detail or dedicated record page.

### 31.1 Container Mode Rules

| Container | Required condition |
| --- | --- |
| Full page | Complete workflow with input, confirmation, exception handling and records. |
| Drawer | Side detail or object editing while preserving current list/form/table context. |
| Modal | High-risk confirmation or a small blocking decision. |
| Popover / Tooltip | Short hint, source snippet, confidence explanation or tooltip. |
| Inline expansion | Row-level details such as missing fields, failure reason or next step. |
| Toast | Low-risk feedback that does not change formal business state. |

### 31.2 Layout Mode Rules

| Layout | Required condition |
| --- | --- |
| One-column workflow | Dense table/form, sequential confirmation or 6+ important fields/columns. |
| Two-column support panel | One primary work surface and one supporting AI/detail panel, usually 65/35 or 70/30. |
| Three-pane workspace | All panes have persistent roles: navigation, primary list/conversation and detail/result. |
| List-detail | User selects a record/object and inspects detail. |
| Chat-action | Conversation remains useful while executable actions are shown in a distinct panel. |

### 31.3 Editing Mode Rules

| Editing mode | Required condition |
| --- | --- |
| Inline table edit | 1-3 low-risk row fields, immediate validation. |
| Inline form edit | The form is the page's primary business object. |
| Drawer edit | One object has multiple fields/sources, but list/table context must remain visible. |
| Modal edit | One small required value blocks a current action. |
| New page edit | Object has its own lifecycle, route, permissions, audit or multiple sections. |

### 31.4 Submit Guard Rules

| Guard type | Required condition |
| --- | --- |
| Disabled until complete | Required fields are missing. |
| Confirmation modal | Inferred fields, high-risk actions or irreversible state changes exist. |
| Partial submit | Batch task contains eligible and abnormal items at the same time. |
| Approval path | Current role lacks permission. |
| Audit required | Formal business data or customer-facing content changes. |

### 31.5 Record Model Rules

Record rows must follow this scanning order:

1. Status.
2. Business title.
3. Result summary.
4. Owner and time.
5. Next action.
6. Expand/detail affordance.

Record display choice:

- Recent support list when records are secondary.
- Full list/table when records are the main work queue.
- Row expansion for quick diagnosis.
- Drawer detail for one record while preserving list context.
- Dedicated page for long audit/history.

Hard rules:

- Drawer is for side work that preserves context; modal is for high-risk confirmation; new page is for objects with their own lifecycle.
- Full-width tables and forms win over decorative cards when the data is dense or editable.
- Two columns should usually be 65/35 or 70/30; equal columns are allowed only when both panes are truly equal.
- Three columns are allowed only when all panes have persistent roles.
- AI process details are summarized by default unless the page is an operations/debugging surface.
- Records must show business result and next action, not only operation logs.
- AI-generated draft cannot enter formal business data without the declared submit guard.

## 32. Code Connect Mapping Suggestions

Recommended mapping:

- `Component/Basic/Button` -> `<Button variant size state icon loading />`
- `Component/Basic/IconButton` -> `<IconButton icon tone size tooltip />`
- `Component/Basic/Tag` -> `<StatusTag tone size label />`
- `Component/Data/Table` -> `<DataTable columns rows density rowActions />`
- `Component/AI/PrimaryInput` -> `<AIPrimaryInput value mode examples attachments onSubmit />`
- `Component/AI/ProcessDetail` -> `<AIProcessDetail steps collapsed status />`
- `Component/Business/EmployeeReviewTable` -> `<EmployeeReviewTable employees filters actions />`
- `Template/AI/SmartOnboarding` -> `<SmartOnboardingTool />`
- `Template/AI/SmartTicket` -> `<SmartTicketTool />`
- `Template/AI/PolicyAssistant` -> `<PolicyAssistant />`

Code Connect must map variant names exactly to Figma variant properties.

## 33. QA Acceptance Standard

Hard pass/fail:

- If the page does not look like 101HR admin system, it fails.
- If Variables are not bound, it fails.
- If a component cannot be named, variant-ed or mapped to code, it fails.
- If users cannot identify the primary task in 5 seconds, it fails.
- If AI appears to modify formal business data without confirmation, it fails.
- If a module relationship is visually unclear, it fails.
- If button overload hides the primary action, it fails.

## 34. Role Usage

### UI Designer

Use `tokens.json`, `figma-page-manifest.json`, `component-manifest.json`, `interaction-guidelines.md` and `figma-build-prompts.md` to create the Figma library in phases. Do not start from page mockups; start from Variables, component sets and interaction patterns.

### Frontend Engineer

Use `tokens.json` as the shared token source, map component names from `component-manifest.json`, use `interaction-guidelines.md` for routing/drawer/modal/edit-state decisions, and use the Code Connect suggestions in this spec to align Figma components and code props.

### Product Manager

Use the template rules, `interaction-guidelines.md` and QA checklist to judge whether a page fits the business workflow: user task, AI boundary, container choice, confirmation point, exception handling, record tracking and source traceability.

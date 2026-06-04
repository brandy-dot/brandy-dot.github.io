# 101HR AI Figma Build Prompts

Use these prompts in sequence. Do not generate the entire design system in one run.

Global context for every phase:

```text
Build a 101HR AI admin design system for long-term B-side HR operations.
Use the provided tokens, page manifest and component manifest.
The visual direction is professional, restrained, bright 101HR blue, light gray-blue work background, white work surfaces, dense but readable information, clear status tags and table-first business workflows.
Do not use generic Ant Design, Arco or Material default visual styling.
Do not create marketing pages, decorative AI hero pages, glassmorphism, cyber tech style, excessive gradients or flashy dark mode.
Every component must be reusable, named, variant-ready, Auto Layout based and ready for Code Connect.
Before drawing any page or component, classify module relationships as same module, separate module or parent-child module. Use spacing, surface and action density to express hierarchy instead of adding repeated borders.
```

## Phase 1: Pages And Variables

```text
Create the Figma file structure from figma-page-manifest.json.

Create pages in this exact order:
Cover, Variables, Icons, Charts, Basic Components, Data Components, Feedback Components, Navigation Components, Interaction Patterns, AI Components, Business Components, Templates - Workbench, Templates - List, Templates - Card, Templates - Form, Templates - Detail, Templates - AI Onboarding, Templates - AI Ticket, Templates - Policy Assistant, Templates - Service Expedite, Templates - Smart Assistant, Templates - AI Ops, Dark Theme, Code Connect, QA.

Create Figma Variables collections:
Primitive, Theme / Light, Theme / Dark, Layout, Typography, Component, Motion, Chart.

Import token names and values from tokens.json.
Use slash-friendly Variable names such as Primitive/Color/Blue/600 and Theme/Light/Surface/Page.
Create Light and Dark modes where applicable.

Do not build components yet.
Create only documentation frames showing token swatches, text styles, spacing samples, radius samples, shadow samples and naming rules.

Acceptance:
- All required pages exist.
- Variables are created before components.
- Light and Dark theme tokens exist.
- Cover explains product scope and role usage.
```

## Phase 2: Icons, Charts, Typography, Color, Spacing, Radius, Shadow

```text
Build foundation assets using the Variables from Phase 1.

Icons:
- Create line icons for navigation, upload, attachment, send, voice, search, filter, expand, collapse, delete, edit, download, copy, check, warning, error, info, source, history and guide.
- Use 16, 18, 20 and 24px variants.
- Icon-only actions must include tooltip examples.

Charts:
- Create KPI, trend line, bar, horizontal bar, donut, funnel, heatmap and failure distribution chart components.
- Bind chart colors to Chart Variables.
- Every chart has title, time range, unit, loading and empty state.

Typography:
- Create styles for Page Title, Section Title, Card Title, Body, Body Strong, Caption, Table Header and Data Number.
- Use Chinese admin text examples.

Color, spacing, radius, shadow:
- Create visual reference frames for each token group.
- Show correct and incorrect examples for borders, card separation and module spacing.
- Add a Visual Governance reference frame showing:
  1. same module in one container,
  2. separate modules with ModuleGap,
  3. parent-child modules with reduced child weight,
  4. over-bordered card failure,
  5. stuck-container failure,
  6. double-divider failure.

Acceptance:
- No unbound colors.
- Icons are not broken or distorted.
- Charts do not duplicate random styles.
- Spacing references include independent module gap and related submodule gap.
- Visual Governance examples are present and labeled as pass/fail.
```

## Phase 3: Basic Components

```text
Build Basic Components from component-manifest.json.

Components:
Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, Tag, Badge, Tooltip, Upload, Tabs, Segmented, SearchInput.

Rules:
- Use Auto Layout on every component.
- Bind all fills, borders, text, radius and shadows to Variables.
- Create variants for size, tone, state and mode.
- Button text must be vertically centered.
- Tag text must be vertically centered.
- Upload must include icon mode, dropzone mode and file-list mode.
- Tabs default to hug-content width. Do not make "全部" wider than other tabs unless full-width mode is selected.
- IconButton must be used for compact attachment/upload/delete/send actions.

Acceptance:
- Components are named Component/Basic/{Name}.
- Variants are component variants, not duplicated detached components.
- No generic Ant Design, Arco or Material appearance.
```

## Phase 4: Data / Navigation / Feedback Components

```text
Build Data, Navigation, Feedback and AI Components from component-manifest.json.

Data:
Table, FilterBar, RecordList, DescriptionList, Statistic, Timeline, SourceCard, ResultSummary, FieldMappingTable, EmployeeReviewTable, TicketRecordList.

Navigation:
AppSidebar, ProductSidebar, Topbar, Breadcrumb, BackLink, StepStrip, Tabs, SubMenu.

Feedback:
Alert, Toast, Modal, Drawer, Popover, Empty, Loading, Progress, ConfirmBar, InlineError.

AI:
AIBoundaryAlert, AIPrimaryInput, AIProcessDetail, FieldStatusTag, IntentSummary, TrustSummary, SourceTrace, FollowUpQuestions, ActionPanel, AIResultSummary.

Rules:
- StepStrip must be one shared style across all templates.
- AIBoundaryAlert states limitations; it is not decoration.
- RecordList must prioritize status, title, result, owner/time and next action.
- SourceCard must differentiate original policy, interpretation, case and internal rule.
- Table actions must be consistently right-aligned.
- If two areas belong to one logical module, put them in one container with internal hierarchy.
- If two areas are independent modules, separate them by Layout/Space/ModuleGap.

Acceptance:
- No double divider lines.
- No adjacent containers stuck together.
- Tag and button text alignment is correct.
- All AI components have default, loading and result states where applicable.
```

## Phase 5: Interaction Patterns

```text
Build the Interaction Patterns page from interaction-guidelines.md.

Required frames:
1. Page Mode Matrix
2. Container Decision
3. Drawer vs Page
4. Modal vs Drawer
5. Layout Decision
6. Editing Decision
7. AI Draft To Formal Data
8. Records And History
9. Visual Governance
10. Action Density
11. Tag And Status Discipline
12. Interaction QA

Rules:
- This page is not a visual component page; it is the decision layer that tells PM, UI and frontend when to use each component/template.
- Show examples for 智能入职、智能特单办理、AI 政策库、服务单加急、智能助手 and 智能咨询后台.
- Every pattern must say when to use it, when not to use it, and what component/template it maps to.
- Include hard-fail examples: ambiguous adjacent containers, unnecessary modal, overwide three-column layout, vague record actions, and AI submitting formal data without confirmation.
- Include visual hard-fail examples: overuse of borders, tags used as decoration, too many text buttons, large input competing with generated results, and inconsistent StepStrip style.

Acceptance:
- PM can choose the page mode before writing the PRD.
- UI can choose page/drawer/modal/layout/editing mode before drawing.
- Frontend can map the decision to route, drawer, modal, inline edit and record expansion states.
- UI can classify module relationship and action density before adding cards/buttons.
```

## Phase 6: Admin Templates

```text
Build admin templates using components from earlier phases.

Required templates:
1. Templates - Workbench
2. Templates - List
3. Templates - Card
4. Templates - Form
5. Templates - Detail
6. Templates - AI Onboarding
7. Templates - AI Ticket
8. Templates - Policy Assistant
9. Templates - Service Expedite
10. Templates - Smart Assistant
11. Templates - AI Ops

Template rules:
- Start each template by stating the primary user task.
- Choose layout based on the task, not equal columns by default.
- Input-first pages make AI input prominent.
- Result-first pages make the confirmation table/form prominent.
- Tracking pages make records and filters prominent.
- Policy assistant keeps the input/answer flow prominent and places scenario templates as support.
- Service expedite is embedded decision support: ticket context and AI decision have clear roles.
- Smart assistant uses a conventional chat input: rounded input bar, compact tool icons, send icon or button aligned to the right.
- AI ops cards must visibly separate from the page background.
- Every template must mark primary, secondary and tertiary modules.
- Same logical modules must be one container with internal hierarchy.
- Separate modules must use ModuleGap and not appear visually stuck together.
- Generated business results must visually outrank the AI input after processing.
- Text-button count must be controlled; compact tool actions use IconButton.
- Tags must be semantic and placed near the object they describe.

Acceptance:
- Every sample page has Return to Toolset interaction.
- Every page has AI boundary or explicit confirmation rule when AI influences business data.
- Every page has realistic record/result states.
- Templates do not look like a marketing page or pure component showcase.
- Templates pass Visual Governance and Action Density checks.
```

## Phase 7: QA Report

```text
Create a QA page containing pass/fail evidence for:
1. Functional completeness
2. Visual consistency
3. Variables binding
4. Component naming
5. Auto Layout
6. Interaction decision correctness
7. Template hierarchy
8. Code Connect readiness
9. Dark theme readiness
10. Role signoff for PM, UI and frontend

For every issue, create a row:
Issue, location, severity, failed rule, suggested fix, owner.

Hard fail if:
- A page does not match 101HR admin style.
- Components are detached or not named.
- Variables are not bound.
- Primary task is unclear.
- AI appears to submit formal business data without user confirmation.
- Cards and modules are visually indistinguishable.
- Module relationships are ambiguous.
- Decorative tags, borders or buttons are used without business meaning.
- StepStrip, tabs, tags or buttons drift between templates.
```

## Repair Prompt: layout 混乱

```text
Audit this frame for layout hierarchy.
Identify the primary user task, secondary support content and tertiary metadata.
Rebuild the layout so the primary task gets the strongest visual weight.
If two blocks are one logical module, combine them into one container with header/body/footer.
If two blocks are separate modules, add Layout/Space/ModuleGap between them.
Remove unnecessary borders and double divider lines.
Use table/form/list surfaces based on business need, not repeated cards.
After repair, mark primary, secondary and tertiary modules in a small annotation frame and verify that the visual hierarchy matches that annotation.
```

## Repair Prompt: 图表重复

```text
Audit all chart components in this page.
Merge duplicate chart styles into the closest Chart component variant.
Bind all chart colors to Chart Variables.
Ensure each chart has title, unit, time range, loading state and empty state.
Remove decorative chart colors that do not encode data meaning.
```

## Repair Prompt: icon 破损

```text
Audit all icons in this frame.
Replace broken or manually drawn inconsistent icons with the Icons page components.
Use 16, 18, 20 or 24px line icon sizes only.
Icon-only buttons must include tooltip examples.
Do not use text buttons for upload, attachment, expand, collapse or delete when an icon button is clearer.
```

## Repair Prompt: 描边和卡片过多

```text
Audit this frame for border and card overuse.
Classify every visible container as same module, separate module or parent-child module.
Merge touching same-module cards into one container with header/body/footer.
Remove decorative borders that do not express input, table, focus, upload, selected or error state.
Use whitespace, typography and subtle fills to express hierarchy.
Keep business tables/forms as primary surfaces instead of wrapping every item in cards.
Fail the frame if primary, secondary and tertiary modules cannot be identified within 5 seconds.
```

## Repair Prompt: 按钮过多

```text
Audit all actions in this frame.
Keep only one primary button per module unless the module is explicitly an action toolbar.
Convert upload, attachment, delete, copy, download, expand, collapse, voice and send actions to IconButton with tooltip when context is clear.
Use Tabs or Segmented for mode switching instead of button groups.
Rename vague row actions such as 查看 to specific actions such as 查看进度, 继续处理 or 导出失败员工.
Ensure all buttons in the same action group share height and baseline.
```

## Repair Prompt: 标签语义不清

```text
Audit all tags in this frame.
For each tag, identify whether it means business status, required user action, AI/source state, risk or permission boundary.
Remove tags that are decorative or only create AI feeling.
Move field-level tags next to field labels or values.
Move module-level tags into module headers.
Center tag text vertically and bind tag height to Component/Tag tokens.
```

## Repair Prompt: 组件变体不足

```text
Audit this component set.
Add missing variants for size, tone, state, density and layout according to component-manifest.json.
Convert duplicated detached frames into component variants.
Ensure disabled, loading, focus and error states exist for form controls.
Ensure status components include success, warning, danger, review, duplicate, info and neutral tones.
```

## Repair Prompt: 变量未绑定

```text
Audit this page for unbound fills, strokes, text styles, spacing, radius and shadows.
Bind every value to the correct Variable collection.
Primitive values should not be used directly inside component instances when a Theme or Component token exists.
Report any remaining unbound value and why it cannot be bound.
```

## Repair Prompt: 风格跑偏

```text
Compare this page with the 101HR AI design principles:
professional, calm, dense, scan-friendly, operational, bright 101HR blue, restrained AI.
Remove marketing-style hero layouts, decorative gradients, glassmorphism, cyber/tech effects and excessive colored side bars.
Reduce card and border noise.
Restore white work surfaces, light gray-blue background, clear tables/forms/lists and semantic status colors.
The page fails if it looks like generic Ant Design, Arco, Material or a consumer AI chatbot.
```

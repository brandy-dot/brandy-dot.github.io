# 101HR AI Interaction Guidelines

Version: v2.1 interaction package
Date: 2026-06-03
Scope: 101HR AI product renovation, product-manager prototypes, component library, sample pages and frontend implementation.

## 0. Conclusion

The current interaction output is not yet enough for long-term product, design and frontend collaboration.

It is enough for visual exploration and sample-page review because the six AI product directions already have page shapes, components and basic states. It is not enough for production delivery because many decisions are still implicit:

- When to use a full page, drawer, modal, popover or inline expansion.
- When to use one column, two columns, three columns or a chat-plus-action layout.
- When a table/form should be edited inline, in a drawer, in a modal or on a new page.
- When AI input should be the primary surface, and when it should be secondary to a business table, form or record.
- How AI-generated content moves from suggestion to editable draft to confirmed business data.
- How records, errors, sources and confirmation actions should be placed so users understand the workflow.

This document turns those decisions into reusable interaction rules. PM can use it to write PRDs, UI designers can use it to select layouts and components, and frontend engineers can use it to map interaction states to code.

## 1. Core Interaction Principle

101HR AI pages should not ask users to "chat with AI" as the product goal. They should help users complete an HR business operation with AI assistance.

The page must make five things visible:

1. The business object: employee, service ticket, policy topic, SLA case, conversation, agent.
2. The user intent: input, confirm, supplement, submit, trace, configure.
3. The AI boundary: AI suggests, drafts, maps, checks or recommends; humans confirm formal changes.
4. The decision point: what must be confirmed before the next business state.
5. The recovery path: what to do when fields are missing, sources conflict, permissions fail or tools time out.

## 2. Page Mode Decision

Choose the page mode before choosing components.

| Product scenario | Page mode | Primary surface | AI role | Layout default |
| --- | --- | --- | --- | --- |
| 智能入职 | Task Processing | Employee confirmation table and exception queue after input | Identify, merge, map, check, draft | Single-column workbench, input first then result-first |
| 智能特单办理 | Intent Routing | Service form confirmation | Recognize intent, extract fields, prefill draft | Single-column workflow, form confirmation dominates after recognition |
| AI 政策库 / 小鲲 | Trusted Q&A | Policy answer workspace | Retrieve, cite, reason, recommend | Conversation workspace with structured answer and source area |
| 服务单加急 | Process Embedded | Existing service-ticket context | Judge rules, explain risk, propose action | Two-column: main ticket facts + right AI decision |
| 智能助手 | Conversation Action | Conversation plus action panel | Split tasks, call tools, produce actions | Two-column: chat left, action/result right |
| 智能咨询后台 | Operations Configuration | Agent/configuration table and detail panel | Monitor, diagnose, route, recover | Dashboard/list-detail, no large AI input |

Hard rule: never force all AI pages into a chat layout. Chat is a carrier only when the user's real workflow requires multi-turn clarification.

## 3. AI Input Priority Rules

AI input should be prominent only when input is the user's first real action.

Use a primary AI input when:

- The user starts from unstructured material, such as customer Excel, email, chat records or natural language.
- The page goal is to transform input into a business draft.
- The user does not yet have a stable business object selected.

Examples:

- 智能入职 default state.
- 智能特单办理 demand input.
- AI 政策库 question input.

Do not make AI input primary when:

- The user is already inside a known business object, such as a service ticket detail.
- The page is for monitoring, configuration or exception handling.
- The user needs to inspect a table, timeline or records before acting.

Examples:

- 服务单加急: service-ticket facts and SLA are primary; AI judgment is secondary.
- 智能咨询后台: agent status and failure samples are primary.
- 入职解析完成后: employee confirmation table is primary; input collapses into current-task summary.

## 4. Container Decision: Page, Drawer, Modal, Popover, Inline

| Container | Use when | Do not use when | 101HR AI examples |
| --- | --- | --- | --- |
| Full page | The task is a complete workflow with input, confirmation, exception handling and records. | The user only needs to inspect a detail or perform a small correction. | 智能入职、智能特单、AI 政策助手、运营后台 |
| Drawer | The user needs side detail while keeping the current list/form context. | The detail is the primary work object or requires many sequential steps. | Employee detail, source detail, field mapping detail, service record detail |
| Modal | The user is about to commit a high-risk or irreversible action. | The user needs to browse, compare or edit many fields. | Confirm submit, only submit eligible employees, expedite confirmation |
| Popover | The user needs a short explanation, field source, confidence or tooltip-like hint. | The content is long, editable or has multiple actions. | Field source snippet, source number explanation, tag meaning |
| Inline expansion | The user needs quick row-level details without leaving the table/list. | Expanded content contains a full form or long record history. | Record row details, process steps, recent handling details |
| Toast | A low-risk action completed or failed and does not block workflow. | The result changes business state and must be recorded. | Copied, exported, saved filter |

### Drawer vs New Page

Use Drawer if the user needs to preserve the current work context. Use a new page if the work has its own lifecycle, navigation, permissions or records.

Drawer is right for:

- View employee extraction detail from a confirmation table.
- Modify one employee's missing fields.
- View source policy text next to an answer.
- Inspect one service-ticket record.

New page is right for:

- Formal service-ticket detail.
- Full employee profile.
- Agent configuration with version release and rollback.
- Long historical policy source library.

### Modal vs Drawer

Use Modal for decision, Drawer for work.

- Modal asks: "Are you sure to do this?"
- Drawer supports: "Inspect or edit this thing without losing context."

## 5. Layout Decision: One Column, Two Columns, Three Columns

| Layout | Use when | Main risk | 101HR AI rule |
| --- | --- | --- | --- |
| One-column workflow | The task is sequential and each step should take full width. | Page becomes too long. | Collapse AI process, use summary strips, keep result table full width. |
| Two-column | One side is primary work and the other is supporting detail/action. | Both columns look equally important. | Use 65/35 or 70/30. Do not use equal columns unless both sides are truly equal. |
| Three-column | There are three stable panes with different roles: nav, conversation/list, detail/result. | Information becomes cramped and unreadable. | Only use when each pane has a persistent role. Avoid three equal content columns. |
| List-detail | The user selects a record and inspects detail. | Detail panel steals space from dense lists. | Keep list usable; detail can be drawer on smaller screens. |
| Chat-action | Conversation and executable action must coexist. | Chat input and action panel compete. | Chat input stays conventional; actions appear as distinct panel, not another chat bubble. |

### When Two Columns Are Appropriate

Use two columns when one side is the user's current object and the other side is AI assistance:

- 服务单加急: left service-ticket facts, right AI expedite judgment.
- 智能助手: left conversation, right executable action / fallback path.
- 政策答案 after answer: main answer plus right or lower source/detail panel, depending on width.

Use full-width instead when the primary object is a dense table or form:

- 智能入职 employee confirmation table.
- 智能特单 business form confirmation.
- 运营后台 agent table.

### When Three Columns Are Appropriate

Use three columns only when all three panes are persistent and semantically different:

- Left navigation.
- Middle primary conversation/list.
- Right result/detail/action.

Do not use three equal cards merely to show "input / output / suggestion". That creates weak hierarchy and wastes space.

## 6. Editing Decision: Inline, Drawer, Modal, New Page

| Editing method | Use when | Constraints | Examples |
| --- | --- | --- | --- |
| Inline table edit | Small field correction, high-frequency, low-risk, row context matters. | Only 1-3 fields per row; validation visible immediately. | Missing phone, certificate number, city correction in employee table |
| Inline form edit | The form itself is the main task. | Field status must remain visible after edit. | Service-ticket draft confirmation |
| Drawer edit | User edits one object's detail while preserving list/table context. | Save/cancel inside drawer; show changed fields. | Employee detail correction, source mapping correction |
| Modal edit | A small required value blocks one action. | No long forms; no multi-step editing. | Fill one missing reason before submit |
| New page edit | The object has complex lifecycle, audit, permissions or multiple sections. | Must support route, breadcrumb, record and save status. | Agent config, formal service-ticket detail, employee profile |

Hard rule: do not open a new page just to modify one missing AI field. Use inline edit or drawer.

## 7. AI Draft To Business Data Flow

Every AI-generated business object must pass through these states:

1. Input captured.
2. AI processing summarized.
3. Draft generated.
4. User can edit and supplement.
5. Required exceptions are resolved or explicitly skipped.
6. User confirms submit.
7. System records result and failure reasons.

Never jump from AI result directly to formal submission.

### Required confirmation points

| Scenario | Must confirm before |
| --- | --- |
| Create onboarding task | Employee identity, required fields, conflict/duplicate handling |
| Submit service ticket | Business type, employee, date range, purpose, required fields |
| Send customer reply | Reply text, cited policy, sensitive data exposure |
| Expedite service ticket | Permission, SLA rule, non-commitment wording, audit record |
| Apply policy answer | Source freshness, scope, city, customer applicability |
| Change agent configuration | Affected route, version, rollback path |

## 8. Records And History Interaction

Records are not logs. They should show business result and next action.

Each record row should follow this order:

1. Status.
2. Business title.
3. Result summary.
4. Owner and time.
5. Next action.
6. Expand/detail action.

Use "查看详情" only for one specific record. Use "查看全部记录" for the record module. Avoid simultaneous vague actions such as "查看", "查看全部", "查看全部 3 条".

Record list rules:

- Default view shows recent and actionable records.
- "All records" can open full page or expand module if history is the page's secondary task.
- Row expansion shows employee/detail rows, missing fields, failure reason and next step.
- If records become the primary task, use a dedicated list page.

## 9. AI Process Visibility

AI process should be transparent but not dominant.

Default state:

- Show compact summary: "AI 已完成识别，发现 3 个待补充字段、1 个冲突字段。"
- Offer "查看处理过程".

Expanded state:

- Show steps, status, duration and failure reason.
- Keep it below or inside the current task; do not place it above the main result after processing completes.

Use expanded process by default only when:

- The user is debugging an Agent or API failure.
- The page is an operations backend.
- The process itself is the product value, such as tool-call trace.

## 10. Field Status And Correction Rules

Field states must guide the user's next action.

| Field state | Visual treatment | User action |
| --- | --- | --- |
| AI 已识别 | Blue/light status, normal input value | Review if needed |
| AI 推断，需确认 | Yellow/orange tag near field label | Confirm or edit |
| 待补充 | Red/error border or tag | Required input before submit |
| 存在冲突 | Yellow conflict tag and source hint | Pick source or edit |
| 格式错误 | Error border and inline error | Correct format |
| 无法识别 | Neutral/error tag | Re-enter or upload clearer material |
| 未匹配 | Gray tag | Map manually or ignore |

Do not use color bars as decoration. Color must mean a state that changes user action.

## 11. Per-Product Interaction Requirements

### 智能入职

- Default: input is primary.
- After parsing: employee confirmation table becomes primary; input collapses into task summary.
- Field mapping can be a drawer or collapsible section; expand automatically only when there are unmatched fields.
- Employee detail correction uses drawer; small missing fields can be inline.
- Submit uses modal only if there are abnormal employees.
- Records show identified, submitted, failed and skipped counts.

### 智能特单办理

- Default: natural-language demand input is primary.
- After recognition: service form confirmation becomes primary.
- AI recognition summary is compact and expandable.
- Missing required fields stay in the form, not in a separate card.
- Employee selection conflicts use drawer or inline picker.
- Submit is disabled for missing required fields; inferred fields trigger confirmation modal.

### AI 政策库 / 小鲲

- Keep conversation because policy questions require follow-up.
- The AI answer must be structured as policy solution, not a single bubble.
- Source references are part of the answer, but detailed source text can be drawer.
- Scenario templates should assist input, not compete with the input.
- Multi-city compare opens configuration panel or modal depending on complexity; result uses table.
- Follow-up questions sit below the answer, not above source credibility.

### 服务单加急

- Existing service-ticket context is primary.
- AI judgment sits as right panel or drawer, not as a separate full-page wizard.
- Rule judgment and permission check must be visible before confirmation.
- High-risk action uses modal with impact object, non-commitment boundary and audit note.
- If user has no permission, show approval path and save-suggestion alternative.

### 智能助手

- Use conventional chat composer: input field plus icon buttons for attachment/voice/send.
- Action panel is visually separate from chat; it is not another message bubble.
- Multi-intent recognition produces action queue.
- If a task becomes a service ticket or onboarding draft, open the relevant form drawer or linked page.
- Handoff keeps context and failure reason.

### 智能咨询后台

- No large chat input by default.
- KPI, agent table, dependency status and failure samples are primary.
- Details use right panel or drawer.
- Configuration changes require version, impact scope and rollback confirmation.
- Failure samples use table/list and batch operations.

## 12. Role-Based Usage

### Product Manager

Use this file to decide:

- Product mode.
- Primary user task.
- Required confirmation point.
- Record result fields.
- Exception recovery path.

PRD must include:

- Page mode.
- AI role.
- Container choice.
- Layout choice.
- Editing method.
- Required states.

### UI Designer

Use this file to choose:

- Page template.
- Drawer/modal/inline interaction.
- Column ratio.
- Field status display.
- Record list structure.

Design review must fail if:

- Module relationship is unclear.
- The same visual weight is given to input, AI process, result and records.
- Buttons replace icon actions and make the page noisy.
- AI process steals focus from business result after processing completes.

### Frontend Engineer

Use this file to implement:

- Component states.
- Drawer/modal routing.
- Inline edit validation.
- Record expansion.
- Submit guards.
- Responsive behavior.

Implementation must expose:

- `pageMode`
- `aiTaskState`
- `fieldStatus`
- `recordStatus`
- `containerMode`
- `editMode`
- `submitGuard`

## 13. Responsive Rules

Desktop:

- Use one-column workflow for dense forms/tables.
- Use two-column only when one side is clearly supporting.
- Keep record list readable; avoid squeezing dense table into narrow side panels.

Tablet:

- Two-column becomes stacked sections.
- Right panel becomes drawer or below-main details.
- Step strip can scroll horizontally.

Mobile:

- Use single-column.
- Drawer becomes full-screen sheet or page section.
- Tables become horizontal scroll, card rows or simplified columns.
- Primary action sticks to bottom only when the user is in a confirmation step.

## 14. QA Checklist For Interaction

Hard fail if any item is true:

- Primary task is unclear within 5 seconds.
- AI appears to submit formal data without human confirmation.
- Drawer/modal/page choice cannot be explained from task risk and context.
- Two independent modules touch each other without spacing or a shared parent container.
- A table/form edit opens a new page when inline or drawer edit is sufficient.
- A high-risk action uses toast instead of modal confirmation.
- Record actions use vague labels such as "查看" without an object.
- AI process detail is more prominent than the business result after processing completes.
- Three-column layout is used without three persistent roles.


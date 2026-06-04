# 101HR AI Design System QA Checklist

Use this checklist for Figma, Codex-generated HTML and production implementation.

## 0. Hard Fail Standards

The work fails immediately if any item is true:

- 不符合 101HR AI 后台风格即不通过。
- The page does not visually match 101HR admin style.
- It looks like generic Ant Design, Arco, Material, a marketing page or a consumer AI chatbot.
- Variables are not bound in Figma components.
- Component names do not follow the manifest.
- A component cannot be reused, variant-ed or mapped to code.
- The primary user task is unclear within 5 seconds.
- AI appears to submit or modify formal business data without explicit user confirmation.
- Module relationships are visually unclear: two modules touch, or one module is split into ambiguous containers.
- Buttons replace icon actions so heavily that the action area becomes noisy.
- Status colors are decorative rather than semantic.
- The page cannot explain which module is primary, secondary and tertiary.
- A large AI input remains visually primary after a business draft/result has already been generated.
- Step strip style differs across sample pages without a documented reason.

## 1. Functional Completeness

- [ ] The page states the user role and primary task.
- [ ] The page has an AI boundary or confirmation rule when AI influences business data.
- [ ] Input, result, confirmation, exception handling and record tracking exist where required by the product mode.
- [ ] All primary buttons trigger visible state changes.
- [ ] Loading, empty, error and success states exist.
- [ ] Records show business results, not only operation logs.
- [ ] Expand/collapse interactions are available for records, process details and source details.
- [ ] Drawer, Modal and Toast interactions are present where specified.
- [ ] Return to Toolset works on every sample page.

## 2. Visual Style Consistency

- [ ] Bright 101HR blue is used for navigation, active states and primary action.
- [ ] Page background is light gray-blue, not pure white.
- [ ] Primary work surfaces are white.
- [ ] Cards do not overuse heavy borders.
- [ ] Independent modules have at least `Layout/Space/ModuleGap`.
- [ ] Related submodules have `Layout/Space/SectionGap`.
- [ ] No double divider lines.
- [ ] No adjacent containers stuck together.
- [ ] Tags and buttons are vertically centered.
- [ ] Buttons have consistent height by size.
- [ ] The number of visible text buttons is controlled; icon buttons are used for compact actions.
- [ ] Status colors match business meaning.
- [ ] Tables, forms and lists are used where they fit the workflow better than cards.

## 2.1 Visual Governance Check

- [ ] Every visible block is classified as same module, separate module or parent-child module.
- [ ] Same-module sections use one shared container with internal hierarchy.
- [ ] Separate modules use at least `Layout/Space/ModuleGap`.
- [ ] Parent-child modules reduce child visual weight through softer fill, smaller radius or no extra border.
- [ ] The primary work module is visually dominant.
- [ ] Secondary modules support the primary task and do not compete with it.
- [ ] Tertiary metadata is visibly lighter than primary business content.
- [ ] Borders are used for inputs, tables, upload zones, focus and selected states, not general decoration.
- [ ] No module uses both strong border and strong shadow.
- [ ] Page-level cards and child blocks do not share identical visual weight.
- [ ] AI processing details are compact after completion.
- [ ] Scenario templates are visually secondary to the input/composer.
- [ ] Record rows follow status -> title -> result -> owner/time -> action order.
- [ ] Large blank areas in record rows are not used unless reserved for expansion.

## 2.2 Action And Component Density Check

- [ ] Each module has no more than one primary action unless it is explicitly an action toolbar.
- [ ] Upload, attachment, delete, copy, download, expand, collapse, voice and send use IconButton when context is clear.
- [ ] Icon-only actions have tooltip labels.
- [ ] Buttons in the same group have the same height and baseline.
- [ ] Filter chips, tabs and segmented controls use hug-content width by default.
- [ ] A tab named "全部" is not wider than neighboring tabs unless full-width tabs are intentionally specified.
- [ ] Row-level actions use precise labels such as `查看进度`, `继续处理`, `导出失败员工`.
- [ ] Vague actions such as standalone `查看` are avoided unless the object is unambiguous.

## 2.3 Tag And Status Check

- [ ] Every colored tag has a documented semantic meaning.
- [ ] Field-level tags are placed next to field label or field value.
- [ ] Module-level tags are placed in the module header.
- [ ] Tags do not float in arbitrary corners.
- [ ] Tag text is vertically centered.
- [ ] Dense rows show no more than two tags unless the row is a status summary.
- [ ] Decorative color bars or tags used only for "AI feeling" are removed.

## 3. Figma Variables Check

- [ ] Primitive collection exists.
- [ ] Theme / Light collection exists.
- [ ] Theme / Dark collection exists.
- [ ] Layout collection exists.
- [ ] Typography collection exists.
- [ ] Component collection exists.
- [ ] Motion collection exists.
- [ ] Chart collection exists.
- [ ] No raw hex colors remain in component instances.
- [ ] No raw spacing values remain in component instances.
- [ ] Radius and shadows are bound to Variables.
- [ ] Light and dark mode values are both defined.
- [ ] Dark mode contrast is checked and does not become flashy.

## 4. Component Naming Check

- [ ] Basic components use `Component/Basic/{Name}`.
- [ ] Data components use `Component/Data/{Name}`.
- [ ] Navigation components use `Component/Navigation/{Name}`.
- [ ] Feedback components use `Component/Feedback/{Name}`.
- [ ] AI components use `Component/AI/{Name}`.
- [ ] Business components use `Component/Business/{Name}`.
- [ ] Templates use `Template/{Category}/{Name}`.
- [ ] Variant properties use stable names: `variant`, `size`, `tone`, `state`, `density`, `layout`, `mode`.
- [ ] No duplicate component set names.

## 5. Auto Layout Check

- [ ] Every component uses Auto Layout.
- [ ] Text wraps or truncates according to documented rules.
- [ ] Button width hugs content unless full-width variant is selected.
- [ ] IconButton has fixed width and height.
- [ ] Tags have fixed height and centered text.
- [ ] Cards use vertical Auto Layout with explicit gap.
- [ ] Tables use a scrollable frame for dense columns.
- [ ] Record rows align status, title, result, owner/time and actions predictably.
- [ ] Responsive frames exist for desktop, tablet and mobile where needed.

## 6. Admin Template Check

- [ ] Workbench template has a clear primary task area.
- [ ] List template has usable filters, search, table/list and empty states.
- [ ] Card template avoids equal-weight card noise.
- [ ] Form template shows AI-filled, inferred, missing and conflict field states.
- [ ] Detail template separates business facts, timeline, source and actions.
- [ ] AI onboarding template supports input, mapping, backfill check, confirmation, submit result and records.
- [ ] Smart ticket template supports demand input, recognition, form confirmation and service record.
- [ ] Policy assistant template supports trusted answer, source trace, recommendation, export and feedback.
- [ ] Service expedite template is embedded in service-ticket context.
- [ ] Smart assistant template uses a conventional chat input and a distinct action panel.
- [ ] AI ops template has visible card contrast and clear operations priority.

## 7. AI Component Check

- [ ] AI input is primary only when input is the main task.
- [ ] AI processing detail is summarized by default and expandable.
- [ ] AI boundary is stated in plain business language.
- [ ] Field-level status tags are semantic.
- [ ] Source trace shows source type, title, organization, publish date and update date.
- [ ] Follow-up recommendations are context-specific.
- [ ] AI suggestions never imply automatic formal submission.

## 8. Interaction Decision Check

- [ ] Page mode is declared before layout: task processing, intent routing, trusted Q&A, process embedded, conversation action or operations configuration.
- [ ] AI input priority matches the workflow: input-first pages foreground input; result-first pages foreground table/form/answer.
- [ ] Drawer is used for side detail or single-object editing while preserving context.
- [ ] Modal is used only for high-risk confirmation or small blocking decisions.
- [ ] New page is used only when the object has its own lifecycle, route, permissions or audit trail.
- [ ] Popover is limited to short hints, source snippets, confidence explanations or tooltips.
- [ ] Inline expansion is used for row-level details and does not become a full secondary page.
- [ ] One-column, two-column, three-pane, list-detail or chat-action layout is justified by task role.
- [ ] Two-column layouts use a clear main/support relationship, usually 65/35 or 70/30.
- [ ] Three-column layouts are used only when all three panes have persistent roles.
- [ ] Inline table editing is limited to low-risk, high-frequency, small field corrections.
- [ ] Drawer editing is used for multi-field object correction without losing table/list context.
- [ ] The confirmation point before formal business data submission is visible.
- [ ] Records show status, business title, result summary, owner/time and next action in predictable order.
- [ ] Vague record actions such as simultaneous “查看 / 查看全部 / 查看全部 3 条” are not used.
- [ ] Current workflow state is declared: before processing, processing, draft generated, confirmation, submitted or tracking.
- [ ] AI input priority matches the current workflow state.
- [ ] Generated business results outrank AI input after draft generation.
- [ ] Same-module vs separate-module relationship is visually evident without reading annotations.
- [ ] StepStrip uses the shared compact style and does not create double dividers.

## 9. Code Connect Readiness

- [ ] Each Figma component has a code component name.
- [ ] Variant names match frontend props.
- [ ] Token names can map to CSS custom properties or theme variables.
- [ ] Business templates map to page-level components.
- [ ] Table, record and form data shapes are documented.
- [ ] No component depends on manually positioned child layers.

## 10. Product Manager Review

- [ ] User role is explicit.
- [ ] Business objective is explicit.
- [ ] Required fields, exceptions and confirmation points are visible.
- [ ] Records show meaningful business result.
- [ ] The page supports the real workflow described in the PRD.
- [ ] AI confidence, source, boundary or risk is shown where needed.
- [ ] The selected page mode and container choice match the business scenario.

## 11. UI Designer Review

- [ ] Visual hierarchy is clear.
- [ ] Primary action is obvious.
- [ ] Secondary actions are restrained.
- [ ] Spacing follows the 4px scale.
- [ ] Card and module relationships are readable.
- [ ] Components are built as reusable variants.
- [ ] Dark theme frame is checked.
- [ ] Container relationships are visually unambiguous: one module is one container, separate modules have module gap.
- [ ] Interaction Patterns page rules are followed before creating a new template.

## 12. Frontend Engineer Review

- [ ] Tokens are implementable.
- [ ] Component names align with code.
- [ ] States are implementable.
- [ ] Responsive behavior is specified.
- [ ] Interactions are not only visual.
- [ ] Code Connect mapping is clear.
- [ ] No hard-coded one-off visual decisions are required.
- [ ] Routes, drawers, modals, popovers, inline edits and record expansions have distinct implementation states.

## 13. Final Signoff

Pass only when:

- [ ] PM confirms the business workflow is correct.
- [ ] UI confirms visual style and component reuse.
- [ ] Frontend confirms token and component mapping.
- [ ] QA confirms no hard-fail rule is triggered.

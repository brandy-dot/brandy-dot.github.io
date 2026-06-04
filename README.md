# 101HR AI 产品设计体系 v2.0

## 使用顺序

1. 打开 `index.html` 看项目总览。
2. 打开 `requirement-analysis.html` 先理解业务差异。
3. 打开 `trust-patterns.html` 确认不同场景的可信表达。
4. 打开 `state-matrix.html` 查看通用状态和场景专属状态。
5. 打开 `component-library.html` 查看收窄后的组件定义。
6. 打开 `product-samples.html` 看逐产品样板。
7. 打开 `frontend-tokens.html` 给研发对齐 token、class 和数据模型。
8. 打开 `delivery-matrix.html` 检查产品样板、组件库、规范和前端标准是否闭环。

## v2.0 修正点

- 不再把字段置信度泛化到所有 AI 功能。
- 不再把低置信作为所有产品必备状态。
- 不再让所有功能都使用强确认。
- 不再让所有页面都变成三栏工作台。
- 政策类可信表达改为来源、更新时间、适用范围和冲突状态。
- 前端数据模型按业务分型，不强行使用一个通用 AI model。

## 推荐推进

先以智能入职、智能特单办理、AI 政策库作为核心样板，再扩展服务单加急、Chat/智能助手和运营后台。每新增或重构一个页面，都需要回写三件事：

- 组件库：沉淀到基础组件、AI 通用组合、101HR 业务组件或场景级模块。
- 状态矩阵：补充任务级、对象级、字段级、来源级、权限级或运营级状态。
- 前端落地：补充 class 命名、token、响应式和复用边界。

## 独立产品样板

- `smart-onboarding-tool.html`：智能入职，任务处理型。
- `smart-ticket-tool.html`：智能特单办理，意图分流型。
- `smart-policy-assistant.html`：AI 政策库 / 小鲲，可信问答型。
- `service-expedite-tool.html`：服务单加急，流程嵌入型。
- `smart-assistant-tool.html`：智能助手，对话动作型。
- `ai-ops-dashboard.html`：智能咨询后台，运营配置型。

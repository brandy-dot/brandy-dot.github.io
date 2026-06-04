(() => {
  const $ = (s) => document.querySelector(s);
  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[char]));
  const toast = (title, detail = "") => {
    let node = document.querySelector(".demo-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "demo-toast";
      document.body.appendChild(node);
    }
    node.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    node.classList.add("show");
    setTimeout(() => node.classList.remove("show"), 2200);
  };

  const openScenarioModal = (title, body, actions = "<button class='btn primary' data-scenario-action='close-scenario-modal'>知道了</button>") => {
    document.querySelector(".demo-modal-mask")?.remove();
    const mask = document.createElement("div");
    mask.className = "demo-modal-mask";
    mask.innerHTML = `<div class="demo-modal"><div class="demo-modal-head">${title}</div><div class="demo-modal-body">${body}</div><div class="demo-modal-foot">${actions}</div></div>`;
    document.body.appendChild(mask);
  };

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-scenario-action]")?.dataset.scenarioAction;
    if (!action) return;

    if (action === "close-scenario-modal") {
      document.querySelector(".demo-modal-mask")?.remove();
    }

    if (action === "scenario-guide") {
      openScenarioModal(
        "操作指南",
        "<p>AI 只生成判断、草稿、建议和留痕内容，不会绕过权限直接写入正式流程。高风险动作需要人工确认；无权限时提供申请路径和替代动作。</p>"
      );
    }

    if (action === "evaluate-expedite") {
      $("#expedite-summary").innerHTML = "<strong>建议关注，但不能直接打标</strong><p>已命中 SLA 关注线；当前账号无加急权限，需保存建议或发起审批。</p>";
      $("#expedite-result")?.classList.remove("is-hidden");
      event.target.textContent = "重新判断";
    }

    if (action === "confirm-expedite") {
      $("#expedite-records")?.insertAdjacentHTML("afterbegin", "<tr><td><span class='tag success'>已留痕</span></td><td>SO20260519032</td><td>保存加急建议，未承诺完成时间</td><td>王敏</td><td>刚刚</td><td>查看日志</td></tr>");
      $("#expedite-audit-result")?.classList.remove("is-hidden");
      toast("已确认留痕", "AI 判断、确认人和不可承诺边界已保存。");
    }

    if (action === "save-expedite-advice") {
      $("#expedite-records")?.insertAdjacentHTML("afterbegin", "<tr><td><span class='tag'>已保存</span></td><td>SO20260519032</td><td>保存加急建议，等待权限审批</td><td>王敏</td><td>刚刚</td><td><button class='link-btn'>继续审批</button></td></tr>");
      toast("已保存加急建议", "不会修改服务单优先级，后续可继续发起审批。");
    }

    if (action === "start-expedite-approval") {
      $("#expedite-approval-result")?.classList.remove("is-hidden");
      $("#expedite-approval-result")?.scrollIntoView({ behavior:"smooth", block:"start" });
      toast("已生成审批申请", "服务单、规则判断和客户紧急原因已带入。");
    }

    if (action === "assistant-send") {
      const command = $("#assistant-command")?.value?.trim() || "张萌，北京，签证用，需要查 SO20260519032";
      $("#assistant-thread")?.insertAdjacentHTML("beforeend", `<div class='message-row user'>${escapeHtml(command)}</div><div class='message-row ai'>已识别 3 个任务：政策解释、创建参保证明服务单草稿、查询历史进度。</div>`);
      $("#assistant-action-list").innerHTML = "<div><span class='tag warn'>需确认</span><strong>参保证明服务单草稿</strong><p>员工张萌，城市北京，用途签证，模板需确认。</p></div><div><span class='tag cyan'>已查询</span><strong>服务单进度查询</strong><p>SO20260519032 当前在供应商处理中。</p></div><div><span class='tag'>可选</span><strong>人工接管</strong><p>客户要求立即反馈时，保留上下文交给人工处理。</p></div>";
      $("#assistant-result")?.classList.remove("is-hidden");
      $("#assistant-tool-section")?.classList.remove("is-hidden");
      $("#assistant-records")?.insertAdjacentHTML("afterbegin", "<tr><td><span class='tag warn'>待确认</span></td><td>张萌参保证明和进度</td><td>3 个任务</td><td>已生成动作草稿</td><td>刚刚</td></tr>");
    }

    if (action === "assistant-policy-answer") {
      $("#assistant-policy-result")?.classList.remove("is-hidden");
      $("#assistant-policy-result")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    if (action === "assistant-open-ticket") {
      $("#assistant-ticket-draft")?.classList.remove("is-hidden");
      $("#assistant-ticket-draft")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    if (action === "assistant-show-timeline") {
      $("#assistant-timeline-result")?.classList.remove("is-hidden");
      $("#assistant-timeline-result")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    if (action === "assistant-submit-ticket") {
      $("#assistant-records")?.insertAdjacentHTML("afterbegin", "<tr><td><span class='tag success'>已转单</span></td><td>张萌参保证明申请</td><td>服务单草稿</td><td>SO20260601001</td><td>刚刚</td></tr>");
      toast("服务单草稿已创建", "已保留对话来源、工具调用和人工确认记录。");
    }

    if (action === "assistant-confirm-send") {
      openScenarioModal(
        "发送前确认",
        "<p>这条客户回复包含 AI 生成内容和政策边界。发送前请确认用途模板、服务单状态和不可承诺完成时间。</p>",
        "<button class='btn' data-scenario-action='close-scenario-modal'>取消</button><button class='btn primary' data-scenario-action='assistant-send-final'>确认发送</button>"
      );
    }

    if (action === "assistant-send-final") {
      document.querySelector(".demo-modal-mask")?.remove();
      toast("已发送客户回复", "回复内容和确认人已写入会话留痕。");
    }

    if (action === "assistant-handoff") {
      $("#assistant-action-list").innerHTML = "<div><span class='tag danger'>人工接管</span><strong>已保留上下文</strong><p>客户原话、员工候选、工具调用记录和服务单候选将一起交接。</p></div>";
      toast("已转人工接管", "上下文已保留，等待客服确认。");
    }

    if (action === "ops-refresh") {
      $("#ops-requests").textContent = "12,539";
      $("#ops-failures").textContent = "34";
    }

    if (action === "ops-fix") {
      $("#ops-detail").innerHTML = "<div class='card-title-row'><div><h2>参保证明 Agent</h2><p>缺少用途模板字段映射。</p></div><span class='tag warn'>配置缺失</span></div><div class='closure-list'><div><strong>建议动作</strong><p>补充“签证用途模板”和“中英文版本”映射。</p></div><div><strong>影响范围</strong><p>特单智能办理、智能助手转服务单。</p></div></div>";
    }

    if (action === "ops-repair") {
      $("#ops-detail").innerHTML = "<div class='card-title-row'><div><h2>流程代理 Agent</h2><p>消息 API 权限失败。</p></div><span class='tag danger'>API 失败</span></div><div class='closure-list'><div><strong>失败原因</strong><p>供应商通知接口 token 过期。</p></div><div><strong>兜底</strong><p>保留服务单备注，转人工通知供应商。</p></div></div>";
    }

    if (action === "ops-detail") {
      $("#ops-detail").innerHTML = "<div class='card-title-row'><div><h2>入职解析 Agent</h2><p>路由、依赖、样本和版本状态。</p></div><span class='tag success'>运行中</span></div><div class='closure-list'><div><strong>路由条件</strong><p>入职资料解析、字段映射、员工草稿。</p></div><div><strong>依赖</strong><p>OCR、员工 API、入职模板、客户字段映射。</p></div><div><strong>样本状态</strong><p>3 条字段映射失败样本待复核。</p></div></div>";
    }

    if (action === "ops-mark-sample") {
      toast("样本已标注", "错误类型：过度承诺；归因：政策边界缺失。");
    }

    if (action === "ops-view-change") {
      $("#ops-release-result")?.classList.remove("is-hidden");
      $("#ops-release-result")?.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    if (action === "ops-publish") {
      $("#ops-release-result")?.classList.remove("is-hidden");
      $("#ops-release-result .card-title-row .tag").textContent = "已发布";
      $("#ops-release-result .card-title-row .tag").className = "tag success";
      toast("已发布全量", "版本 agent-routing-2026.05.28 已发布，回滚入口保留。");
    }

    if (action === "ops-rollback") {
      $("#ops-release-result")?.classList.remove("is-hidden");
      $("#ops-release-result .card-title-row .tag").textContent = "已回滚";
      $("#ops-release-result .card-title-row .tag").className = "tag warn";
      toast("已回滚到上一版本", "影响范围和失败样本已记录。");
    }
  });
})();

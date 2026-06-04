(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const modeDescriptions = {
    "综合回答": "结合政策、案例和经办规则输出完整方案。",
    "仅搜索原文政策": "只基于官方红头文件回答，弱化案例和内部口径。",
    "案例辅助分析": "结合真实案例和政策依据输出风险建议。",
    "多城市对比": "生成不同城市政策对比表，适合成本和待遇差异分析。"
  };

  let statusTimer;
  let toastTimer;

  const toast = (title, detail = "") => {
    let node = $(".demo-toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "demo-toast";
      document.body.appendChild(node);
    }
    node.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    node.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
  };

  const openModal = (id) => $(id).classList.remove("is-hidden");
  const closeModal = (id) => $(id).classList.add("is-hidden");

  const setPrompt = (text) => {
    $("#policy-input").value = text;
    $("#policy-input").focus();
  };

  const sendQuestion = (question = $("#policy-input").value.trim()) => {
    if (!question) {
      toast("请输入政策问题", "可以点击场景卡片自动生成专业问题。");
      return;
    }
    $("#policy-home").classList.add("is-answered");
    $("#scenario-card").classList.add("is-hidden");
    $("#answer-workspace").classList.remove("is-hidden");
    $("#question-text").textContent = question;
    $("#policy-answer-content").classList.add("is-hidden");

    const statuses = [
      ["正在检索政策来源...", "官方红头文件、政策解读、案例库和 101HR 经办规则正在匹配。"],
      ["正在分析适用城市...", "已识别适用地区为北京市，正在核对政策主题和生效范围。"],
      ["正在生成办理方案...", "正在整理结论摘要、政策要点、办理清单和风险提示。"],
      ["已完成", "已生成可溯源政策方案，关键结论已关联来源编号。"]
    ];
    let index = 0;
    clearInterval(statusTimer);
    const renderStatus = () => {
      const [title, detail] = statuses[index];
      $("#answer-status").innerHTML = index < statuses.length - 1
        ? `<div class="spin"></div><strong>${title}</strong><span>${detail}</span>`
        : `<span class="tag success">已完成</span><strong>${title}</strong><span>${detail}</span>`;
      if (index === statuses.length - 1) {
        clearInterval(statusTimer);
        $("#policy-answer-content").classList.remove("is-hidden");
      }
      index += 1;
    };
    renderStatus();
    statusTimer = setInterval(renderStatus, 650);
  };

  const resetHome = () => {
    $("#policy-home").classList.remove("is-answered");
    $("#scenario-card").classList.remove("is-hidden");
    $("#answer-workspace").classList.add("is-hidden");
    $("#policy-input").value = "";
  };

  document.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-policy-mode]");
    if (modeButton) {
      $$("[data-policy-mode]").forEach((button) => button.classList.toggle("active", button === modeButton));
      $("#mode-description").textContent = modeDescriptions[modeButton.dataset.policyMode];
      if (modeButton.dataset.policyMode === "多城市对比") openModal("#compare-modal");
      return;
    }

    const promptButton = event.target.closest("[data-policy-prompt]");
    if (promptButton) {
      setPrompt(promptButton.dataset.policyPrompt);
      toast("已生成专业问题模板", "请把【城市】替换为实际城市后发送。");
      return;
    }

    const followUp = event.target.closest("[data-follow-up]");
    if (followUp) {
      setPrompt(followUp.dataset.followUp);
      sendQuestion(followUp.dataset.followUp);
      return;
    }

    const actionButton = event.target.closest("[data-policy-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.policyAction;

    if (action === "send") return sendQuestion();
    if (action === "new-chat") return resetHome();
    if (action === "open-history") return openModal("#history-drawer");
    if (action === "close-history") return closeModal("#history-drawer");
    if (action === "open-compare") return openModal("#compare-modal");
    if (action === "close-compare") return closeModal("#compare-modal");
    if (action === "generate-compare") {
      $("#compare-table").classList.remove("is-hidden");
      return toast("已生成多城市对比表", "可继续导出 Excel 或 PDF。");
    }
    if (action === "open-subscribe") return openModal("#subscribe-modal");
    if (action === "close-subscribe") return closeModal("#subscribe-modal");
    if (action === "confirm-subscribe") {
      closeModal("#subscribe-modal");
      return toast("订阅成功", "后续政策变化会按所选频率提醒。");
    }
    if (action === "feedback") {
      const point = actionButton.closest("[data-point]")?.dataset.point || "当前条目";
      $("#feedback-target").textContent = `反馈条目：${point}`;
      return openModal("#feedback-modal");
    }
    if (action === "close-feedback") return closeModal("#feedback-modal");
    if (action === "submit-feedback") {
      closeModal("#feedback-modal");
      return toast("感谢反馈", "我们会用于优化政策答案质量。");
    }

    const actionMap = {
      "mock-upload": ["已添加附件", "AI 会优先识别附件中的政策文件或材料。"],
      "voice": ["语音输入已启动", "这里是演示状态，实际接入语音识别。"],
      "official-only": ["已切换红头文件优先", "后续回答将优先引用官方原文政策。"],
      "favorite": ["已收藏政策方案", "可在历史会话中查看收藏记录。"],
      "export-word": ["正在导出 Word", "导出内容包含问题、结论、依据和生成时间。"],
      "export-pdf": ["正在导出 PDF", "导出内容包含政策要点、清单和参考依据。"],
      "copy-answer": ["答案已复制", "已包含来源编号和时效提示。"],
      "export-checklist": ["已生成办理清单", "可作为 HR 经办待办使用。"]
    };
    if (actionMap[action]) return toast(actionMap[action][0], actionMap[action][1]);
  });

  $("#policy-input").addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") sendQuestion();
  });

  setPrompt("请详细说明北京市的社保缴纳基数和比例标准，包括上下限和各行业差异。");
})();

(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

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

  const switchProduct = (id) => {
    $$(".product-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.product === id));
    $$(".sample").forEach((sample) => sample.classList.toggle("active", sample.id === `product-${id}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setBusy = (button, callback) => {
    const text = button.textContent;
    button.disabled = true;
    button.textContent = "处理中...";
    setTimeout(() => {
      button.disabled = false;
      button.textContent = text;
      callback?.();
    }, 620);
  };

  const parseOnboarding = (button) => {
    setBusy(button, () => {
      $("#onboarding-status").innerHTML = `
        <div class="is-current"><span>状态</span><strong>草稿核对</strong></div>
        <div><span>员工</span><strong>3 人</strong></div>
        <div class="success"><span>可提交</span><strong>2 人</strong></div>
        <div class="warn"><span>异常</span><strong>2 项</strong></div>`;
      $("#onboarding-ready").className = "tag success";
      $("#onboarding-ready").textContent = "2 可提交";
      $("#onboarding-note").textContent = "主表按员工聚合处理结果。点击员工行后，右侧显示该员工的具体问题和建议动作。";
      $("#onboarding-empty")?.classList.add("is-hidden");
      $("#onboarding-rows").classList.remove("is-hidden");
      $("#onboarding-rows").innerHTML = `
        <button class="employee-draft selected success" data-person="zhang">
          <div class="employee-main"><strong>张三</strong><span>北京 / 默认参保方案</span></div>
          <div class="employee-evidence">Excel 第 2 行 + 身份证附件</div>
          <div class="employee-status"><span class="tag success">可提交</span><small>字段完整，无阻断项</small></div>
          <div class="employee-action">查看草稿</div>
        </button>
        <button class="employee-draft warn" data-person="li">
          <div class="employee-main"><strong>李四</strong><span>北京 / 默认参保方案</span></div>
          <div class="employee-evidence">Excel 第 3 行 + 证件附件</div>
          <div class="employee-status"><span class="tag warn">需复核</span><small>证件有效期图片模糊</small></div>
          <div class="employee-action">核对原图</div>
        </button>
        <button class="employee-draft danger" data-person="wang">
          <div class="employee-main"><strong>王五</strong><span>北京 / 默认参保方案</span></div>
          <div class="employee-evidence">Excel 第 4 行，附件未含银行卡</div>
          <div class="employee-status"><span class="tag danger">阻断</span><small>缺银行卡，不能提交</small></div>
          <div class="employee-action">发起补件</div>
        </button>`;
      $("#onboarding-side").innerHTML = `
        <div class="person-detail-card success">
          <span class="tag success">当前选中：可提交</span>
          <h3>张三入职草稿</h3>
          <dl><dt>已识别</dt><dd>姓名、手机号、身份证、参保城市、默认方案</dd><dt>材料</dt><dd>身份证清晰，银行卡已匹配</dd></dl>
          <div class="toolbar"><button class="btn" data-action="view-person">查看字段</button><button class="btn primary" data-action="submit-onboarding">提交可执行项</button></div>
        </div>
        <div class="side-summary">
          <strong>批次处理建议</strong>
          <p>先处理李四证件复核；王五缺银行卡不进入本次提交。</p>
        </div>`;
      $$(".workbench-actions .btn").forEach((btn) => (btn.disabled = false));
      toast("解析完成", "已生成员工草稿、异常队列和可提交项。");
    });
  };

  const submitOnboarding = (button) => {
    setBusy(button, () => {
      $("#onboarding-status").innerHTML = `
        <div class="is-current"><span>状态</span><strong>已提交</strong></div>
        <div><span>员工</span><strong>3 人</strong></div>
        <div class="success"><span>已提交</span><strong>2 人</strong></div>
        <div class="danger"><span>待补件</span><strong>1 人</strong></div>`;
      $("#onboarding-ready").textContent = "已提交 2";
      $("#onboarding-side").insertAdjacentHTML("beforeend", `<div class="demo-result is-applied"><strong>提交结果</strong><br />张三、李四已进入入职流程；王五等待补件。操作已留痕。</div>`);
      toast("提交成功", "已提交 2 个可执行入职任务。");
    });
  };

  const analyzeTicket = (button) => {
    setBusy(button, () => {
      $("#ticket-intents").classList.remove("is-hidden");
      $("#ticket-intents").innerHTML = `
        <div class="intent-route primary"><span class="tag">主流程</span><div><strong>创建参保证明服务单</strong><p>进入服务单草稿，不直接提交。</p></div><button class="btn primary" data-action="create-ticket">进入</button></div>
        <div class="intent-route parallel"><span class="tag cyan">并行</span><div><strong>查询历史进度</strong><p>找到 1 条候选服务单，可同步回复。</p></div><button class="btn" data-action="query-ticket">查询</button></div>
        <div class="intent-route review"><span class="tag warn">待确认</span><div><strong>证明用途模板</strong><p>签证用途可能需要中英文模板。</p></div><button class="btn" data-action="confirm-template">确认</button></div>`;
      $("#ticket-draft").innerHTML = `
        <div class="ticket-draft">
          <div class="ticket-draft-head"><strong>参保证明服务单草稿</strong><span class="tag warn">待确认</span></div>
          <div class="ticket-fields"><div class="ticket-field">人员<strong>张萌</strong></div><div class="ticket-field">城市<strong>北京</strong></div><div class="ticket-field">用途<strong>签证，需确认模板</strong></div><div class="ticket-field">关联进度<strong>SO20260519032</strong></div></div>
          <div class="ticket-footer"><button class="btn" data-action="save-ticket">保存草稿</button><button class="btn primary" data-action="create-ticket">确认创建</button></div>
        </div>
        <div class="reply-editor"><div class="reply-toolbar"><span class="tag">AI 回复草稿</span><button class="btn" data-action="shorten-reply">改短一点</button></div><div class="reply-body" contenteditable="true">已为张萌生成北京参保证明申请，历史服务单仍在处理中。签证用途可能需要指定模板，请确认是否需要中英文版本。</div><div class="reply-foot"><span class="tag warn">未发送</span><div class="toolbar"><button class="btn" data-action="copy-reply">复制</button><button class="btn primary" data-action="send-reply">发送给客户</button></div></div></div>`;
      toast("意图识别完成", "已拆分为创建证明、查询进度和模板确认。");
    });
  };

  const askPolicy = (button) => {
    setBusy(button, () => {
      $("#policy-answer").classList.remove("is-hidden");
      $("#policy-answer").innerHTML = `<div class="policy-answer-main"><div class="answer-head"><span class="tag success">可引用答案</span><small>北京 · 2026 年 6 月新入职</small></div><h3>应结合实际工资、当地上下限和客户服务方案申报</h3><p class="answer-conclusion">客户要求按最低基数缴纳时需提示合规风险。此结论适用于北京 2026 年 6 月新入职员工。</p><div class="answer-meta"><span>适用范围：北京社保申报</span><span>更新时间：2026-05-15</span><span>边界：不承诺最终申报结果</span></div><div class="toolbar" style="margin-top:14px"><button class="btn" data-action="copy-policy">复制</button><button class="btn" data-action="generate-policy-reply">生成客户回复</button><button class="btn primary" data-action="policy-to-ticket">转特单</button></div></div>`;
      $("#policy-sources").innerHTML = `<div class="evidence-list"><div class="evidence-item official"><span></span><div><strong>北京市人社局通知</strong><p>官方来源 · 更新于 2026-05-10</p></div></div><div class="evidence-item internal"><span></span><div><strong>101HR 政策运营</strong><p>内部口径 · 更新于 2026-05-15</p></div></div><div class="evidence-boundary"><strong>答案边界</strong><p>不能替客户承诺最终申报结果，需结合服务方案。</p></div></div>`;
      toast("政策查询完成", "已生成可引用答案和来源说明。");
    });
  };

  const policyConflict = () => {
    $("#policy-answer").classList.remove("is-hidden");
    $("#policy-answer").innerHTML = `<div class="conflict-panel"><div class="conflict-row"><div><strong>来源冲突，暂停确定回答</strong><p>官方通知与内部口径更新时间不一致，需政策运营复核。</p></div><button class="btn primary" data-action="ops-fix">发起复核</button></div></div>`;
    $("#policy-sources").innerHTML = `<div class="evidence-list conflict"><div class="evidence-boundary danger"><strong>不允许一键发送客户</strong><p>建议转人工或发起政策复核。</p></div></div>`;
    toast("已切换为冲突状态", "AI 停止确定回答，进入复核流程。");
  };

  const evaluateUrgent = (button) => {
    setBusy(button, () => {
      $("#urgent-result").innerHTML = `<div class="demo-flow-step done"><div class="demo-num">1</div><div><strong>规则命中</strong><br />供应商节点停留 32 小时，超过关注阈值。</div><span class="tag success">满足</span></div><div class="demo-flow-step active"><div class="demo-num">2</div><div><strong>执行影响</strong><br />将通知供应商和客成，但需人工确认。</div><span class="tag warn">需确认</span></div><div class="demo-flow-step error"><div class="demo-num">3</div><div><strong>承诺边界</strong><br />不能承诺今日完成。</div><span class="tag danger">提醒</span></div>`;
      $("#urgent-confirm-button").classList.remove("is-hidden");
      toast("判断完成", "可申请加急，但必须人工确认且不能承诺完成时间。");
    });
  };

  const showUrgentModal = () => {
    const mask = document.createElement("div");
    mask.className = "demo-modal-mask";
    mask.innerHTML = `<div class="demo-modal"><div class="demo-modal-head">确认打加急标</div><div class="demo-modal-body">将为 SO20260519032 添加加急标记，并记录 AI 判断、确认人和时间。该动作不会向客户承诺今日完成。</div><div class="demo-modal-foot"><button class="btn" data-action="close-modal">取消</button><button class="btn primary" data-action="execute-urgent">确认执行</button></div></div>`;
    document.body.appendChild(mask);
  };

  const assistantSend = () => {
    const input = $("#assistant-input");
    const stream = $("#assistant-stream");
    const text = input.value.trim() || "继续查询";
    stream.insertAdjacentHTML("beforeend", `<div class="demo-message user">${text}</div><div class="demo-message ai"><strong>AI：</strong>已补充人员和用途信息，可转为参保证明服务单草稿。</div>`);
    $("#assistant-actions").innerHTML = `
      <div class="action-preview success"><span class="tag success">可执行</span><strong>参保证明服务单草稿</strong><p>人员、城市、用途已补齐；发送和创建仍需人工确认。</p></div>
      <button class="btn primary" data-action="assistant-to-ticket">转服务单草稿</button>
      <button class="btn" data-action="assistant-handoff">人工接管</button>`;
    input.value = "";
    toast("已发送", "动作面板已准备转服务单。");
  };

  const opsAction = (type) => {
    const detail = $("#ops-detail");
    const map = {
      "ops-refresh": {
        cls: "warn",
        tag: "刷新完成",
        title: "特单 Agent 字段映射配置缺失",
        desc: "刷新后发现参保证明用途模板未映射到服务单字段。"
      },
      "ops-log": {
        cls: "success",
        tag: "运行中",
        title: "入职解析 Agent",
        desc: "最近 10 次调用均成功，平均耗时 2.1 秒。"
      },
      "ops-fix": {
        cls: "warn",
        tag: "配置缺失",
        title: "证明用途模板字段映射",
        desc: "需补充“签证用途模板”与服务单字段映射，否则会持续进入人工复核。"
      },
      "ops-repair": {
        cls: "danger",
        tag: "权限失败",
        title: "消息 API 授权修复",
        desc: "流程代理无法自动通知供应商，需要服务单管理员授权。"
      }
    };
    const item = map[type];
    detail.innerHTML = `<div class="person-detail-card ${item.cls}"><span class="tag ${item.cls}">${item.tag}</span><h3>${item.title}</h3><p>${item.desc}</p><div class="toolbar"><button class="btn primary">进入配置</button><button class="btn">加入质检</button></div></div>`;
    toast("运营动作已触发", item.desc);
  };

  const genericAction = (action, button) => {
    const messages = {
      "show-permission": "当前账号可使用智能入职和政策库，特单助手处于内测。",
      "send-material-request": "已生成补件消息：请客户补充王五银行卡附件。",
      "view-person": "已打开员工详情侧栏。",
      "review-image": "已进入证件原图核对。",
      "query-ticket": "已查询历史服务单：SO20260519032 供应商处理中。",
      "confirm-template": "已选择签证用途中英文模板。",
      "create-ticket": "服务单已创建，编号 SO20260528001。",
      "save-ticket": "服务单草稿已保存。",
      "send-reply": "客户回复已发送，并写入服务单备注。",
      "copy-reply": "回复草稿已复制。",
      "shorten-reply": "回复已改写为更短版本。",
      "copy-policy": "政策答案已复制。",
      "generate-policy-reply": "已生成客户可读回复。",
      "policy-to-ticket": "已带着政策依据转入特单草稿。",
      "assistant-to-ticket": "已生成服务单草稿，等待确认。",
      "assistant-handoff": "已转人工，并保留会话上下文。"
    };
    if (button) button.closest(".demo-row, .card, .demo-stage, .ticket-draft, .reply-editor")?.classList.add("is-applied");
    toast("操作完成", messages[action] || "已完成演示动作。");
  };

  const showOnboardingPerson = (person) => {
    const map = {
      zhang: {
        status: "可提交",
        cls: "success",
        title: "张三入职草稿",
        meta: "字段完整，无阻断项",
        body: "<dl><dt>已识别</dt><dd>姓名、手机号、身份证、参保城市、默认方案</dd><dt>材料</dt><dd>身份证清晰，银行卡已匹配</dd></dl>",
        actions: '<button class="btn" data-action="view-person">查看字段</button><button class="btn primary" data-action="submit-onboarding">提交可执行项</button>'
      },
      li: {
        status: "需复核",
        cls: "warn",
        title: "李四证件有效期",
        meta: "图片低清，但不阻断草稿生成",
        body: "<dl><dt>问题</dt><dd>证件有效期图片模糊，需核对原图</dd><dt>建议</dt><dd>核对后可加入本次提交</dd></dl>",
        actions: '<button class="btn primary" data-action="review-image">核对原图</button><button class="btn" data-action="submit-onboarding">先提交其他人</button>'
      },
      wang: {
        status: "阻断",
        cls: "danger",
        title: "王五银行卡缺失",
        meta: "缺关键材料，不能提交入职",
        body: "<dl><dt>阻断原因</dt><dd>附件中未识别到银行卡，且员工档案无可复用记录</dd><dt>建议</dt><dd>生成补件消息，补齐后进入下一批处理</dd></dl>",
        actions: '<button class="btn primary" data-action="send-material-request">生成补件消息</button>'
      }
    };
    const item = map[person];
    if (!item) return;
    $("#onboarding-side").innerHTML = `
      <div class="person-detail-card ${item.cls}">
        <span class="tag ${item.cls}">当前选中：${item.status}</span>
        <h3>${item.title}</h3>
        <p>${item.meta}</p>
        ${item.body}
        <div class="toolbar">${item.actions}</div>
      </div>
      <div class="side-summary"><strong>批次处理建议</strong><p>主表用于看全量员工状态，右侧用于处理当前员工的问题和动作。</p></div>`;
  };

  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".product-tab");
    if (tab) return switchProduct(tab.dataset.product);

    const opener = event.target.closest("[data-open-product]");
    if (opener) return switchProduct(opener.dataset.openProduct);

    const button = event.target.closest("[data-action]");
    const onboardingRow = event.target.closest("#onboarding-rows [data-person]");
    if (onboardingRow) {
      $$("#onboarding-rows [data-person]").forEach((row) => row.classList.remove("selected"));
      onboardingRow.classList.add("selected");
      showOnboardingPerson(onboardingRow.dataset.person);
      if (!button) return;
    }
    if (!button) return;
    const action = button.dataset.action;
    if (action === "parse-onboarding") return parseOnboarding(button);
    if (action === "submit-onboarding") return submitOnboarding(button);
    if (action === "analyze-ticket") return analyzeTicket(button);
    if (action === "ask-policy") return askPolicy(button);
    if (action === "policy-conflict") return policyConflict();
    if (action === "evaluate-urgent") return evaluateUrgent(button);
    if (action === "confirm-urgent") return showUrgentModal();
    if (action === "execute-urgent") {
      $(".demo-modal-mask")?.remove();
      $("#urgent-result").insertAdjacentHTML("beforeend", `<div class="demo-result is-applied"><strong>执行完成</strong><br />已添加加急标记，操作日志已记录。</div>`);
      return toast("加急标记已添加", "已留痕，不承诺今日完成。");
    }
    if (action === "close-modal") return $(".demo-modal-mask")?.remove();
    if (action === "assistant-send") return assistantSend();
    if (action.startsWith("ops-")) return opsAction(action);
    genericAction(action, button);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "assistant-input") {
      event.preventDefault();
      assistantSend();
    }
  });
})();

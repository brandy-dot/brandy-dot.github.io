(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const processSteps = [
    ["需求解析", "识别用户自然语言中的办理对象、业务范围和用途。", "已完成", "0.6s"],
    ["意图识别", "命中社保公积金相关业务 / 社保参保证明开具。", "已完成", "0.4s"],
    ["信息提取", "提取员工张三、开具时间 2024年01月-2026年04月、用途公积金贷款。", "已完成", "0.8s"],
    ["表单生成", "加载社保参保证明开具对应服务单表单。", "已完成", "0.5s"],
    ["智能预填", "自动预填问题类型、开具时间、开具方、员工和联系电话。", "已完成", "0.7s"]
  ];

  const records = [
    { status:"草稿", type:"社保参保证明开具", employee:"张三", period:"2024年01月-2026年04月", result:"2 项待补充", title:"用于公积金贷款，需补具体用途和邮寄地址", no:"-", time:"2026/04/02 15:13:32", next:"继续处理", actions:["继续处理","删除"], details:[["张三","社保参保证明开具","2024/01-2026/04","草稿","具体用途、邮寄地址","-","继续处理"]] },
    { status:"已提交", type:"社保参保证明开具", employee:"张三", period:"2024年01月-2026年04月", result:"已提交服务单", title:"51社保开具，用于公积金贷款", no:"SO202604020001", time:"2026/04/02 14:13:32", next:"查看进度", actions:["查看进度"], details:[["张三","社保参保证明开具","2024/01-2026/04","已提交","无","-","查看进度"]] }
  ];

  let uploaded = false;
  let generated = false;
  let toastTimer;

  const statusClass = (status) => {
    if (["已提交", "已完成"].includes(status)) return "success";
    if (["待补充", "草稿", "处理中"].includes(status)) return "warn";
    if (["失败"].includes(status)) return "danger";
    return "";
  };

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
    toastTimer = setTimeout(() => node.classList.remove("show"), 2300);
  };

  const renderFiles = () => {
    $("#ticket-file-list").innerHTML = uploaded
      ? `<div class="file-item"><div><strong>参保证明材料.zip</strong><span>1.6 MB · 上传完成</span></div><button class="btn" data-ticket-action="remove-file">删除</button></div>`
      : `<div class="empty-mini">暂无上传附件</div>`;
  };

  const updateGenerateState = () => {
    const hasInput = Boolean($("#ticket-input").value.trim()) || uploaded;
    $("#ticket-generate-btn").disabled = !hasInput;
    $("#ticket-input-help").textContent = hasInput ? "AI 只会生成服务单草稿，确认后才提交。" : "请输入业务需求，或上传业务附件。";
  };

  const renderProcess = () => {
    $("#ticket-process-list").innerHTML = processSteps.map(([title, desc, state, time], index) => `
      <div class="process-step">
        <span class="process-num">${index + 1}</span>
        <div><strong>${title}</strong><p>${desc}</p></div>
        <span class="tag success">${state}</span>
        <em>${time}</em>
      </div>`).join("");
  };

  const renderRecords = (filter = "all") => {
    const list = records.filter((item) => filter === "all" || item.status === filter);
    $("#ticket-record-list").innerHTML = list.map((item) => `
      <article class="ticket-record-row">
        <div class="ticket-record-status">
          <span class="tag ${statusClass(item.status)}">${item.status}</span>
          <strong>${item.type}</strong>
        </div>
        <div class="ticket-record-main">
          <h3>${item.employee} · ${item.period}</h3>
          <p>${item.title}</p>
          <div class="ticket-record-facts"><span>编号：${item.no}</span><span>创建：${item.time}</span></div>
        </div>
        <div class="ticket-record-result"><span>处理结果</span><strong>${item.result}</strong></div>
        <div class="ticket-record-actions">
          <button class="link-btn primary-link" data-ticket-action="record-action">${item.next}</button>
          <button class="record-expand" data-ticket-action="toggle-record">展开</button>
        </div>
        <div class="record-detail is-hidden">
          <div class="table-wrap"><table><thead><tr><th>员工姓名</th><th>业务类型</th><th>开具时间</th><th>当前状态</th><th>待补充字段</th><th>失败原因</th><th>下一步操作</th></tr></thead><tbody>${item.details.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td></tr>`).join("")}</tbody></table></div>
        </div>
      </article>`).join("") || `<div class="empty-state"><strong>暂无服务单记录</strong><span>提交或保存草稿后，记录会显示在这里。</span></div>`;
  };

  const showResults = () => {
    ["ticket-process-section", "ticket-summary-section", "ticket-form-section"].forEach((id) => $(`#${id}`).classList.remove("is-hidden"));
    ["ticket-step-ai", "ticket-step-form"].forEach((id) => $(`#${id}`).classList.add("active"));
    $("#ticket-process-title").textContent = "处理过程已完成";
    $("#ticket-process-summary").textContent = "已完成需求解析、意图识别、信息提取、表单生成和智能预填；可展开查看处理步骤。";
    $("#ticket-progress").classList.add("is-hidden");
    renderProcess();
  };

  const generate = (button) => {
    if (!$("#ticket-input").value.trim() && !uploaded) return toast("请先描述业务需求", "输入业务描述或上传附件后再生成服务单草稿。");
    $("#ticket-process-section").classList.remove("is-hidden");
    $("#ticket-progress").classList.remove("is-hidden");
    $("#ticket-process-list").classList.add("is-hidden");
    $("#ticket-step-ai").classList.add("active");
    button.disabled = true;
    button.textContent = "AI 正在识别业务需求...";
    setTimeout(() => {
      generated = true;
      button.textContent = "生成服务单草稿";
      updateGenerateState();
      showResults();
      $("#ticket-summary-section").scrollIntoView({ behavior:"smooth", block:"start" });
      toast("服务单草稿已生成", "请补充用途、参保库名称和邮寄地址。");
    }, 850);
  };

  const openModal = (title, body, actions) => {
    const mask = document.createElement("div");
    mask.className = "demo-modal-mask";
    mask.innerHTML = `<div class="demo-modal onboarding-modal"><div class="demo-modal-head">${title}</div><div class="demo-modal-body">${body}</div><div class="demo-modal-foot">${actions}</div></div>`;
    document.body.appendChild(mask);
  };

  const submitTicket = () => openModal(
    "当前仍有必填字段未补充",
    `<div class="warn-box">具体用途、参保库名称、邮寄地址仍为空。请完善后再提交服务单。</div><div class="inline-notice" style="margin-top:12px">部分字段由 AI 推断生成，请确认无误后再提交。</div>`,
    `<button class="btn" data-ticket-action="modal-close">取消</button><button class="btn primary" data-ticket-action="focus-missing">去补充字段</button>`
  );

  document.addEventListener("input", (event) => {
    if (event.target.id === "ticket-input") updateGenerateState();
  });

  document.addEventListener("click", (event) => {
    const template = event.target.closest("[data-ticket-template]");
    if (template) {
      $("#ticket-input").value = template.dataset.ticketTemplate;
      updateGenerateState();
      return toast("示例已填入", "可以直接生成服务单草稿。");
    }
    const filter = event.target.closest("[data-ticket-filter]");
    if (filter) {
      $$("[data-ticket-filter]").forEach((item) => item.classList.toggle("active", item === filter));
      return renderRecords(filter.dataset.ticketFilter);
    }
    const button = event.target.closest("[data-ticket-action]");
    if (!button) return;
    const action = button.dataset.ticketAction;
    if (action === "close-alert") return $("#ticket-boundary-alert").classList.add("is-hidden");
    if (action === "open-guide") return $("#ticket-guide-drawer").classList.remove("is-hidden");
    if (action === "close-guide") return $("#ticket-guide-drawer").classList.add("is-hidden");
    if (action === "mock-upload") { uploaded = true; renderFiles(); updateGenerateState(); return toast("附件已上传", "已添加参保证明材料附件。"); }
    if (action === "remove-file") { uploaded = false; renderFiles(); updateGenerateState(); return toast("附件已删除"); }
    if (action === "clear-input") { $("#ticket-input").value = ""; uploaded = false; renderFiles(); updateGenerateState(); return toast("已清空"); }
    if (action === "generate") return generate(button);
    if (action === "toggle-process") return $("#ticket-process-list").classList.toggle("is-hidden");
    if (action === "submit-ticket") return submitTicket();
    if (action === "modal-close") return $(".demo-modal-mask")?.remove();
    if (action === "focus-missing") { $(".demo-modal-mask")?.remove(); return $("#ticket-form-section").scrollIntoView({ behavior:"smooth", block:"start" }); }
    if (action === "save-draft") {
      records.unshift({ status:"草稿", type:"社保参保证明开具", employee:"张三", period:"2024年01月-2026年04月", result:"3 项待补充", title:"AI 已生成草稿，需补具体用途、参保库名称、邮寄地址", no:"-", time:"2026/05/28 16:20:00", next:"继续处理", actions:["继续处理","删除"], details:[["张三","社保参保证明开具","2024/01-2026/04","草稿","具体用途、参保库名称、邮寄地址","-","继续处理"]] });
      renderRecords();
      return toast("草稿已保存", "服务单记录已更新。");
    }
    if (action === "toggle-record") {
      const item = button.closest(".ticket-record-row");
      item.querySelector(".record-detail").classList.toggle("is-hidden");
      button.textContent = item.querySelector(".record-detail").classList.contains("is-hidden") ? "展开" : "收起";
      return;
    }
    const map = {
      "back-tools":"返回工具集",
      "cancel":"已取消本次草稿编辑。",
      "edit-employee":"已打开员工信息编辑。",
      "remove-row":"已移除该员工。",
      "record-action":button.textContent.trim()
    };
    if (action === "back-tools") {
      window.location.href = "./product-samples.html";
      return;
    }
    toast("操作完成", map[action] || "已完成演示动作。");
  });

  $("#ticket-guide-drawer").addEventListener("click", (event) => {
    if (event.target.id === "ticket-guide-drawer") $("#ticket-guide-drawer").classList.add("is-hidden");
  });

  renderFiles();
  renderRecords();
  updateGenerateState();
})();

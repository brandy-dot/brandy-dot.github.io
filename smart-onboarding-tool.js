(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const mappings = [
    ["员工姓名", "姓名", "张三", "已匹配", "98%", "无需处理"],
    ["手机", "手机号", "13800000000", "已匹配", "96%", "无需处理"],
    ["到岗时间", "入职日期", "2026/06/01", "需确认", "82%", "请确认是否等同于入职日期"],
    ["项目城市", "参保城市", "上海", "AI 推断", "75%", "请确认是否用于参保城市"],
    ["员工标签", "未匹配", "外包一组", "未匹配", "-", "可忽略或手动选择映射字段"]
  ];

  const processSteps = [
    ["信息合并识别", "从文本、文件、附件中抽取员工姓名、证件号、手机号、部门、岗位、入职日期等信息，并合并同一员工的多来源资料。", "已完成", "1.8s"],
    ["字段映射与别名理解", "将客户原始字段映射到 101HR 标准字段，例如“手机”映射为“手机号”，“到岗时间”映射为“入职日期”。", "已完成", "0.9s"],
    ["枚举值标准化", "将客户提供的部门、岗位、城市、合同主体等值转为系统可识别的标准值。", "已完成", "0.7s"],
    ["规则补齐", "根据客户和 101HR 规则，补齐可推断信息，例如默认合同主体、参保城市等。", "已完成", "1.1s"],
    ["信息回填检查", "检查必填字段、格式、枚举值、重复员工、规则不符等问题。", "已完成", "1.4s"],
    ["冲突字段检测", "检测同一员工多来源信息中不一致的字段，例如手机号、入职日期、部门冲突。", "已完成", "0.6s"]
  ];

  const employees = [
    { id:"e1", name:"王五", phone:"13900000000", idNo:"440xxxxxxxxxxxxxxx", dept:"-", job:"产品经理", date:"无法识别", contract:"-", city:"深圳", status:"解析失败", abnormal:"入职日期无法识别，合同主体缺失", confidence:"42%", source:"Excel 第 5 行 + 邮件附件", next:"修改资料后重新解析" },
    { id:"e2", name:"钱七", phone:"13600000000", idNo:"330xxxxxxxxxxxxxxx", dept:"客服部", job:"客服专员", date:"2026/06/08", contract:"101HR 上海公司", city:"上海", status:"字段冲突", abnormal:"手机号与登记表不一致", confidence:"71%", source:"Excel 第 7 行 + 入职登记表", next:"确认手机号来源" },
    { id:"e3", name:"李四", phone:"-", idNo:"-", dept:"销售部", job:"销售经理", date:"2026/06/03", contract:"101HR 上海公司", city:"上海", status:"待补充", abnormal:"手机号、证件号码", confidence:"78%", source:"客户 Excel 第 3 行", next:"补充手机号和证件号码" },
    { id:"e4", name:"赵六", phone:"13700000000", idNo:"320xxxxxxxxxxxxxxx", dept:"运营部", job:"运营专员", date:"2026/06/10", contract:"AI 推断为 101HR 上海公司，需确认", city:"AI 推断为上海，需确认", status:"需确认", abnormal:"合同主体、参保城市为 AI 推断", confidence:"82%", source:"聊天记录 + 默认客户规则", next:"确认推断字段" },
    { id:"e5", name:"张三", phone:"13800000000", idNo:"310xxxxxxxxxxxxxxx", dept:"设计部", job:"UI 设计师", date:"2026/06/01", contract:"101HR 上海公司", city:"上海", status:"疑似重复", abnormal:"与另一条张三证件号码重复", confidence:"90%", source:"Excel 第 2 行 + 身份证附件", next:"合并或移除重复员工" },
    { id:"e6", name:"张三", phone:"13800000000", idNo:"310xxxxxxxxxxxxxxx", dept:"设计部", job:"UI 设计师", date:"2026/06/01", contract:"101HR 上海公司", city:"上海", status:"可入职", abnormal:"无", confidence:"96%", source:"Excel 第 2 行 + 身份证附件", next:"确认无误后提交" }
  ];

  const records = [
    { status:"已完成", type:"批量入职", title:"客户 Excel 入职资料解析", stat:"识别 20 人，成功入职 20 人", operator:"张三", time:"2026/5/28 16:01:06", actions:["查看详情","导出结果"], details:[["张三","提交成功","-","无","查看详情"],["李四","提交成功","-","无","查看详情"]] },
    { status:"部分成功", type:"批量入职", title:"员工入职信息 5 条", stat:"成功 3 人，失败 2 人", operator:"李四", time:"2026/5/27 17:01:06", actions:["查看详情","导出失败员工","重新解析"], details:[["王五","提交失败","入职日期无法识别","入职日期","重新解析"],["钱七","提交失败","字段冲突未确认","手机号","查看详情"]] },
    { status:"草稿", type:"批量入职", title:"已识别 8 人，待补充 2 人", stat:"识别 8 人，待补充 2 人", operator:"王五", time:"2026/5/26 10:30:00", actions:["继续处理","删除"], details:[["李四","待补充","-","手机号、证件号码","继续处理"]] }
  ];

  let uploaded = false;
  let generated = false;
  let recordsExpanded = false;
  let recordPanelOpen = true;
  let toastTimer;

  const statusClass = (status) => {
    if (["可入职", "已完成", "提交成功", "已匹配"].includes(status)) return "success";
    if (["待补充", "需确认", "部分成功", "草稿", "AI 推断"].includes(status)) return "warn";
    if (["字段冲突"].includes(status)) return "conflict";
    if (["疑似重复", "未匹配"].includes(status)) return "purple";
    if (["解析失败", "失败", "提交失败"].includes(status)) return "danger";
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

  const updateGenerateState = () => {
    const hasTenant = Boolean($("#tenant-select").value);
    const hasInput = Boolean($("#material-input").value.trim()) || uploaded;
    $("#generate-btn").disabled = !(hasTenant && hasInput);
    if ($("#context-summary-text")) $("#context-summary-text").textContent = `${$("#tenant-select").value || "未选择客户/租户"} · 批量入职 · 客户 Excel/邮件/聊天记录 · 字段映射已开启`;
    $("#input-help").textContent = !hasTenant
      ? "请先选择客户/租户，再生成入职草稿。"
      : hasInput
        ? "AI 只生成草稿，确认后由人工提交。"
        : "请先输入客户资料或上传文件。";
  };

  const renderFiles = () => {
    $("#file-list").innerHTML = uploaded
      ? `<div class="file-item compact-file"><div><strong>2 个附件</strong><span>Excel + 登记表</span></div><span class="link-btn" data-onboarding-action="remove-file">移除</span></div>`
      : "";
  };

  const renderProcess = () => {
    $("#process-list").innerHTML = processSteps.map(([title, desc, state, time], index) => `
      <div class="process-step">
        <span class="process-num">${index + 1}</span>
        <div><strong>${title}</strong><p>${desc}</p></div>
        <span class="tag success">${state}</span>
        <em>${time}</em>
      </div>`).join("");
  };

  const renderMappings = () => {
    $("#mapping-body").innerHTML = mappings.map((item) => `
      <tr>
        <td><strong>${item[0]}</strong></td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td><span class="tag ${statusClass(item[3])}">${item[3]}</span></td>
        <td><span class="confidence ${statusClass(item[3])}">${item[4]}</span></td>
        <td>${item[5]}</td>
        <td><button class="link-btn" data-onboarding-action="mapping-edit">处理</button></td>
      </tr>`).join("");
  };

  const renderEmployees = (filter = "all", keyword = "") => {
    const rows = employees.filter((item) => {
      const hitFilter = filter === "all" || item.status === filter;
      const hitKeyword = `${item.name} ${item.phone} ${item.idNo}`.toLowerCase().includes(keyword.toLowerCase());
      return hitFilter && hitKeyword;
    });
    $("#employee-list").innerHTML = rows.map((item) => `
      <tr data-onboarding-action="employee-detail" data-name="${item.name}">
        <td>
          <strong>${item.name}</strong>
          <span>${item.dept === "-" ? item.job : `${item.dept} / ${item.job}`}</span>
        </td>
        <td><span class="tag ${statusClass(item.status)}">${item.status}</span></td>
        <td>
          <span>手机 ${item.phone}</span>
          <span>入职 ${item.date}</span>
        </td>
        <td><strong>${item.abnormal}</strong></td>
        <td><span>${item.source}</span></td>
        <td>
          <span>${item.next}</span>
          <em>详情 ›</em>
        </td>
      </tr>`).join("") || `<tr><td colspan="6" class="table-empty">没有匹配当前条件的员工。</td></tr>`;
  };

  const renderRecords = (filter = "all", keyword = "") => {
    const list = records.filter((record) => {
      const text = `${record.status} ${record.type} ${record.title} ${record.stat} ${record.operator}`.toLowerCase();
      return (filter === "all" || record.status === filter) && text.includes(keyword.toLowerCase());
    });
    const visibleList = recordsExpanded ? list : list.slice(0, 1);
    const primaryAction = (record) => record.status === "已完成" ? "查看任务详情" : "继续处理异常";
    const content = visibleList.map((record) => {
      const index = records.indexOf(record);
      return `
      <article class="record-list-item" data-record-index="${index}" data-onboarding-action="toggle-record">
        <span class="tag ${statusClass(record.status)}">${record.status}</span>
        <div class="record-list-main">
          <h3>${record.title}</h3>
          <p>${record.type} · <strong>${record.stat}</strong></p>
        </div>
        <em class="record-list-time">${record.operator} · ${record.time}</em>
        <span class="record-next">${primaryAction(record)}</span>
      </article>
      <div class="record-detail-row is-hidden">
        <div class="record-detail"><table><thead><tr><th>员工姓名</th><th>入职结果</th><th>失败原因</th><th>缺失字段</th><th>处理建议</th></tr></thead><tbody>${record.details.map((row) => `<tr><td>${row[0]}</td><td><span class="tag ${statusClass(row[1])}">${row[1]}</span></td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td></tr>`).join("")}</tbody></table></div>
      </div>`;
    }).join("");
    $("#record-list").innerHTML = content || `<div class="empty-state"><strong>暂无入职记录</strong><span>完成一次 AI 解析后，记录会显示在这里。</span></div>`;
    const expandAction = $("#record-expand-action");
    if (expandAction) expandAction.textContent = recordsExpanded ? "收起完整入职记录" : `查看完整入职记录（${list.length} 条）`;
  };

  const toggleRecordPanel = () => {
    if (document.body.classList.contains("onboarding-generated")) return;
    recordsExpanded = !recordsExpanded;
    renderRecords();
    $("#record-panel").scrollIntoView({ behavior:"smooth", block:"nearest" });
  };

  const openModal = (title, body, actions) => {
    const mask = document.createElement("div");
    mask.className = "demo-modal-mask";
    mask.innerHTML = `<div class="demo-modal onboarding-modal"><div class="demo-modal-head">${title}</div><div class="demo-modal-body">${body}</div><div class="demo-modal-foot">${actions}</div></div>`;
    document.body.appendChild(mask);
  };

  const openEmployeeDrawer = (name) => {
    const item = employees.find((employee) => employee.name === name) || employees[0];
    const mask = document.createElement("div");
    mask.className = "onboarding-drawer-mask";
    mask.innerHTML = `<aside class="onboarding-drawer">
      <div class="drawer-head"><h2>${item.name} · 员工详情</h2><button class="btn" data-onboarding-action="close-temp-drawer">关闭</button></div>
      <div class="drawer-content">
        <section><h3>员工基础信息</h3><p>${item.dept} / ${item.job} / ${item.date}</p></section>
        <section><h3>客户原始资料片段</h3><p>${item.source}：${item.name}，${item.phone}，${item.job}，${item.date}</p></section>
        <section><h3>101HR 标准字段回填结果</h3><div class="drawer-field-grid"><label>手机号<input value="${item.phone}" /></label><label>证件号码<input value="${item.idNo}" /></label><label>合同主体<input value="${item.contract}" /></label><label>参保城市<input value="${item.city}" /></label></div></section>
        <section><h3>缺失/冲突/来源</h3><p>${item.abnormal}</p><p>AI 识别来源：${item.source}</p></section>
        <section><h3>修改记录</h3><p>暂无人工修改。确认后会记录修改人、时间和字段差异。</p></section>
      </div>
    </aside>`;
    document.body.appendChild(mask);
  };

  const showResultSections = () => {
    document.body.classList.add("onboarding-generated");
    $("#employee-section").classList.remove("is-hidden");
    $("#ai-process-section").classList.add("is-hidden");
    $("#mapping-section").classList.add("is-hidden");
    ["step-map", "step-check", "step-confirm"].forEach((id) => $(`#${id}`).classList.add("active"));
    $("#ai-process-title").textContent = "AI 处理完成";
    $("#ai-process-summary").textContent = "已完成 6/6 项处理，发现 3 个待补充字段、1 个冲突字段、1 个疑似重复员工。";
    $("#parse-progress").classList.add("is-hidden");
    renderProcess();
    renderMappings();
    renderEmployees();
  };

  const resetInitialView = () => {
    generated = false;
    document.body.classList.remove("onboarding-generated");
    $(".result-bottom-bar")?.classList.remove("is-submitted");
    ["#ai-process-section", "#mapping-section", "#employee-section", "#submit-result"].forEach((selector) => {
      const node = $(selector);
      if (node) node.classList.add("is-hidden");
    });
    ["step-map", "step-check", "step-confirm", "step-submit", "step-track"].forEach((id) => {
      const node = $(`#${id}`);
      if (node) node.classList.remove("active");
    });
    $("#generate-btn").textContent = "生成入职草稿";
    $("#generate-btn").classList.add("primary");
  };

  const restoreSubmitBar = () => {
    const submitBar = $(".result-bottom-bar");
    if (!submitBar) return;
    submitBar.classList.remove("is-submitted");
    submitBar.querySelector("strong").textContent = "提交规则";
    submitBar.querySelector("span").textContent = "确认提交会写入 101HR 正式入职流程。异常员工不会被静默提交。";
    $("#submit-result").classList.add("is-hidden");
  };

  const generate = (button) => {
    if (!$("#tenant-select").value) return toast("请先选择客户/租户", "客户决定字段规则、入职流程和权限范围。");
    if (!$("#material-input").value.trim() && !uploaded) return toast("请先输入或上传资料", "需要客户资料后才能生成入职草稿。");
    $("#ai-process-section").classList.remove("is-hidden");
    $("#parse-progress").classList.remove("is-hidden");
    $("#process-list").classList.add("is-hidden");
    $("#ai-process-title").textContent = "AI 正在处理入职资料";
    $("#ai-process-summary").textContent = "正在识别客户资料、映射字段并进行回填检查。";
    $("#step-map").classList.add("active");
    button.disabled = true;
    button.textContent = "AI 正在识别入职资料...";
    setTimeout(() => {
      generated = true;
      button.textContent = "重新生成";
      button.classList.remove("primary");
      button.disabled = false;
      updateGenerateState();
      showResultSections();
      $("#employee-section").scrollIntoView({ behavior: "smooth", block: "start" });
      toast("AI 处理完成", "字段映射、回填检查和员工确认结果已生成。");
    }, 900);
  };

  const submitConfirm = () => openModal(
    "存在异常员工，无法直接提交全部入职",
    `<div class="warn-box">本次仍有待补充、字段冲突和疑似重复员工。你可以仅提交 15 名可入职员工，或先处理异常员工。</div>`,
    `<button class="btn" data-onboarding-action="modal-close">取消</button><button class="btn" data-onboarding-action="modal-fix">先处理异常员工</button><button class="btn primary" data-onboarding-action="submit-ready-only">仅提交可入职员工</button>`
  );

  const finishSubmit = () => {
    $(".demo-modal-mask")?.remove();
    $("#step-submit").classList.add("active");
    $("#step-track").classList.add("active");
    const submitBar = $(".result-bottom-bar");
    submitBar?.classList.add("is-submitted");
    if (submitBar) {
      submitBar.querySelector("strong").textContent = "提交动作已完成";
      submitBar.querySelector("span").textContent = "15 名可入职员工已进入正式流程，异常员工保留在当前草稿中继续处理。";
    }
    $("#submit-result").classList.remove("is-hidden");
    $("#submit-result").innerHTML = `
      <div class="submit-result-head">
        <div><strong>入职提交结果</strong><span>本次只提交可入职员工；失败和跳过员工需要继续补充或重新解析。</span></div>
        <span class="tag warn">部分完成</span>
      </div>
      <div class="submit-result-grid">
        <div class="summary-card success"><span>提交成功</span><strong>15</strong><em>人</em></div>
        <div class="summary-card danger"><span>提交失败</span><strong>2</strong><em>人</em></div>
        <div class="summary-card warn"><span>已跳过</span><strong>3</strong><em>人</em></div>
      </div>
      <div class="submit-result-actions">
        <button class="btn" data-onboarding-action="export-failed">导出失败员工</button>
        <button class="btn" data-onboarding-action="reparse-failed">重新解析失败员工</button>
        <button class="btn" data-onboarding-action="back-edit">返回编辑</button>
      </div>`;
    toast("已提交可入职员工", "15 人已进入 101HR 正式入职流程，异常员工保留追踪。");
  };

  document.addEventListener("input", (event) => {
    if (event.target.matches("#tenant-select, #material-input")) updateGenerateState();
    if (event.target.id === "employee-search") {
      const active = $("#employee-status-filter")?.value || "all";
      renderEmployees(active, event.target.value);
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("#tenant-select")) updateGenerateState();
    if (event.target.id === "example-select" && event.target.value) {
      $("#material-input").value = event.target.value;
      event.target.value = "";
      updateGenerateState();
      toast("示例已填入", "可继续上传客户资料，或直接生成入职草稿。");
    }
    if (event.target.id === "employee-status-filter") renderEmployees(event.target.value, $("#employee-search").value);
  });

  document.addEventListener("click", (event) => {
    const example = event.target.closest("[data-example]");
    if (example) {
      $("#material-input").value = example.dataset.example;
      updateGenerateState();
      return toast("示例已填入", "可继续上传客户资料，或直接生成入职草稿。");
    }
    const segment = event.target.closest("[data-segment]");
    if (segment) {
      $$(".segmented button").forEach((button) => button.classList.toggle("active", button === segment));
      return toast("入职方式已切换", segment.textContent.trim());
    }
    const employeeFilter = event.target.closest("[data-employee-filter]");
    if (employeeFilter) {
      $$("[data-employee-filter]").forEach((button) => button.classList.toggle("active", button === employeeFilter));
      return renderEmployees(employeeFilter.dataset.employeeFilter, $("#employee-search").value);
    }
    const button = event.target.closest("[data-onboarding-action]");
    if (!button) return;
    if (button.tagName !== "BUTTON") event.preventDefault();
    const action = button.dataset.onboardingAction;
    if (action === "close-alert") return $("#ai-boundary-alert").classList.add("is-hidden");
    if (action === "toggle-context" && $("#context-panel")) return $("#context-panel").classList.toggle("is-hidden");
    if (action === "open-guide") return $("#guide-drawer").classList.remove("is-hidden");
    if (action === "close-guide") return $("#guide-drawer").classList.add("is-hidden");
    if (action === "mock-upload") { uploaded = true; renderFiles(); updateGenerateState(); return toast("文件已上传", "已添加客户 Excel 和登记表附件。"); }
    if (action === "remove-file") { uploaded = false; renderFiles(); updateGenerateState(); return toast("文件已删除"); }
    if (action === "clear-input") { $("#material-input").value = ""; uploaded = false; renderFiles(); updateGenerateState(); return toast("已清空"); }
    if (action === "generate") return generate(button);
    if (action === "toggle-process") return $("#process-list").classList.toggle("is-hidden");
    if (action === "scroll-mapping") { $("#mapping-section").classList.remove("is-hidden"); return $("#mapping-section").scrollIntoView({ behavior:"smooth", block:"start" }); }
    if (action === "show-exception") { renderEmployees("字段冲突"); $("#employee-section").scrollIntoView({ behavior:"smooth", block:"start" }); return toast("已筛选异常员工", "字段冲突优先展示，其他异常可切换筛选。"); }
    if (action === "employee-detail") return openEmployeeDrawer(button.dataset.name);
    if (action === "close-temp-drawer") return button.closest(".onboarding-drawer-mask").remove();
    if (action === "confirm-submit") return submitConfirm();
    if (action === "submit-ready-only") return finishSubmit();
    if (action === "modal-close") return $(".demo-modal-mask")?.remove();
    if (action === "modal-fix") { $(".demo-modal-mask")?.remove(); $("#employee-section").scrollIntoView({ behavior:"smooth" }); return toast("请先处理异常员工", "字段冲突、待补充和疑似重复已排在前面。"); }
    if (action === "toggle-records-panel") return toggleRecordPanel();
    if (action === "toggle-records") {
      recordsExpanded = !recordsExpanded;
      renderRecords();
      return;
    }
    if (action === "toggle-record") {
      const row = button.closest(".record-list-item");
      const detail = row?.nextElementSibling;
      if (!detail) return;
      detail.classList.toggle("is-hidden");
      row.classList.toggle("is-open", !detail.classList.contains("is-hidden"));
      return;
    }
    if (action === "back-input" || action === "back-edit") {
      if (action === "back-edit") restoreSubmitBar();
      return $("#material-input").scrollIntoView({ behavior:"smooth", block:"center" });
    }
    if (action === "back-tools") {
      window.location.href = "./product-samples.html";
      return;
    }
    const map = {
      "export-failed":"失败员工已导出。",
      "reparse-failed":"已发起失败员工重新解析。",
      "save-draft":"入职草稿已保存。",
      "mapping-edit":"已进入映射修改。",
      "mapping-ignore":"该客户字段已忽略。",
      "mapping-apply":"映射已应用到本次任务。",
    };
    toast("操作完成", map[action] || "已完成演示动作。");
  });

  document.addEventListener("keydown", (event) => {
    const actionNode = event.target.closest("[data-onboarding-action]");
    if (!actionNode || actionNode.tagName === "BUTTON") return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    actionNode.click();
  });

  $("#guide-drawer").addEventListener("click", (event) => {
    if (event.target.id === "guide-drawer") $("#guide-drawer").classList.add("is-hidden");
  });

  resetInitialView();
  renderFiles();
  renderRecords();
  updateGenerateState();
})();

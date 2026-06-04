(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  let toastTimer;
  const toast = (title, detail = "已触发该组件的演示交互。") => {
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

  const addNote = (target, title, detail) => {
    const scope = target.closest(".component-body, .panel-body, .card, .product-main") || target.parentElement;
    if (!scope) return;
    let note = $(".demo-action-note", scope);
    if (!note) {
      note = document.createElement("div");
      note.className = "demo-action-note";
      scope.appendChild(note);
    }
    note.innerHTML = `<strong>${title}</strong> ${detail}`;
  };

  const getButtonText = (button) => button.textContent.trim() || "操作";

  const simulateProgress = (button) => {
    const original = getButtonText(button);
    button.disabled = true;
    button.textContent = "处理中...";
    setTimeout(() => {
      button.disabled = false;
      button.textContent = original;
      toast("处理完成", `${original} 已完成，页面保留了演示状态。`);
    }, 780);
  };

  const copyText = async (button) => {
    const scope = button.closest(".result-card, .reply-editor, .card, .panel, .policy-answer") || document.body;
    const text = scope.innerText.replace(/\s+/g, " ").trim();
    try {
      await navigator.clipboard.writeText(text);
      toast("已复制", "内容已复制到剪贴板。");
    } catch {
      toast("已模拟复制", "浏览器限制了剪贴板权限，演示中视为复制成功。");
    }
  };

  const makeEditable = (button) => {
    const scope = button.closest(".result-card, .reply-editor, .panel, .card, .prefill-field");
    const target = $(".reply-body", scope) || $("p", scope) || $(".prefill-field-value", scope);
    if (!target) {
      toast("可编辑", "该组件会进入编辑态。");
      return;
    }
    target.contentEditable = "true";
    target.classList.add("demo-editing");
    target.focus();
    toast("进入编辑态", "可直接修改内容，失焦后保留演示文本。");
  };

  const handleProductTab = (tab) => {
    const id = tab.dataset.sample;
    if (!id) return;
    $$(".product-tab").forEach((item) => item.classList.remove("active"));
    $$(".sample").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const sample = $(`#sample-${id}`);
    if (sample) sample.classList.add("active");
    toast("已切换产品样板", tab.textContent.trim());
  };

  const handleCatalogClick = (item) => {
    const num = $(".catalog-num", item)?.textContent.trim();
    if (!num) return;
    const target = $$("h2").find((h) => h.textContent.trim().startsWith(num + "."));
    if (target) {
      target.closest(".component-block")?.scrollIntoView({ behavior: "smooth", block: "start" });
      toast("已定位组件", item.innerText.replace(/\s+/g, " ").trim());
    }
  };

  const handleSelectable = (item, groupSelector, title) => {
    const parent = item.parentElement;
    if (parent) $$(groupSelector, parent).forEach((node) => node.classList.remove("is-selected", "selected", "active"));
    item.classList.add("is-selected", "selected", "active");
    toast(title, item.innerText.replace(/\s+/g, " ").slice(0, 80));
  };

  const handleUpload = (box) => {
    if (box.classList.contains("error")) {
      box.classList.remove("error");
      box.classList.add("active");
      box.innerHTML = "附件已重新上传<br />等待识别";
      toast("已重新上传", "失败附件已进入识别队列。");
      return;
    }
    handleSelectable(box, ".upload-box", "已选择上传项");
  };

  const handleChatSend = (button) => {
    const frame = button.closest(".chat-frame, .panel");
    const input = $(".chat-input", frame);
    const stream = $(".chat-stream", frame) || $(".panel-body", frame);
    const value = input?.textContent.trim() || "请继续查询这个问题";
    if (stream) {
      const user = document.createElement("div");
      user.className = "chat-msg user";
      user.textContent = value;
      stream.appendChild(user);
      const ai = document.createElement("div");
      ai.className = "chat-msg ai";
      ai.innerHTML = `<div class="msg-title"><span class="tag">AI 回复</span>已收到补充信息</div>将继续识别意图，并在需要执行动作前请求确认。`;
      stream.appendChild(ai);
    }
    if (input) input.textContent = "";
    toast("已发送", "会话中新增了一轮用户输入和 AI 回复。");
  };

  const handleButton = (button) => {
    if (button.classList.contains("product-tab")) return handleProductTab(button);
    const text = getButtonText(button);
    const lower = text.toLowerCase();

    if (text.includes("复制")) return copyText(button);
    if (text.includes("编辑") || text.includes("改短") || text.includes("更正式")) return makeEditable(button);
    if (text.includes("发送") && button.closest(".chat-frame")) return handleChatSend(button);

    if (text.includes("确认") || text.includes("提交") || text.includes("应用") || text.includes("采纳") || text.includes("进入")) {
      const scope = button.closest(".intent-route, .prefill-field, .ticket-draft, .result-card, .recommend-card, .diff-row, .review-item, .notify-item, .card, .panel");
      scope?.classList.add("is-applied");
      addNote(button, "已应用", `${text} 已完成，真实产品中此处应写入业务系统并保留日志。`);
      return simulateProgress(button);
    }

    if (text.includes("取消") || text.includes("忽略") || text.includes("返回")) {
      const scope = button.closest(".component-body, .panel-body, .card");
      scope?.querySelector(".demo-action-note")?.remove();
      toast("已取消", "已回到当前组件的初始演示状态。");
      return;
    }

    if (text.includes("转人工") || text.includes("人工")) {
      addNote(button, "已转人工", "已保留当前上下文、失败原因和推荐交接对象。");
      toast("已转人工", "上下文会带入人工处理队列。");
      return;
    }

    if (text.includes("查看") || text.includes("查询") || text.includes("日志") || text.includes("原文")) {
      const scope = button.closest(".component-body, .panel-body, .card");
      addNote(button, "已展开详情", "这里会显示来源、日志、原文或查询结果。");
      toast("已展开详情", text);
      return;
    }

    if (text.includes("补") || text.includes("申请") || text.includes("修复") || text.includes("重试") || lower.includes("retry")) {
      addNote(button, "已进入补充流程", "已生成待办项，真实产品中会关联到材料、权限或配置流程。");
      return simulateProgress(button);
    }

    toast("已点击", text);
  };

  const hydrateTables = () => {
    $$("td").forEach((td) => {
      if (td.querySelector("button, a") || td.classList.contains("pseudo-action")) return;
      const text = td.textContent.trim();
      if (/^(查看|核对原图|发起补充|补字段|修复)$/.test(text)) {
        td.classList.add("pseudo-action");
        td.tabIndex = 0;
      }
    });
  };

  const hydrateChatInputs = () => {
    $$(".chat-input").forEach((input) => {
      input.contentEditable = "true";
      input.setAttribute("role", "textbox");
      input.setAttribute("aria-label", "聊天输入");
    });
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) return handleButton(button);

    const catalog = event.target.closest(".catalog-item");
    if (catalog) return handleCatalogClick(catalog);

    const upload = event.target.closest(".upload-box");
    if (upload) return handleUpload(upload);

    const productItem = event.target.closest(".product-item");
    if (productItem) return handleSelectable(productItem, ".product-item", "已切换产品导航");

    const selectable = event.target.closest(".ai-entry, .task-card, .entity-item, .intent-route, .review-item, .notify-item, .state, .state-card, .pattern-card, .check-row, .mapping-card, .split-card, .result-item, .metric-mini, .card");
    if (selectable) return handleSelectable(selectable, `.${selectable.classList[0]}`, "已选中组件项");

    const actionCell = event.target.closest(".pseudo-action");
    if (actionCell) {
      toast("已触发表格动作", actionCell.textContent.trim());
      actionCell.classList.add("is-applied");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const target = event.target;
    if (target.classList?.contains("chat-input")) {
      event.preventDefault();
      const button = $(".chat-composer .btn", target.closest(".chat-frame"));
      if (button) handleChatSend(button);
    }
    if (target.classList?.contains("pseudo-action")) {
      event.preventDefault();
      target.click();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    hydrateTables();
    hydrateChatInputs();
  });
})();

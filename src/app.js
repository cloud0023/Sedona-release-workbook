const DB_NAME = "sedona-workbook";
const DB_VERSION = 1;
const STORES = ["sessions", "rounds", "topicRecords", "goals", "actions", "gains"];

const EMOTION_PROMPTS = [
  "允许自己感受它吗？",
  "可以放它离开吗？",
  "愿意放它走吗？",
  "什么时候放它离开呢？"
];

const WANT_PROMPTS = [
  "允许自己感受这个想要吗？",
  "可以放它离开吗？"
];

const FREE_RELEASE_TOPIC = {
  id: "free-release",
  page: "自由",
  title: "自由释放",
  type: "emotion",
  workbookType: "自由记录",
  fields: ["释放对象", "当前情绪 / 感受 / 想要"],
  guidance: "不限定练习本主题，记录任何一次当下想做的释放。"
};

const EMOTION_GROUPS = [
  {
    name: "万念俱灰",
    icon: "☔",
    tone: "无望、能量低落",
    children: ["无聊", "不能赢", "担心大意", "冷淡", "停止", "死亡", "被打败", "沮丧", "泄气", "凄惨", "绝望", "气馁", "幻想破灭", "精疲力竭", "失败", "可遗忘的", "没出息", "放弃", "冷酷无情的", "没有希望", "没有幽默感", "我不行", "我不在乎", "我没有价值", "漫不经心", "优柔寡断", "冷漠", "没有存在感", "太晚了", "懊悔", "再等等吧", "无精打采", "失败者", "消极", "麻木不仁", "击溃", "无能为力", "认命", "震惊", "漫不经意", "停滞不前", "太累", "冷酷无情", "漫无目的", "没用", "模糊不清", "废品", "有什么用呢", "为什么要试呢", "不值得"]
  },
  {
    name: "悲苦",
    icon: "🌧",
    tone: "伤心、难过、失落痛苦",
    children: ["被遗弃", "被羞辱", "被控告", "极度痛苦", "丢脸", "被背叛", "忧郁", "被欺骗", "绝望", "失望", "心烦意乱", "尴尬的", "被忘掉", "愧疚的", "心碎的", "头痛", "泪丧", "无助的", "受伤", "要是早就好了", "被忽视的", "不够", "伤心欲绝", "不公平", "被遗忘", "极度渴望", "损失", "衰愁", "被误解", "哀悼", "被忽略", "没人关心我", "没人爱我", "乡愁", "错失", "遗憾", "可怜的我", "后悔", "被拒绝", "懊悔", "悲哀", "悲伤", "让人落泪的", "被精神上折磨", "被虐待", "不开心", "不被爱", "没人要", "脆弱", "为什么是我受伤的"]
  },
  {
    name: "恐惧",
    icon: "😟",
    tone: "担忧害怕、紧张不安",
    children: ["焦虑", "不安", "小心谨慎", "又冷又热又湿", "胆小怯懦", "自我防卫的", "不信任", "怀疑", "惧怕", "尴尬的", "逃避的", "预感", "狂乱的", "犹豫不决", "惊骇的", "歇斯底里", "拘束的", "不理解的", "恶心", "紧张", "恐慌", "麻痹的", "偏执狂", "被吓到的", "偷偷摸摸", "不可言", "羞涩", "怀疑的", "怯场", "迷信的", "多疑的", "简短生硬", "被吓坏的", "被威胁的", "羞怯", "陷入困境", "迟疑不决", "心神不宁", "容易受伤的", "想要逃避", "小心翼翼", "担心"]
  },
  {
    name: "贪求",
    icon: "◆",
    tone: "渴望占有、不够满足",
    children: ["放弃", "预期", "冷酷无情", "等不了", "冲动", "渴求", "苛求的", "狡诈的", "被驱使的", "嫉妒", "剥削", "过分迷恋", "暴怒", "失意的", "贪吃暴食的", "贪婪的", "囤积", "饥饿", "我想", "不耐烦", "好色的", "淫荡的", "操纵别人", "吝啬的", "一定要得到", "从来不满足", "从来不满意", "着迷的", "满发娇纵", "占有欲强的", "掠夺成性的", "困扰已见", "鲁莽", "残忍的", "诡计多端", "自私的", "如饥似渴", "放肆"]
  },
  {
    name: "愤怒",
    icon: "🔥",
    tone: "生气烦躁、抵抗敌意",
    children: ["伤人感情的", "好斗的", "被惹恼的", "好辩的", "好战的", "怒火", "令人恐惧的", "刻薄的", "挑衅的", "苛求的", "毁灭性的", "嫌恶", "脾气暴躁", "凶猛的", "泄气的", "气愤", "狂怒的", "严厉", "憎恨", "敌意", "不耐烦", "愤愤不平", "生气", "妒忌", "怒气冲冲", "疯狂", "卑鄙", "残忍", "凶残的", "义愤填膺", "坏脾气", "顽固", "抵制", "粗鲁", "野蛮", "冲突激化", "怨恨", "暴力", "易爆发", "恶劣的", "任性的"]
  },
  {
    name: "自尊自傲",
    icon: "♛",
    tone: "自我重要、优越比较",
    children: ["无耻可寻", "超然离群", "自负", "固执己见", "无聊", "聪明", "封闭的", "沾沾自喜", "逞能", "轻蔑的", "酷", "挑剔的", "鄙夷", "傲慢专断", "假谦卑", "虚假美德", "扬扬得意", "傲慢", "自以为是", "虚伪", "冷冰冰地", "孤僻的", "批判性的", "自称无所不知的", "心胸狭隘", "永远不会错", "武断", "盛气凌人", "神气十足", "偏颇的", "放肆", "自以为公正的", "刚直不屈", "自恋的", "自鸣得意", "自私", "自命不凡", "势利眼", "独特", "被宠坏的", "顽固不化", "自高自大", "优越感", "强硬不妥协", "无感觉的", "不宽恕的", "不屈服的", "爱慕虚荣"]
  },
  {
    name: "无畏",
    icon: "⚑",
    tone: "勇敢自信、积极主动",
    children: ["喜欢冒险的", "警惕的", "活着的", "胸有成竹", "机智的", "有中心的", "有把握的", "愉快", "思路清晰", "伶俐", "能干的", "自信的", "创新的", "大胆", "果断的", "有活力", "热切的", "热情的", "欢欣", "探索", "灵活性", "专注的", "乐善好施", "开心", "可敬的", "幽默", "我行", "独立", "首创精神", "正直", "所向披靡", "有爱的", "头脑清楚", "自强不息", "开放", "乐观", "洞察力", "积极", "意志坚强", "敏感的", "稳当的", "自给自足", "犀利的", "坚强的", "助人为乐", "不知疲惫", "精力充沛", "乐意", "热忱"]
  },
  {
    name: "接纳",
    icon: "💜",
    tone: "敞开包容、理解慈悲",
    children: ["丰盛", "有眼力的", "平衡", "美丽", "归属感", "天真烂漫", "同情心", "体贴的", "高兴", "兴高采烈", "拥抱", "善解人意", "丰富", "一切都很好", "友善的", "丰满", "温柔", "热情洋溢", "亲切的", "和睦的", "和谐", "直觉的", "合拍", "令人高兴的", "富有爱心的", "宽宏大量", "成熟的", "轻松自如", "无需更改", "开放", "幽默的", "容光焕发", "善于接受", "稳当的", "温和的", "柔和的", "理解", "温暖", "幸福", "奇迹"]
  },
  {
    name: "平和",
    icon: "✿",
    tone: "平静安宁、满足喜悦",
    children: ["永不衰老", "有觉悟的", "存在", "无边无际", "镇定", "不朽", "自由", "满足的", "热情洋溢", "轻松", "同一性", "完美", "纯粹", "安静", "宁静", "无限空间", "静止", "永恒的", "安宁", "无限", "完整"]
  }
];

const TOPICS = [
  {
    id: "change-life",
    page: "10-13",
    title: "在我的生活中我想改变什么",
    type: "emotion",
    workbookType: "情绪/感受",
    fields: ["列出想改变的人、事、物", "我现在对此有什么感受？"],
    guidance: "写下生活中想改变的情况、人或问题。一次处理一个感受，释放到感觉良好后再继续下一项。"
  },
  {
    id: "suppress-express",
    page: "14-17",
    title: "压抑或表达",
    type: "emotion",
    workbookType: "情绪/感受",
    columns: ["当时压抑情绪的具体事情", "当时表达情绪的具体事情"],
    fields: ["具体事情", "我现在对此有什么感受？"],
    guidance: "回忆一次压抑或表达情绪的具体事件，关注此刻感受并释放。"
  },
  {
    id: "success",
    page: "18-20",
    title: "成功",
    type: "emotion",
    workbookType: "双列情绪",
    columns: ["如果成功", "如果失败"],
    fields: ["主题", "如果成功/失败，我现在的感受是什么？"],
    guidance: "选择一个想更成功的领域，交替释放对成功和失败的感受，直到更有能力、更轻松。"
  },
  {
    id: "likes-dislikes",
    page: "22-28",
    title: "喜欢与不喜欢",
    type: "emotion",
    workbookType: "双列情绪",
    columns: ["喜欢的方面", "不喜欢的方面"],
    fields: ["主题", "我喜欢/不喜欢什么？", "我现在对此有什么感受？"],
    guidance: "围绕一个主题交替写下喜欢和不喜欢的方面，也继续释放好感觉。"
  },
  {
    id: "must-do",
    page: "30-32",
    title: "我必须做的事",
    type: "emotion",
    workbookType: "情绪/感受",
    fields: ["我觉得必须做的事情", "我现在对此有什么感受？"],
    guidance: "列出你觉得不得不做的事，释放每一项背后的感受。"
  },
  {
    id: "goal-feelings",
    page: "39-46",
    title: "目标表格",
    type: "emotion",
    workbookType: "目标情绪",
    fields: ["目标", "我对目标现在有什么感受？"],
    guidance: "读一遍目标，释放你现在对目标的感受，直到无畏、接纳或平静。"
  },
  {
    id: "goal-actions",
    page: "41-45",
    title: "目标行动清单",
    type: "emotion",
    workbookType: "行动情绪",
    fields: ["为了达成目标我要做的事", "我现在对每一件事有什么感受？"],
    guidance: "行动项必须关联目标。逐一释放对行动的感受，直到能轻松行动。"
  },
  {
    id: "remember-approval-control",
    page: "51-54",
    title: "回想：被认同与控制",
    type: "want",
    workbookType: "想要",
    columns: ["想要被认同的具体事情", "想要控制的具体事情"],
    fields: ["具体事情", "我现在对此想要什么？"],
    guidance: "回想具体事情，写下现在的想要：想要被认同、想要控制或想要安全，然后释放这个想要。"
  },
  {
    id: "letting-go-wants",
    page: "56-59",
    title: "释放想要",
    type: "want",
    workbookType: "双列想要",
    columns: ["我想要什么？", "我不想要什么？"],
    fields: ["想要/不想要的内容", "现在的想要"],
    guidance: "列出想要和不想要的东西，一次处理一项，释放当前想要。"
  },
  {
    id: "want-control",
    page: "61-63",
    title: "想要控制",
    type: "want",
    workbookType: "双列想要",
    columns: ["从想要控制中我能得到什么？", "从想要被控制中我能得到什么？"],
    fields: ["得到什么", "现在的想要"],
    guidance: "看着每一项，觉察现在的想要并释放。"
  },
  {
    id: "want-approval",
    page: "65-67",
    title: "想要被认同",
    type: "want",
    workbookType: "双列想要",
    columns: ["从想要被认同中我能得到什么？", "从想要不被认同中我能得到什么？"],
    fields: ["得到什么", "现在的想要"],
    guidance: "围绕认同与不被认同，释放每一项背后的想要。"
  },
  {
    id: "want-security",
    page: "69-71",
    title: "回想：安全 / 生存",
    type: "want",
    workbookType: "想要",
    fields: ["当时想要安全/生存的具体事情", "我现在对此想要什么？"],
    guidance: "写下想要安全或生存的具体事情，再释放现在的想要。"
  },
  {
    id: "stuckness",
    page: "72-75",
    title: "化解卡住",
    type: "want",
    workbookType: "双列想要",
    columns: ["对我有什么好处？", "对我有什么坏处？"],
    fields: ["主题", "好处/坏处", "现在的想要"],
    guidance: "选择卡住的主题，交替释放好处与坏处背后的想要。想不出来时可写“无”。"
  },
  {
    id: "seeing-wants",
    page: "76-79",
    title: "觉察三种想要",
    type: "want",
    workbookType: "想要",
    columns: ["寻求被认同", "寻求安全", "试图控制"],
    fields: ["我的方式", "现在的想要"],
    guidance: "列出寻求认同、安全和控制的方式，释放对应的想要。"
  },
  {
    id: "happiness",
    page: "80-82",
    title: "快乐",
    type: "want",
    workbookType: "双列想要",
    columns: ["我需要什么才能获得快乐？", "我需要避免什么才能获得快乐？"],
    fields: ["需要/避免的事情", "现在的想要"],
    guidance: "释放为了快乐而认为需要或需要避免的事情，直到感到快乐。"
  }
];

const state = {
  route: "home",
  topicId: null,
  selectedTopicRecordId: null,
  releaseSetup: null,
  sessionId: null,
  release: null,
  toast: "",
  dialog: null,
  data: {
    sessions: [],
    rounds: [],
    topicRecords: [],
    goals: [],
    actions: [],
    gains: []
  }
};

const app = document.querySelector("#app");
let db;
let emotionPressTimer = null;
let emotionLongPressed = false;
let ignoreNextEmotionClick = false;

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function formatDate(value) {
  if (!value) return "未记录";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function getTopic(id) {
  if (id === FREE_RELEASE_TOPIC.id) return FREE_RELEASE_TOPIC;
  return TOPICS.find((topic) => topic.id === id);
}

function splitEntries(value = "") {
  return String(value)
    .split(/[\n,，;；、]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function recordItems(record) {
  if (Array.isArray(record.items) && record.items.length) return record.items.filter((item) => item.text || item.id);
  if (record.feeling) return [{ id: `${record.id}-legacy`, text: record.feeling, released: Boolean(record.released) }];
  return [];
}

function feelingLabel(topic) {
  return topic.type === "want" ? "我对此有什么想要？" : "我对此有什么感受？";
}

function feelingPlaceholder(topic) {
  return topic.type === "want"
    ? "想要被认同、想要控制、想要安全... 可填写多个，用换行或逗号分开"
    : "焦虑、愤怒、难过... 可填写多个，用换行或逗号分开";
}

function fieldName(topic) {
  return topic.type === "want" ? "想要" : "感受";
}

function releaseRowsFromForm(form) {
  return [...form.querySelectorAll(".release-table-row")]
    .map((row) => {
      const id = row.querySelector('input[name="itemId"]')?.value || uid("item");
      const text = row.querySelector('input[name="itemText"]')?.value.trim() || "";
      const released = Boolean(row.querySelector('input[name="itemReleased"]')?.checked);
      return { id, text, released };
    })
    .filter((item) => item.text);
}

function makeReleaseTableRow(label = "") {
  return `
    <div class="release-table-row">
      <input name="itemText" placeholder="${label}" />
      <label class="mini-check"><input type="checkbox" name="itemReleased" /><span>✓</span></label>
      <button class="row-delete-btn" type="button" data-action="remove-topic-form-row" aria-label="删除这一行">×</button>
    </div>
  `;
}

function promptsFor(type) {
  return type === "want" ? WANT_PROMPTS : EMOTION_PROMPTS;
}

function modeLabel(type) {
  return type === "want" ? "释放想要" : "释放情绪";
}

function emotionPicker() {
  return `
    <div class="emotion-picker" aria-label="九大情绪选择">
      <div class="emotion-divider"><span></span><b>或直接选择一种情绪</b><span></span></div>
      <div class="emotion-card-row">
        ${EMOTION_GROUPS.map((group, index) => `
          <article class="emotion-card emotion-card-${index}" data-emotion-card data-emotion="${group.name}">
            <button class="emotion-card-main" type="button" data-action="select-emotion" data-emotion="${group.name}">
              <span class="emotion-icon">${group.icon}</span>
              <strong>${group.name}</strong>
              <small>${group.tone}</small>
              <i></i>
            </button>
            <div class="emotion-sublist" aria-label="${group.name}子情绪">
              ${group.children.map((child) => `<button type="button" data-action="select-emotion" data-emotion="${group.name}">${child}</button>`).join("")}
            </div>
          </article>
        `).join("")}
      </div>
      <div class="energy-scale"><span>能量低落 / 扭曲</span><i></i><span>能量提升 / 连接</span></div>
    </div>
  `;
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      for (const store of STORES) {
        if (!database.objectStoreNames.contains(store)) database.createObjectStore(store, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readStore(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readonly");
    const request = tx.objectStore(store).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function putStore(store, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).put(value);
    tx.oncomplete = () => resolve(value);
    tx.onerror = () => reject(tx.error);
  });
}

function deleteStore(store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadData() {
  for (const store of STORES) state.data[store] = await readStore(store);
}

async function save(store, value) {
  await putStore(store, value);
  await loadData();
  render();
}

function setRoute(route, extra = {}) {
  state.route = route;
  Object.assign(state, extra);
  window.scrollTo({ top: 0, behavior: "instant" });
  render();
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2400);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeFilePart(value = "未命名") {
  return String(value || "未命名")
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 48) || "未命名";
}

function fileTime(value = nowIso()) {
  const date = value ? new Date(value) : new Date();
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function markdownEscape(value = "") {
  return String(value || "").replace(/\r\n/g, "\n").trim();
}

function promptChoices(prompt) {
  if (prompt.includes("允许自己感受")) return ["允许", "不允许"];
  if (prompt.includes("可以放它离开吗")) return ["可以", "还不行"];
  if (prompt.includes("愿意放它走吗")) return ["愿意", "不愿意"];
  if (prompt.includes("什么时候放它离开呢")) return ["现在", "不确定"];
  return ["是", "否"];
}

function recordMarkdown(record) {
  const topic = getTopic(record.topicId) || FREE_RELEASE_TOPIC;
  const items = recordItems(record);
  const sessions = state.data.sessions.filter((session) => session.recordId === record.id);
  const rounds = sessions.flatMap((session) =>
    state.data.rounds
      .filter((round) => round.sessionId === session.id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((round) => ({ ...round, session }))
  );
  const lines = [
    `# ${markdownEscape(record.subject || "未命名释放")}`,
    "",
    `- 主题：${topic.title}`,
    `- 页码：${topic.page}`,
    `- 类型：${modeLabel(record.releaseType || topic.type)}`,
    record.column ? `- 所属列：${markdownEscape(record.column)}` : "",
    `- 创建时间：${record.createdAt || ""}`,
    `- 更新时间：${record.updatedAt || ""}`,
    `- 感觉好了吗：${record.feelsGood ? "是" : "否"}`,
    "",
    "## 情绪 / 想要",
    "",
    ...(items.length ? items.map((item) => `- [${item.released ? "x" : " "}] ${markdownEscape(item.text)}`) : ["- 未填写"]),
    "",
    "## 引导记录",
    "",
    ...(rounds.length
      ? rounds.map((round, index) => [
          `### 第 ${index + 1} 轮：${markdownEscape(round.feeling)}`,
          "",
          ...((round.promptAnswers || []).map((answer) => `- ${markdownEscape(answer.prompt)}：${markdownEscape(answer.answer)}`)),
          `- 释放了吗：${round.released ? "是" : "否"}`,
          `- 感觉好了吗：${round.feelsGood ? "是" : "否"}`,
          ""
        ].join("\n"))
      : ["暂无引导轮次。"]),
    "",
    "## 收获",
    "",
    markdownEscape(record.gain || "未填写")
  ];
  return lines.filter((line) => line !== "").join("\n");
}

function gainMarkdown(gain) {
  const topic = getTopic(gain.topicId);
  return [
    `# 收获`,
    "",
    `- 时间：${gain.createdAt || ""}`,
    topic ? `- 来源主题：${topic.title}` : "",
    gain.recordSubject ? `- 释放内容：${markdownEscape(gain.recordSubject)}` : "",
    "",
    markdownEscape(gain.body || "未填写")
  ].filter((line) => line !== "").join("\n");
}

function makeCrcTable() {
  const table = [];
  for (let index = 0; index < 256; index += 1) {
    let code = index;
    for (let bit = 0; bit < 8; bit += 1) code = code & 1 ? 0xedb88320 ^ (code >>> 1) : code >>> 1;
    table[index] = code >>> 0;
  }
  return table;
}

const CRC_TABLE = makeCrcTable();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function writeU16(target, value) {
  target.push(value & 0xff, (value >>> 8) & 0xff);
}

function writeU32(target, value) {
  target.push(value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff);
}

function makeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.path);
    const contentBytes = encoder.encode(file.content);
    const crc = crc32(contentBytes);
    const local = [];
    writeU32(local, 0x04034b50);
    writeU16(local, 20);
    writeU16(local, 0x0800);
    writeU16(local, 0);
    writeU16(local, 0);
    writeU16(local, 0);
    writeU32(local, crc);
    writeU32(local, contentBytes.length);
    writeU32(local, contentBytes.length);
    writeU16(local, nameBytes.length);
    writeU16(local, 0);
    chunks.push(new Uint8Array(local), nameBytes, contentBytes);

    const directory = [];
    writeU32(directory, 0x02014b50);
    writeU16(directory, 20);
    writeU16(directory, 20);
    writeU16(directory, 0x0800);
    writeU16(directory, 0);
    writeU16(directory, 0);
    writeU16(directory, 0);
    writeU32(directory, crc);
    writeU32(directory, contentBytes.length);
    writeU32(directory, contentBytes.length);
    writeU16(directory, nameBytes.length);
    writeU16(directory, 0);
    writeU16(directory, 0);
    writeU16(directory, 0);
    writeU16(directory, 0);
    writeU32(directory, 0);
    writeU32(directory, offset);
    central.push(new Uint8Array(directory), nameBytes);
    offset += local.length + nameBytes.length + contentBytes.length;
  }

  const centralSize = central.reduce((sum, chunk) => sum + chunk.length, 0);
  const end = [];
  writeU32(end, 0x06054b50);
  writeU16(end, 0);
  writeU16(end, 0);
  writeU16(end, files.length);
  writeU16(end, files.length);
  writeU32(end, centralSize);
  writeU32(end, offset);
  writeU16(end, 0);

  return new Blob([...chunks, ...central, new Uint8Array(end)], { type: "application/zip" });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportTopicRecords() {
  const records = [...state.data.topicRecords].sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  if (!records.length) return showToast("还没有可导出的释放记录");
  const files = records.map((record) => {
    const topic = getTopic(record.topicId) || FREE_RELEASE_TOPIC;
    const folder = safeFilePart(topic.title);
    const filename = `${safeFilePart(record.subject || "释放内容")}-${fileTime(record.createdAt)}.md`;
    return { path: `${folder}/${filename}`, content: recordMarkdown(record) };
  });
  downloadBlob(makeZip(files), `主题释放数据库-${fileTime()}.zip`);
  showToast("主题释放数据库已导出");
}

function exportGains() {
  const topicGains = state.data.topicRecords
    .filter((record) => record.gain)
    .map((record) => ({
      id: `topic-gain-${record.id}`,
      body: record.gain,
      createdAt: record.updatedAt || record.createdAt,
      topicId: record.topicId,
      recordSubject: record.subject,
      source: "topic-record"
    }));
  const gains = [...state.data.gains, ...topicGains].sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
  if (!gains.length) return showToast("还没有可导出的收获");
  const files = gains.map((gain) => ({
    path: `收获本/收获-${fileTime(gain.createdAt)}.md`,
    content: gainMarkdown(gain)
  }));
  downloadBlob(makeZip(files), `收获本-${fileTime()}.zip`);
  showToast("收获本已导出");
}

function appFrame(content) {
  return `
    <header class="topbar">
      <button class="icon-btn" data-action="back" aria-label="返回">‹</button>
      <div class="brand">
        <strong>释放法练习本</strong>
        <span>本地记录 · 按练习本顺序</span>
      </div>
      <button class="icon-btn" data-route="home" aria-label="首页">⌂</button>
    </header>
    ${content}
    ${bottomNav()}
    ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
    ${state.dialog ? renderDialog() : ""}
  `;
}

function bottomNav() {
  const items = [
    ["home", "⌂", "首页"],
    ["topics", "目", "主题"],
    ["releaseStart", "放", "释放"],
    ["gains", "获", "收获"]
  ];
  return `
    <nav class="bottom-nav" aria-label="主要导航">
      <div class="bottom-nav-inner">
        ${items
          .map(
            ([route, icon, label]) => `
              <button class="nav-item ${state.route === route ? "active" : ""}" data-route="${route}">
                <span class="nav-icon">${icon}</span>
                <span>${label}</span>
              </button>`
          )
          .join("")}
      </div>
    </nav>
  `;
}

function homeView() {
  const completed = state.data.sessions.filter((item) => item.status === "completed").length;
  const open = state.data.sessions.filter((item) => item.status === "in-progress").length;
  return appFrame(`
    <main>
      <section class="hero">
        <span class="eyebrow">Week 1 + Week 2 workbook</span>
        <h1>随时随地释放</h1>
        <p>把原练习本变成可填写、可继续、可回看的手机练习空间。每一次感受、想要和收获都留在本机。</p>
      </section>
      <section class="status-strip" aria-label="记录概览">
        <div class="stat"><b>${state.data.topicRecords.length}</b><span>主题记录</span></div>
        <div class="stat"><b>${completed}</b><span>完成释放</span></div>
        <div class="stat"><b>${state.data.gains.length}</b><span>收获</span></div>
      </section>
      ${open ? `<button class="entry-card" data-action="resume-latest"><span class="mark">续</span><strong>继续未完成释放</strong><span>还有 ${open} 次释放保存为进行中。</span></button>` : ""}
      <section class="entry-grid">
        ${entryCard("topics", "目", "主题释放数据库", "按原书目录进入主题，查看资料提醒，并以表格形式填写。")}
        ${entryCard("releaseStart", "放", "开始释放", "主题释放或自由释放，系统按情绪/想要切换引导问题。")}
        ${entryCard("gains", "获", "收获本", "记录每次释放后的好处、成功、变化和觉察。")}
        ${entryCard("goals", "标", "目标与行动", "目标表格和行动清单相互关联，释放行动阻力。")}
      </section>
    </main>
  `);
}

function entryCard(route, mark, title, description) {
  return `
    <button class="entry-card" data-route="${route}">
      <span class="mark">${mark}</span>
      <strong>${title}</strong>
      <span>${description}</span>
    </button>
  `;
}

function topicsView() {
  const topics = [...TOPICS, FREE_RELEASE_TOPIC];
  return appFrame(`
    <main class="screen">
      <div class="title-row">
        <div>
          <span class="eyebrow">Workbook topics</span>
          <h1 class="screen-title">主题释放数据库</h1>
        </div>
        <button class="soft-btn" data-action="export-topic-records">导出</button>
      </div>
      <div class="topic-list">
        ${topics.map((topic) => {
          const count = state.data.topicRecords.filter((record) => record.topicId === topic.id).length;
          return `
            <button class="list-card" data-topic="${topic.id}">
              <header>
                <h3>${topic.title}</h3>
                <span class="pill">P.${topic.page}</span>
              </header>
              <div class="pill-row">
                <span class="pill">${topic.workbookType}</span>
                <span class="pill">${modeLabel(topic.type)}</span>
                <span class="pill">${count} 条</span>
              </div>
              <p>${topic.guidance}</p>
            </button>
          `;
        }).join("")}
      </div>
    </main>
  `);
}

function topicDetailView() {
  const topic = getTopic(state.topicId) || TOPICS[0];
  const records = state.data.topicRecords.filter((record) => record.topicId === topic.id);
  const selected = records.find((record) => record.id === state.selectedTopicRecordId) || records[0];
  const isFreeTopic = topic.id === FREE_RELEASE_TOPIC.id;
  return appFrame(`
    <main class="screen">
      <div>
        <span class="eyebrow">练习本 P.${topic.page}</span>
        <h1 class="screen-title">${topic.title}</h1>
      </div>
      <section class="panel">
        <div class="pill-row">
          <span class="pill">${topic.workbookType}</span>
          <span class="pill">${modeLabel(topic.type)}</span>
          ${topic.columns ? topic.columns.map((item) => `<span class="pill">${item}</span>`).join("") : ""}
        </div>
        <p>${topic.guidance}</p>
      </section>
      ${isFreeTopic ? "" : topicForm(topic)}
      <section>
        <div class="section-heading-row">
          <h2 class="section-title">释放记录</h2>
          ${isFreeTopic ? "" : `<button class="icon-btn add-record-btn" data-action="create-empty-topic-record" data-topic="${topic.id}" aria-label="新增释放记录">＋</button>`}
        </div>
        ${records.length ? topicRecordsBrowser(topic, records, selected) : `<div class="empty">${isFreeTopic ? "还没有自由释放记录。可以从“开始释放”里创建。" : "还没有记录。先写下一项，再逐个勾选释放结果。"}</div>`}
      </section>
    </main>
  `);
}

function topicForm(topic) {
  const goalOptions = state.data.goals.map((goal) => `<option value="${goal.id}">${escapeHtml(goal.statement)}</option>`).join("");
  return `
    <form class="form-card" data-form="topic-record">
      <h2 class="section-title">添加释放记录</h2>
      <input type="hidden" name="topicId" value="${topic.id}" />
      <div class="field">
        <label>${topic.fields[0]}</label>
        <textarea name="subject" required placeholder="写下这一项"></textarea>
      </div>
      ${topic.columns ? `
        <div class="field">
          <label>所属列</label>
          <select name="column">
            ${topic.columns.map((column) => `<option value="${column}">${column}</option>`).join("")}
          </select>
        </div>
      ` : ""}
      <div class="release-table" data-release-table>
        <div class="release-table-head">
          <span>${feelingLabel(topic)}</span>
          <span>释放了吗</span>
          <span></span>
        </div>
        <div class="release-table-row">
          <input name="itemText" required placeholder="${feelingPlaceholder(topic)}" />
          <label class="mini-check"><input type="checkbox" name="itemReleased" value="0" /><span>✓</span></label>
          <button class="row-delete-btn" type="button" data-action="remove-topic-form-row" aria-label="删除这一行">×</button>
        </div>
      </div>
      <button class="soft-btn" type="button" data-action="add-topic-form-row">添加一种${fieldName(topic)}</button>
      ${topic.id.includes("goal") ? `
        <div class="field">
          <label>关联目标</label>
          <select name="goalId">
            <option value="">不关联</option>
            ${goalOptions}
          </select>
        </div>
      ` : ""}
      <div class="field">
        <label>感觉好了吗？</label>
        <div class="choice-grid" data-choice="feelsGood">
          <button class="choice-btn selected" type="button" data-value="false">还没有</button>
          <button class="choice-btn" type="button" data-value="true">感觉好了</button>
        </div>
        <input type="hidden" name="feelsGood" value="false" />
      </div>
      <div class="field">
        <label>收获</label>
        <textarea name="gain" placeholder="这次练习后的收获、变化或觉察"></textarea>
      </div>
      <div class="action-row">
        <button class="primary-btn" type="submit">保存记录</button>
      </div>
    </form>
  `;
}

function topicRecordsBrowser(topic, records, selected) {
  return `
    <div class="record-browser">
      <div class="record-master" aria-label="释放目标列表">
        ${records.map((record) => `
          <button class="record-master-item ${selected?.id === record.id ? "active" : ""}" data-action="select-topic-record" data-record="${record.id}">
            <span class="box-mark">${record.feelsGood ? "✓" : ""}</span>
            <span>
              <strong>${escapeHtml(record.subject)}</strong>
              <small>${record.column ? `${escapeHtml(record.column)} · ` : ""}${formatDate(record.createdAt)}</small>
            </span>
          </button>
        `).join("")}
      </div>
      <div class="record-detail">
        ${selected ? topicRecordDetail(topic, selected) : ""}
      </div>
    </div>
  `;
}

function topicRecordDetail(topic, record) {
  const items = recordItems(record);
  const releaseType = record.releaseType || topic.type;
  const itemLabel = releaseType === "want" ? "想要" : "感受";
  const itemQuestion = releaseType === "want" ? "我对此有什么想要？" : "我对此有什么感受？";
  return `
    <form class="record-detail-card" data-form="update-topic-record" data-record="${record.id}">
      <header>
        <div class="field compact-field">
          <label>${topic.fields[0]}</label>
          <textarea name="subject" required>${escapeHtml(record.subject)}</textarea>
        </div>
        <span class="meta">${formatDate(record.createdAt)}</span>
      </header>
      ${topic.columns ? `
        <div class="field compact-field">
          <label>所属列</label>
          <select name="column">
            ${topic.columns.map((column) => `<option value="${column}" ${record.column === column ? "selected" : ""}>${column}</option>`).join("")}
          </select>
        </div>
      ` : `<input type="hidden" name="column" value="${escapeHtml(record.column || "")}" />`}
      <div class="release-table" data-release-table>
        <div class="release-table-head">
          <span>${itemQuestion}</span>
          <span>释放了吗</span>
          <span></span>
        </div>
        ${items.length ? items.map((item) => `
          <div class="release-table-row">
            <input type="hidden" name="itemId" value="${escapeHtml(item.id)}" />
            <input name="itemText" value="${escapeHtml(item.text)}" placeholder="${itemLabel}" />
            <label class="mini-check"><input type="checkbox" name="itemReleased" value="${escapeHtml(item.id)}" ${item.released ? "checked" : ""} /><span>✓</span></label>
            <button class="row-delete-btn" type="button" data-action="remove-topic-form-row" aria-label="删除这一行">×</button>
          </div>
        `).join("") : `<div class="empty">还没有${itemLabel}。</div>`}
      </div>
      <button class="soft-btn" type="button" data-action="add-topic-form-row">添加一种${itemLabel}</button>
      <label class="record-good-toggle">
        <span class="box-mark">${record.feelsGood ? "✓" : ""}</span>
        <span>感觉好了吗？</span>
        <input type="checkbox" name="feelsGood" ${record.feelsGood ? "checked" : ""} />
      </label>
      <div class="field compact-field">
        <label>收获</label>
        <textarea name="gain" placeholder="这次练习后的收获、变化或觉察">${escapeHtml(record.gain || "")}</textarea>
      </div>
      <div class="action-row">
        <button class="primary-btn" type="submit">保存修改</button>
        <button class="soft-btn danger-btn" type="button" data-action="delete-record" data-record="${record.id}">删除</button>
      </div>
    </form>
  `;
}

function releaseStartView() {
  const inProgress = state.data.sessions
    .filter((session) => session.status === "in-progress")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return appFrame(`
    <main class="screen">
      <div>
        <span class="eyebrow">Guided release</span>
        <h1 class="screen-title">开始释放</h1>
      </div>
      <section class="panel">
        <h2 class="section-title">主题释放</h2>
        <p>按练习本主题自动决定释放情绪还是释放想要。</p>
        <select id="topicSelect" aria-label="选择主题">
          ${TOPICS.map((topic) => `<option value="${topic.id}">${topic.title} · ${modeLabel(topic.type)}</option>`).join("")}
        </select>
        <button class="primary-btn" data-action="start-selected-topic">开始主题释放</button>
      </section>
      <form class="form-card" data-form="free-release">
        <h2 class="section-title">自由释放</h2>
        <div class="field">
          <label>释放对象</label>
          <textarea name="subject" required placeholder="写下此刻想释放的人、事、情绪或想要"></textarea>
        </div>
        <div class="field">
          <label>释放类型</label>
          <div class="choice-grid" data-choice="releaseType">
            <button class="choice-btn selected" type="button" data-value="emotion">情绪 / 感受</button>
            <button class="choice-btn" type="button" data-value="want">想要</button>
          </div>
          <input type="hidden" name="releaseType" value="emotion" />
        </div>
        <div class="field">
          <label>当前情绪 / 感受 / 想要</label>
          <input name="feeling" required placeholder="现在最明显的是什么？" />
        </div>
        <button class="primary-btn" type="submit">进入引导</button>
      </form>
      ${inProgress.length ? `
        <section>
          <h2 class="section-title">进行中</h2>
          <div class="record-list">
            ${inProgress.map(sessionCard).join("")}
          </div>
        </section>
      ` : ""}
    </main>
  `);
}

function releaseSetupView() {
  const setup = state.releaseSetup;
  if (!setup) return releaseStartView();
  const topic = getTopic(setup.topicId);
  const isSubjectStep = setup.step === "subject";
  return appFrame(`
    <main class="release-stage">
      <div>
        <span class="eyebrow">${topic.title} · ${modeLabel(topic.type)}</span>
        <h1 class="screen-title">主题释放</h1>
      </div>
      <form class="prompt-card" data-form="${isSubjectStep ? "release-setup-subject" : "release-setup-feeling"}">
        <input type="hidden" name="topicId" value="${topic.id}" />
        <span class="meta">${isSubjectStep ? "第一步" : "第二步"}</span>
        <p class="prompt-text">${isSubjectStep ? topic.fields[0] : feelingLabel(topic)}</p>
        ${isSubjectStep
          ? `<textarea name="subject" required placeholder="写下这次具体释放的内容">${escapeHtml(setup.subject || "")}</textarea>`
          : `<input name="feeling" required placeholder="${topic.type === "want" ? "现在最明显的想要是什么？" : "现在最明显的感受是什么？"}" />
            ${topic.type === "emotion" ? emotionPicker() : ""}`}
        <button class="primary-btn" type="submit">${isSubjectStep ? "下一步" : "进入引导"}</button>
      </form>
      <div class="action-row">
        <button class="soft-btn" data-action="cancel-release-setup">取消</button>
      </div>
    </main>
  `);
}

function sessionCard(session) {
  const topic = getTopic(session.topicId);
  return `
    <article class="list-card">
      <header>
        <h3>${escapeHtml(session.subject)}</h3>
        <span class="meta">${formatDate(session.updatedAt)}</span>
      </header>
      <div class="pill-row">
        <span class="pill">${topic ? topic.title : "自由释放"}</span>
        <span class="pill">${modeLabel(session.releaseType)}</span>
        <span class="pill">${session.status === "completed" ? "已结束" : "进行中"}</span>
      </div>
      <p>${escapeHtml(session.currentFeeling || "等待继续")}</p>
      <div class="action-row">
        <button class="primary-btn" data-action="resume-session" data-session="${session.id}">继续</button>
      </div>
    </article>
  `;
}

function releaseView() {
  if (!state.release) return releaseStartView();
  const release = state.release;
  const prompts = promptsFor(release.releaseType);
  const prompt = prompts[release.promptIndex];
  const topic = getTopic(release.topicId);
  const roundNo = release.rounds.length + 1;
  let content = "";

  if (release.step === "prompt") {
    const choices = promptChoices(prompt);
    content = `
      <section class="prompt-card">
        <span class="meta">${modeLabel(release.releaseType)} · 第 ${roundNo} 轮</span>
        <p class="prompt-text">${prompt}</p>
        <span class="hint">当前：${escapeHtml(release.currentFeeling)}</span>
        <div class="choice-grid">
          <button class="choice-btn emphasis-choice" data-action="answer-prompt" data-answer="${choices[0]}">${choices[0]}</button>
          <button class="choice-btn" data-action="answer-prompt" data-answer="${choices[1]}">${choices[1]}</button>
        </div>
      </section>
    `;
  }

  if (release.step === "released") {
    content = `
      <section class="prompt-card">
        <span class="meta">${modeLabel(release.releaseType)} · 检查</span>
        <p class="prompt-text">释放了吗？</p>
        <span class="hint">如果还没有，就回到同一个${release.releaseType === "want" ? "想要" : "情绪/感受"}重新询问。</span>
        <div class="choice-grid">
          <button class="choice-btn" data-action="answer-released" data-answer="true">释放了</button>
          <button class="choice-btn" data-action="answer-released" data-answer="false">还没有</button>
        </div>
      </section>
    `;
  }

  if (release.step === "feelsGood") {
    content = `
      <section class="prompt-card">
        <span class="meta">结束条件</span>
        <p class="prompt-text">感觉好吗？</p>
        <span class="hint">只有感觉好了，才结束这次释放。</span>
        <div class="choice-grid">
          <button class="choice-btn" data-action="answer-good" data-answer="true">感觉好了</button>
          <button class="choice-btn" data-action="answer-good" data-answer="false">还不好</button>
        </div>
      </section>
    `;
  }

  if (release.step === "nextFeeling") {
    content = `
      <form class="prompt-card" data-form="next-feeling">
        <span class="meta">继续循环</span>
        <p class="prompt-text">当前是什么${release.releaseType === "want" ? "想要" : "情绪/感受"}？</p>
        <input name="feeling" required value="${escapeHtml(release.currentFeeling)}" />
        <button class="primary-btn" type="submit">继续释放</button>
      </form>
    `;
  }

  return appFrame(`
    <main class="release-stage">
      <div>
        <span class="eyebrow">${topic ? topic.title : "自由释放"}</span>
        <h1 class="screen-title">${escapeHtml(release.subject)}</h1>
      </div>
      ${content}
      <div class="action-row">
        <button class="soft-btn" data-action="pause-release">暂停保存</button>
        <button class="soft-btn danger-btn" data-action="cancel-release">退出</button>
      </div>
    </main>
  `);
}

function gainsView() {
  const topicGains = state.data.topicRecords
    .filter((record) => record.gain)
    .map((record) => ({
      id: `topic-gain-${record.id}`,
      body: record.gain,
      createdAt: record.updatedAt || record.createdAt,
      topicId: record.topicId,
      recordSubject: record.subject,
      source: "topic-record"
    }));
  const gains = [...state.data.gains, ...topicGains].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return appFrame(`
    <main class="screen">
      <div class="title-row">
        <div>
          <span class="eyebrow">Wins journal</span>
          <h1 class="screen-title">收获本</h1>
        </div>
        <button class="soft-btn" data-action="export-gains">导出</button>
      </div>
      <form class="form-card" data-form="gain">
        <div class="field">
          <label>新的收获</label>
          <textarea name="body" required placeholder="今天通过释放看见了什么、轻松了什么、完成了什么？"></textarea>
        </div>
        <button class="primary-btn" type="submit">写入收获本</button>
      </form>
      <div class="gain-list">
        ${gains.length ? gains.map(gainCard).join("") : `<div class="empty">收获可以很简单：从糟糕的感觉变得好一点，也算。</div>`}
      </div>
    </main>
  `);
}

function gainCard(gain) {
  const topic = getTopic(gain.topicId);
  return `
    <article class="list-card">
      <header>
        <h3>${formatDate(gain.createdAt)}</h3>
        <span class="pill">${gain.source === "topic-record" ? "主题释放" : gain.sessionId ? "释放后" : "手动"}</span>
      </header>
      ${topic ? `<div class="pill-row"><span class="pill">${topic.title}</span><span class="pill">${escapeHtml(gain.recordSubject || "")}</span></div>` : ""}
      <p>${escapeHtml(gain.body)}</p>
      ${gain.source === "topic-record" ? "" : `<div class="action-row">
        <button class="soft-btn danger-btn" data-action="delete-gain" data-gain="${gain.id}">删除</button>
      </div>`}
    </article>
  `;
}

function goalsView() {
  const goals = [...state.data.goals].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return appFrame(`
    <main class="screen">
      <div>
        <span class="eyebrow">Goals and actions</span>
        <h1 class="screen-title">目标与行动</h1>
      </div>
      <form class="form-card" data-form="goal">
        <div class="field">
          <label>目标陈述</label>
          <textarea name="statement" required placeholder="用现在时、积极方式写下目标。例如：我允许自己轻松自然地..."></textarea>
        </div>
        <div class="field">
          <label>我对目标现在有什么感受？</label>
          <input name="feeling" placeholder="无畏、接纳、平静，或当前真实感受" />
        </div>
        <button class="primary-btn" type="submit">保存目标</button>
      </form>
      <section class="goal-list">
        ${goals.length ? goals.map(goalCard).join("") : `<div class="empty">先写一个目标，再列出为了达成目标我要做的事。</div>`}
      </section>
    </main>
  `);
}

function goalCard(goal) {
  const actions = state.data.actions.filter((item) => item.goalId === goal.id);
  return `
    <article class="list-card">
      <header>
        <h3>${escapeHtml(goal.statement)}</h3>
        <span class="meta">${formatDate(goal.createdAt)}</span>
      </header>
      <div class="pill-row">
        <span class="pill">${actions.length} 个行动</span>
        ${goal.feeling ? `<span class="pill">${escapeHtml(goal.feeling)}</span>` : ""}
      </div>
      <form class="small-table" data-form="action" data-goal="${goal.id}">
        <input name="title" required placeholder="为了达成目标我要做的事" />
        <input name="feeling" placeholder="我现在对这件事有什么感受？" />
        <button class="soft-btn" type="submit">添加行动</button>
      </form>
      ${actions.length ? `
        <div class="small-table">
          ${actions.map((item) => `
            <div class="table-row">
              <span>${escapeHtml(item.title)}<br><span class="hint">${escapeHtml(item.feeling || "未记录感受")}</span></span>
              <button class="check" data-action="release-action" data-action-id="${item.id}" aria-label="释放行动">放</button>
              <button class="check" data-action="toggle-action" data-action-id="${item.id}" aria-label="完成行动">${item.done ? "✓" : "○"}</button>
            </div>
          `).join("")}
        </div>
      ` : ""}
      <div class="action-row">
        <button class="soft-btn" data-action="release-goal" data-goal="${goal.id}">释放目标感受</button>
        <button class="soft-btn danger-btn" data-action="delete-goal" data-goal="${goal.id}">删除目标</button>
      </div>
    </article>
  `;
}

function renderDialog() {
  if (state.dialog.type === "start-topic-release") {
    const topic = getTopic(state.dialog.topicId);
    return `
      <div class="dialog-backdrop">
        <form class="dialog" data-form="start-topic-release">
          <input type="hidden" name="topicId" value="${topic.id}" />
          <h2>${topic.title}</h2>
          <div class="field">
            <label>${topic.fields[0]}</label>
            <textarea name="subject" required placeholder="写下这次具体释放的内容"></textarea>
          </div>
          <div class="field">
            <label>${feelingLabel(topic)}</label>
            <input name="feeling" required placeholder="${topic.type === "want" ? "现在最明显的想要是什么？" : "现在最明显的感受是什么？"}" />
          </div>
          <div class="action-row">
            <button class="primary-btn" type="submit">进入引导</button>
            <button class="soft-btn" type="button" data-action="close-dialog">取消</button>
          </div>
        </form>
      </div>
    `;
  }
  if (state.dialog.type !== "gain-after-release") return "";
  return `
    <div class="dialog-backdrop">
      <form class="dialog" data-form="post-release-gain">
        <h2>写下这次收获</h2>
        <p class="hint">可以很短。记录进步本身就是练习的一部分。</p>
        <textarea name="body" placeholder="这次释放后的收获是..."></textarea>
        <div class="action-row">
          <button class="primary-btn" type="submit">保存收获</button>
          <button class="soft-btn" type="button" data-action="skip-gain">稍后再写</button>
        </div>
      </form>
    </div>
  `;
}

function render() {
  const views = {
    home: homeView,
    topics: topicsView,
    topicDetail: topicDetailView,
    releaseStart: releaseStartView,
    releaseSetup: releaseSetupView,
    release: releaseView,
    gains: gainsView,
    goals: goalsView
  };
  app.innerHTML = (views[state.route] || homeView)();
}

async function createSession({ source, topicId = null, subject, releaseType, feeling, recordId = null, goalId = null, actionId = null }) {
  const session = {
    id: uid("session"),
    source,
    topicId,
    subject,
    releaseType,
    currentFeeling: feeling,
    status: "in-progress",
    finalFeelsGood: false,
    recordId,
    goalId,
    actionId,
    startedAt: nowIso(),
    updatedAt: nowIso(),
    endedAt: null
  };
  await putStore("sessions", session);
  await loadData();
  state.release = {
    sessionId: session.id,
    source,
    topicId,
    subject,
    releaseType,
    currentFeeling: feeling,
    promptIndex: 0,
    step: "prompt",
    promptAnswers: [],
    rounds: []
  };
  setRoute("release");
}

async function resumeSession(sessionId) {
  const session = state.data.sessions.find((item) => item.id === sessionId);
  if (!session) return;
  const rounds = state.data.rounds
    .filter((round) => round.sessionId === sessionId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  state.release = {
    sessionId: session.id,
    source: session.source,
    topicId: session.topicId,
    subject: session.subject,
    releaseType: session.releaseType,
    currentFeeling: session.currentFeeling,
    promptIndex: 0,
    step: "prompt",
    promptAnswers: [],
    rounds
  };
  setRoute("release");
}

async function updateSessionStatus(status, finalFeelsGood = false) {
  const session = state.data.sessions.find((item) => item.id === state.release.sessionId);
  if (!session) return;
  session.status = status;
  session.finalFeelsGood = finalFeelsGood;
  session.currentFeeling = state.release.currentFeeling;
  session.updatedAt = nowIso();
  session.endedAt = status === "completed" ? nowIso() : session.endedAt;
  await putStore("sessions", session);
  await loadData();
}

async function saveRound(released, feelsGood = false) {
  const round = {
    id: uid("round"),
    sessionId: state.release.sessionId,
    releaseType: state.release.releaseType,
    feeling: state.release.currentFeeling,
    promptAnswers: state.release.promptAnswers,
    released,
    feelsGood,
    createdAt: nowIso()
  };
  state.release.rounds.push(round);
  state.release.promptAnswers = [];
  await putStore("rounds", round);
}

async function completeRelease() {
  await saveRound(true, true);
  await updateSessionStatus("completed", true);
  await syncLinkedRecord(true, true);
  state.dialog = { type: "gain-after-release", sessionId: state.release.sessionId };
  state.release = null;
  state.route = "home";
  await loadData();
  render();
}

async function syncLinkedRecord(released, feelsGood) {
  const session = state.data.sessions.find((item) => item.id === state.release.sessionId);
  if (session?.recordId) {
    const record = state.data.topicRecords.find((item) => item.id === session.recordId);
    if (record) {
      record.items = recordItems(record).map((item) => item.text === session.currentFeeling ? { ...item, released } : item);
      record.released = released;
      record.feelsGood = feelsGood;
      record.updatedAt = nowIso();
      await putStore("topicRecords", record);
    }
  }
}

async function pauseRelease() {
  await updateSessionStatus("in-progress", false);
  state.release = null;
  await loadData();
  setRoute("releaseStart");
  showToast("已暂停保存");
}

function handleBack() {
  if (state.route === "home") return;
  if (state.route === "topicDetail") return setRoute("topics");
  if (state.route === "releaseSetup") return setRoute("releaseStart", { releaseSetup: null });
  if (state.route === "release") return pauseRelease();
  setRoute("home");
}

app.addEventListener("click", async (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) setRoute(routeButton.dataset.route);

  const backButton = event.target.closest("[data-action='back']");
  if (backButton) handleBack();

  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) setRoute("topicDetail", { topicId: topicButton.dataset.topic });

  const action = event.target.closest("[data-action]");
  if (!action) return;
  const name = action.dataset.action;

  if (name === "start-selected-topic") {
    const select = document.querySelector("#topicSelect");
    const topic = getTopic(select.value);
    state.releaseSetup = { topicId: topic.id, step: "subject", subject: "" };
    setRoute("releaseSetup");
  }
  if (name === "select-emotion") {
    if (ignoreNextEmotionClick && action.classList.contains("emotion-card-main")) {
      ignoreNextEmotionClick = false;
      return;
    }
    ignoreNextEmotionClick = false;
    const input = action.closest("form")?.querySelector('input[name="feeling"]');
    if (input) {
      input.value = action.dataset.emotion;
      input.focus();
      action.closest(".emotion-picker")?.querySelectorAll(".emotion-card").forEach((card) => {
        card.classList.toggle("selected", card.dataset.emotion === action.dataset.emotion);
      });
    }
  }
  if (name === "export-topic-records") exportTopicRecords();
  if (name === "export-gains") exportGains();
  if (name === "close-dialog") {
    state.dialog = null;
    render();
  }
  if (name === "add-topic-form-row") {
    const form = action.closest("form");
    const topic = getTopic(form?.querySelector('input[name="topicId"]')?.value) || getTopic(state.topicId) || TOPICS[0];
    const table = form?.querySelector("[data-release-table]");
    if (table) table.insertAdjacentHTML("beforeend", makeReleaseTableRow(fieldName(topic)));
  }
  if (name === "remove-topic-form-row") {
    const row = action.closest(".release-table-row");
    const table = action.closest("[data-release-table]");
    const rows = table ? [...table.querySelectorAll(".release-table-row")] : [];
    if (row && rows.length > 1) {
      row.remove();
    } else if (row) {
      const input = row.querySelector('input[name="itemText"]');
      const checkbox = row.querySelector('input[name="itemReleased"]');
      if (input) input.value = "";
      if (checkbox) checkbox.checked = false;
    }
  }
  if (name === "create-empty-topic-record") {
    const topic = getTopic(action.dataset.topic);
    const record = {
      id: uid("topic"),
      topicId: topic.id,
      releaseType: topic.type,
      column: topic.columns?.[0] || "",
      subject: "",
      feeling: "",
      items: [{ id: uid("item"), text: "", released: false }],
      gain: "",
      goalId: "",
      released: false,
      feelsGood: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await putStore("topicRecords", record);
    await loadData();
    state.selectedTopicRecordId = record.id;
    render();
    window.setTimeout(() => document.querySelector('[data-form="update-topic-record"] textarea[name="subject"]')?.focus(), 80);
  }
  if (name === "cancel-release-setup") {
    state.releaseSetup = null;
    setRoute("releaseStart");
  }
  if (name === "answer-prompt") {
    state.release.promptAnswers.push({
      prompt: promptsFor(state.release.releaseType)[state.release.promptIndex],
      answer: action.dataset.answer
    });
    state.release.promptIndex += 1;
    if (state.release.promptIndex >= promptsFor(state.release.releaseType).length) {
      state.release.step = "released";
    }
    render();
  }
  if (name === "answer-released") {
    const released = action.dataset.answer === "true";
    if (released) {
      state.release.step = "feelsGood";
    } else {
      await saveRound(false, false);
      state.release.promptIndex = 0;
      state.release.step = "prompt";
    }
    render();
  }
  if (name === "answer-good") {
    const good = action.dataset.answer === "true";
    if (good) {
      await completeRelease();
    } else {
      await saveRound(true, false);
      state.release.step = "nextFeeling";
      render();
    }
  }
  if (name === "pause-release") await pauseRelease();
  if (name === "cancel-release") {
    state.release = null;
    setRoute("home");
  }
  if (name === "resume-session") await resumeSession(action.dataset.session);
  if (name === "resume-latest") {
    const latest = state.data.sessions.filter((item) => item.status === "in-progress").sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    if (latest) await resumeSession(latest.id);
  }
  if (name === "select-topic-record") {
    state.selectedTopicRecordId = action.dataset.record;
    render();
  }
  if (name === "delete-record") {
    await deleteStore("topicRecords", action.dataset.record);
    await loadData();
    render();
  }
  if (name === "delete-gain") {
    await deleteStore("gains", action.dataset.gain);
    await loadData();
    render();
  }
  if (name === "skip-gain") {
    state.dialog = null;
    render();
  }
  if (name === "release-goal") {
    const goal = state.data.goals.find((item) => item.id === action.dataset.goal);
    await createSession({ source: "goal", topicId: "goal-feelings", subject: goal.statement, releaseType: "emotion", feeling: goal.feeling || "对目标的感受", goalId: goal.id });
  }
  if (name === "release-action") {
    const item = state.data.actions.find((entry) => entry.id === action.dataset.actionId);
    await createSession({ source: "action", topicId: "goal-actions", subject: item.title, releaseType: "emotion", feeling: item.feeling || "对行动的感受", goalId: item.goalId, actionId: item.id });
  }
  if (name === "toggle-action") {
    const item = state.data.actions.find((entry) => entry.id === action.dataset.actionId);
    item.done = !item.done;
    item.updatedAt = nowIso();
    await save("actions", item);
  }
  if (name === "delete-goal") {
    await deleteStore("goals", action.dataset.goal);
    for (const item of state.data.actions.filter((entry) => entry.goalId === action.dataset.goal)) await deleteStore("actions", item.id);
    await loadData();
    render();
  }
});

app.addEventListener("pointerdown", (event) => {
  const card = event.target.closest("[data-emotion-card]");
  if (!card) return;
  emotionLongPressed = false;
  window.clearTimeout(emotionPressTimer);
  emotionPressTimer = window.setTimeout(() => {
    emotionLongPressed = true;
    ignoreNextEmotionClick = true;
    card.classList.add("expanded");
  }, 520);
});

app.addEventListener("pointerup", (event) => {
  const card = event.target.closest("[data-emotion-card]");
  window.clearTimeout(emotionPressTimer);
  if (!card || emotionLongPressed) return;
  const input = card.closest("form")?.querySelector('input[name="feeling"]');
  if (input) {
    input.value = card.dataset.emotion;
    card.closest(".emotion-picker")?.querySelectorAll(".emotion-card").forEach((item) => item.classList.toggle("selected", item === card));
  }
});

app.addEventListener("pointercancel", () => {
  window.clearTimeout(emotionPressTimer);
});

app.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-choice] .choice-btn");
  if (!choice) return;
  const group = choice.closest("[data-choice]");
  group.querySelectorAll(".choice-btn").forEach((item) => item.classList.remove("selected"));
  choice.classList.add("selected");
  const hidden = group.parentElement.querySelector(`input[name="${group.dataset.choice}"]`);
  if (hidden) hidden.value = choice.dataset.value;
});

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());

  if (form.dataset.form === "topic-record") {
    const topic = getTopic(data.topicId);
    const items = releaseRowsFromForm(form);
    const record = {
      id: uid("topic"),
      topicId: data.topicId,
      releaseType: topic.type,
      column: data.column || "",
      subject: data.subject,
      feeling: items.map((item) => item.text).join("，"),
      items,
      gain: data.gain || "",
      goalId: data.goalId || "",
      released: false,
      feelsGood: data.feelsGood === "true",
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await putStore("topicRecords", record);
    await loadData();
    state.selectedTopicRecordId = record.id;
    render();
    form.reset();
    showToast(`${topic.title} 已保存`);
  }

  if (form.dataset.form === "update-topic-record") {
    const record = state.data.topicRecords.find((item) => item.id === form.dataset.record);
    if (record) {
      const items = releaseRowsFromForm(form);
      record.subject = data.subject;
      record.column = data.column || "";
      record.items = items;
      record.feeling = items.map((item) => item.text).join("，");
      record.released = items.length > 0 && items.every((item) => item.released);
      record.feelsGood = Boolean(data.feelsGood);
      record.gain = data.gain || "";
      record.updatedAt = nowIso();
      await save("topicRecords", record);
      showToast("释放记录已更新");
    }
  }

  if (form.dataset.form === "start-topic-release") {
    const topic = getTopic(data.topicId);
    const record = {
      id: uid("topic"),
      topicId: topic.id,
      releaseType: topic.type,
      column: "",
      subject: data.subject,
      feeling: data.feeling,
      items: [{ id: uid("item"), text: data.feeling, released: false }],
      gain: "",
      goalId: "",
      released: false,
      feelsGood: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await putStore("topicRecords", record);
    state.selectedTopicRecordId = record.id;
    state.dialog = null;
    await loadData();
    await createSession({
      source: "topic-record",
      topicId: topic.id,
      subject: data.subject,
      releaseType: topic.type,
      feeling: data.feeling,
      recordId: record.id
    });
  }

  if (form.dataset.form === "release-setup-subject") {
    const topic = getTopic(data.topicId);
    state.releaseSetup = { topicId: topic.id, step: "feeling", subject: data.subject };
    render();
  }

  if (form.dataset.form === "release-setup-feeling") {
    const topic = getTopic(data.topicId);
    const subject = state.releaseSetup?.subject || topic.title;
    const record = {
      id: uid("topic"),
      topicId: topic.id,
      releaseType: topic.type,
      column: "",
      subject,
      feeling: data.feeling,
      items: [{ id: uid("item"), text: data.feeling, released: false }],
      gain: "",
      goalId: "",
      released: false,
      feelsGood: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await putStore("topicRecords", record);
    state.selectedTopicRecordId = record.id;
    state.releaseSetup = null;
    await loadData();
    await createSession({
      source: "topic-record",
      topicId: topic.id,
      subject,
      releaseType: topic.type,
      feeling: data.feeling,
      recordId: record.id
    });
  }

  if (form.dataset.form === "free-release") {
    const record = {
      id: uid("topic"),
      topicId: FREE_RELEASE_TOPIC.id,
      releaseType: data.releaseType,
      column: "",
      subject: data.subject,
      feeling: data.feeling,
      items: [{ id: uid("item"), text: data.feeling, released: false }],
      gain: "",
      goalId: "",
      released: false,
      feelsGood: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    await putStore("topicRecords", record);
    await loadData();
    await createSession({
      source: "free",
      topicId: FREE_RELEASE_TOPIC.id,
      subject: data.subject,
      releaseType: data.releaseType,
      feeling: data.feeling,
      recordId: record.id
    });
  }

  if (form.dataset.form === "next-feeling") {
    state.release.currentFeeling = data.feeling;
    state.release.promptIndex = 0;
    state.release.step = "prompt";
    render();
  }

  if (form.dataset.form === "gain") {
    await save("gains", { id: uid("gain"), body: data.body, createdAt: nowIso(), sessionId: "", topicId: "", goalId: "" });
    form.reset();
    showToast("已写入收获本");
  }

  if (form.dataset.form === "post-release-gain") {
    const body = data.body.trim();
    if (body) {
      const session = state.data.sessions.find((item) => item.id === state.dialog.sessionId);
      await putStore("gains", {
        id: uid("gain"),
        body,
        createdAt: nowIso(),
        sessionId: state.dialog.sessionId,
        topicId: session?.topicId || "",
        recordId: session?.recordId || "",
        goalId: session?.goalId || ""
      });
    }
    state.dialog = null;
    await loadData();
    render();
  }

  if (form.dataset.form === "goal") {
    await save("goals", { id: uid("goal"), statement: data.statement, feeling: data.feeling || "", createdAt: nowIso(), updatedAt: nowIso() });
    form.reset();
    showToast("目标已保存");
  }

  if (form.dataset.form === "action") {
    await save("actions", {
      id: uid("action"),
      goalId: form.dataset.goal,
      title: data.title,
      feeling: data.feeling || "",
      done: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    });
    form.reset();
  }
});

async function init() {
  db = await openDb();
  await loadData();
  render();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  }
}

init().catch((error) => {
  app.innerHTML = `<main class="panel"><h1>启动失败</h1><p>${escapeHtml(error.message)}</p></main>`;
});

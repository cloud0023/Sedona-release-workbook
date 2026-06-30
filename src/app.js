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
    icon: "灰",
    tone: "无望、能量低落",
    children: ["无聊", "不能赢", "担心大意", "冷淡", "停止", "死亡", "被打败", "沮丧", "泄气", "凄惨", "绝望", "气馁", "幻想破灭", "精疲力竭", "失败", "可遗忘的", "没出息", "放弃", "冷酷无情的", "没有希望", "没有幽默感", "我不行", "我不在乎", "我没有价值", "漫不经心", "优柔寡断", "冷漠", "没有存在感", "太晚了", "懊悔", "再等等吧", "无精打采", "失败者", "消极", "麻木不仁", "击溃", "无能为力", "认命", "震惊", "漫不经意", "停滞不前", "太累", "冷酷无情", "漫无目的", "没用", "模糊不清", "废品", "有什么用呢", "为什么要试呢", "不值得"]
  },
  {
    name: "悲苦",
    icon: "悲",
    tone: "伤心、失落痛苦",
    children: ["被遗弃", "被羞辱", "被控告", "极度痛苦", "丢脸", "被背叛", "忧郁", "被欺骗", "绝望", "失望", "心烦意乱", "尴尬的", "被忘掉", "愧疚的", "心碎的", "头痛", "泪丧", "无助的", "受伤", "要是早就好了", "被忽视的", "不够", "伤心欲绝", "不公平", "被遗忘", "极度渴望", "损失", "衰愁", "被误解", "哀悼", "被忽略", "没人关心我", "没人爱我", "乡愁", "错失", "遗憾", "可怜的我", "后悔", "被拒绝", "懊悔", "悲哀", "悲伤", "让人落泪的", "被精神上折磨", "被虐待", "不开心", "不被爱", "没人要", "脆弱", "为什么是我受伤的"]
  },
  {
    name: "恐惧",
    icon: "惧",
    tone: "担忧害怕、不安",
    children: ["焦虑", "不安", "小心谨慎", "又冷又热又湿", "胆小怯懦", "自我防卫的", "不信任", "怀疑", "惧怕", "尴尬的", "逃避的", "预感", "狂乱的", "犹豫不决", "惊骇的", "歇斯底里", "拘束的", "不理解的", "恶心", "紧张", "恐慌", "麻痹的", "偏执狂", "被吓到的", "偷偷摸摸", "不可言", "羞涩", "怀疑的", "怯场", "迷信的", "多疑的", "简短生硬", "被吓坏的", "被威胁的", "羞怯", "陷入困境", "迟疑不决", "心神不宁", "容易受伤的", "想要逃避", "小心翼翼", "担心"]
  },
  {
    name: "贪求",
    icon: "求",
    tone: "渴望占有、不满足",
    children: ["放弃", "预期", "冷酷无情", "等不了", "冲动", "渴求", "苛求的", "狡诈的", "被驱使的", "嫉妒", "剥削", "过分迷恋", "暴怒", "失意的", "贪吃暴食的", "贪婪的", "囤积", "饥饿", "我想", "不耐烦", "好色的", "淫荡的", "操纵别人", "吝啬的", "一定要得到", "从来不满足", "从来不满意", "着迷的", "满发娇纵", "占有欲强的", "掠夺成性的", "困扰已见", "鲁莽", "残忍的", "诡计多端", "自私的", "如饥似渴", "放肆"]
  },
  {
    name: "愤怒",
    icon: "怒",
    tone: "生气烦躁、抵抗",
    children: ["伤人感情的", "好斗的", "被惹恼的", "好辩的", "好战的", "怒火", "令人恐惧的", "刻薄的", "挑衅的", "苛求的", "毁灭性的", "嫌恶", "脾气暴躁", "凶猛的", "泄气的", "气愤", "狂怒的", "严厉", "憎恨", "敌意", "不耐烦", "愤愤不平", "生气", "妒忌", "怒气冲冲", "疯狂", "卑鄙", "残忍", "凶残的", "义愤填膺", "坏脾气", "顽固", "抵制", "粗鲁", "野蛮", "冲突激化", "怨恨", "暴力", "易爆发", "恶劣的", "任性的"]
  },
  {
    name: "自尊自傲",
    icon: "傲",
    tone: "自我重要、比较",
    children: ["无耻可寻", "超然离群", "自负", "固执己见", "无聊", "聪明", "封闭的", "沾沾自喜", "逞能", "轻蔑的", "酷", "挑剔的", "鄙夷", "傲慢专断", "假谦卑", "虚假美德", "扬扬得意", "傲慢", "自以为是", "虚伪", "冷冰冰地", "孤僻的", "批判性的", "自称无所不知的", "心胸狭隘", "永远不会错", "武断", "盛气凌人", "神气十足", "偏颇的", "放肆", "自以为公正的", "刚直不屈", "自恋的", "自鸣得意", "自私", "自命不凡", "势利眼", "独特", "被宠坏的", "顽固不化", "自高自大", "优越感", "强硬不妥协", "无感觉的", "不宽恕的", "不屈服的", "爱慕虚荣"]
  },
  {
    name: "无畏",
    icon: "勇",
    tone: "勇敢自信、主动",
    children: ["喜欢冒险的", "警惕的", "活着的", "胸有成竹", "机智的", "有中心的", "有把握的", "愉快", "思路清晰", "伶俐", "能干的", "自信的", "创新的", "大胆", "果断的", "有活力", "热切的", "热情的", "欢欣", "探索", "灵活性", "专注的", "乐善好施", "开心", "可敬的", "幽默", "我行", "独立", "首创精神", "正直", "所向披靡", "有爱的", "头脑清楚", "自强不息", "开放", "乐观", "洞察力", "积极", "意志坚强", "敏感的", "稳当的", "自给自足", "犀利的", "坚强的", "助人为乐", "不知疲惫", "精力充沛", "乐意", "热忱"]
  },
  {
    name: "接纳",
    icon: "纳",
    tone: "敞开包容、理解",
    children: ["丰盛", "有眼力的", "平衡", "美丽", "归属感", "天真烂漫", "同情心", "体贴的", "高兴", "兴高采烈", "拥抱", "善解人意", "丰富", "一切都很好", "友善的", "丰满", "温柔", "热情洋溢", "亲切的", "和睦的", "和谐", "直觉的", "合拍", "令人高兴的", "富有爱心的", "宽宏大量", "成熟的", "轻松自如", "无需更改", "开放", "幽默的", "容光焕发", "善于接受", "稳当的", "温和的", "柔和的", "理解", "温暖", "幸福", "奇迹"]
  },
  {
    name: "平和",
    icon: "和",
    tone: "平静安宁、满足",
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
    id: "goal",
    page: "39-46",
    title: "目标",
    type: "emotion",
    workbookType: "目标情绪与行动",
    fields: ["目标", "我对目标现在有什么感受？"],
    guidance: "把目标感受和为了达成目标要做的事放在同一条记录里，先释放目标感受，再释放行动阻力。"
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
  topicRecordMode: "list",
  topicRecordView: "list",
  editingRecordId: null,
  editingDraftRecord: null,
  editingSectionKey: "",
  editingGroupId: "",
  expandedRecordId: "",
  expandedGroupId: "",
  expandedCardId: "",
  focusCardId: "",
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

const STRUCTURED_SCHEMA_VERSION = 2;

const ITEMIZED_TOPIC_SUBJECTS = {
  "suppress-express": "压抑或表达",
  "remember-approval-control": "想要被认同和控制",
  "letting-go-wants": "想要和不想要的东西",
  "want-control": "从想要控制能得到什么",
  "want-approval": "从想要认同能得到什么",
  "seeing-wants": "获得三大想要的方式",
  happiness: "快乐需要什么"
};

const ITEMIZED_TOPIC_STRUCTURES = {
  "suppress-express": {
    type: "itemized",
    groupLabel: "事情",
    switchLabel: "释放的角度",
    sections: [
      { key: "suppressed", title: "压抑情绪", heading: "压抑情绪的具体事情", groupPrompt: "回忆一件压抑情绪的事", groupLabel: "事情", goodLabel: "这件事感觉好吗？" },
      { key: "expressed", title: "表达情绪", heading: "表达情绪的具体事情", groupPrompt: "回忆一件表达情绪的事", groupLabel: "事情", goodLabel: "这件事感觉好吗？" }
    ]
  },
  "remember-approval-control": {
    type: "itemized",
    groupLabel: "事情",
    sections: [
      { key: "approval", title: "想要认同", groupPrompt: "回想一件想要被认同的事", groupLabel: "事情", goodLabel: "这件事感觉好吗？" },
      { key: "control", title: "想要控制", groupPrompt: "回想一件想要控制的事", groupLabel: "事情", goodLabel: "这件事感觉好吗？" }
    ]
  },
  "letting-go-wants": {
    type: "itemized",
    groupLabel: "内容",
    sections: [
      { key: "wants", title: "想要的东西", groupPrompt: "我想要什么东西", groupLabel: "内容", goodLabel: "这个想要感觉好吗？" },
      { key: "not-wants", title: "不想要的东西", groupPrompt: "我不想要什么东西", groupLabel: "内容", goodLabel: "这个不想要感觉好吗？" }
    ]
  },
  "want-control": {
    type: "itemized",
    groupLabel: "答案",
    sections: [
      { key: "control-gains", title: "想要控制", groupPrompt: "从想要控制中能得到什么", groupLabel: "答案", goodLabel: "这个答案感觉好吗？" },
      { key: "controlled-gains", title: "想要被控制", groupPrompt: "从想要被控制中能得到什么", groupLabel: "答案", goodLabel: "这个答案感觉好吗？" }
    ]
  },
  "want-approval": {
    type: "itemized",
    groupLabel: "答案",
    sections: [
      { key: "approval-gains", title: "想要认同", groupPrompt: "从想要认同中能得到什么", groupLabel: "答案", goodLabel: "这个答案感觉好吗？" },
      { key: "disapproval-gains", title: "不被认同", groupPrompt: "从不被认同中能得到什么", groupLabel: "答案", goodLabel: "这个答案感觉好吗？" }
    ]
  },
  "seeing-wants": {
    type: "itemized",
    groupLabel: "方式",
    sections: [
      { key: "approval-seeking", title: "寻求认同", groupPrompt: "我寻求被认同的方式", groupLabel: "方式", goodLabel: "这个方式感觉好吗？" },
      { key: "security-seeking", title: "寻求安全", groupPrompt: "我寻求安全的方式", groupLabel: "方式", goodLabel: "这个方式感觉好吗？" },
      { key: "control-seeking", title: "试图控制", groupPrompt: "我试图控制的方式", groupLabel: "方式", goodLabel: "这个方式感觉好吗？" }
    ]
  },
  happiness: {
    type: "itemized",
    groupLabel: "条件",
    sections: [
      { key: "needs", title: "需要什么", groupPrompt: "我需要什么才能获得快乐", groupLabel: "条件", goodLabel: "这个需要感觉好吗？" },
      { key: "avoidance", title: "避免什么", groupPrompt: "我需要避免什么才能获得快乐", groupLabel: "条件", goodLabel: "这个避免感觉好吗？" }
    ]
  }
};

const COMPLEX_TOPIC_IDS = new Set(["success", "likes-dislikes", "stuckness", "goal", ...Object.keys(ITEMIZED_TOPIC_STRUCTURES)]);

const TOPIC_STRUCTURES = {
  success: {
    type: "success",
    sections: [
      { key: "success", title: "如果成功" },
      { key: "failure", title: "如果失败" }
    ]
  },
  "likes-dislikes": {
    type: "likes-dislikes",
    groupLabel: "方面",
    sections: [
      { key: "likes", title: "喜欢的方面", groupPrompt: "我喜欢该主题的哪些方面" },
      { key: "dislikes", title: "不喜欢的方面", groupPrompt: "我不喜欢该主题的哪些方面" }
    ]
  },
  stuckness: {
    type: "stuckness",
    groupLabel: "条目",
    sections: [
      { key: "benefits", title: "有什么好处", groupPrompt: "对我有什么好处" },
      { key: "harms", title: "有什么坏处", groupPrompt: "对我有什么坏处" }
    ]
  },
  goal: {
    type: "goal",
    groupLabel: "行动",
    sections: [
      { key: "goal-feelings", title: "我对此有什么感受" },
      { key: "goal-actions", title: "行动清单", groupPrompt: "为了达成目标要做的事" }
    ]
  }
};

function topicStructure(topic) {
  if (TOPIC_STRUCTURES[topic.id]) return TOPIC_STRUCTURES[topic.id];
  if (ITEMIZED_TOPIC_STRUCTURES[topic.id]) return ITEMIZED_TOPIC_STRUCTURES[topic.id];
  if (topic.columns?.length) {
    return {
      type: "columns",
      sections: topic.columns.map((column, index) => ({ key: `column-${index}`, title: column }))
    };
  }
  return {
    type: "simple",
    sections: [{ key: "default", title: feelingLabel(topic) }]
  };
}

function isV2Record(record) {
  return record?.schemaVersion === STRUCTURED_SCHEMA_VERSION && Array.isArray(record.sections);
}

function sectionCanHaveGroups(structure, sectionKey) {
  return (
    structure.type === "likes-dislikes" ||
    structure.type === "stuckness" ||
    structure.type === "itemized" ||
    (structure.type === "goal" && sectionKey === "goal-actions")
  );
}

function cardKind(topic) {
  return topic.type === "want" ? "want" : "feeling";
}

function makeCard(topic, text = "", released = false) {
  const stamp = nowIso();
  return {
    id: uid("card"),
    kind: cardKind(topic),
    text,
    released,
    createdAt: stamp,
    updatedAt: stamp
  };
}

function makeGroup(text = "", cards = []) {
  const stamp = nowIso();
  return {
    id: uid("group"),
    text,
    feelsGood: false,
    cards,
    createdAt: stamp,
    updatedAt: stamp
  };
}

function makeSection(definition, withGroups = false) {
  const stamp = nowIso();
  return {
    id: uid("section"),
    key: definition.key,
    title: definition.title,
    text: "",
    feelsGood: false,
    groups: withGroups ? [] : [],
    cards: withGroups ? [] : [],
    createdAt: stamp,
    updatedAt: stamp
  };
}

function makeStructuredRecord(topic, subject = "") {
  const structure = topicStructure(topic);
  const stamp = nowIso();
  const recordSubject = subject || defaultTopicRecordSubject(topic);
  return {
    id: uid("topic"),
    topicId: topic.id,
    schemaVersion: STRUCTURED_SCHEMA_VERSION,
    structureType: structure.type,
    releaseType: topic.type,
    subject: recordSubject,
    sections: structure.sections.map((section) => makeSection(section, sectionCanHaveGroups(structure, section.key))),
    gain: "",
    createdAt: stamp,
    updatedAt: stamp
  };
}

function activeTopicRecords(topicId) {
  return state.data.topicRecords.filter((record) => record.topicId === topicId && isV2Record(record));
}

function findSection(record, sectionIdOrKey) {
  return record?.sections?.find((section) => section.id === sectionIdOrKey || section.key === sectionIdOrKey);
}

function findGroup(section, groupId) {
  return section?.groups?.find((group) => group.id === groupId);
}

function findCard(container, cardId) {
  return container?.cards?.find((card) => card.id === cardId);
}

function findPathTarget(record, path = {}) {
  const section = findSection(record, path.sectionId || path.sectionKey);
  const group = path.groupId ? findGroup(section, path.groupId) : null;
  const container = group || section;
  const card = findCard(container, path.cardId);
  return { section, group, container, card };
}

function allRecordCards(record) {
  if (!isV2Record(record)) return [];
  return record.sections.flatMap((section) => [
    ...(section.cards || []),
    ...(section.groups || []).flatMap((group) => group.cards || [])
  ]);
}

function recordIsGood(record) {
  if (!isV2Record(record)) return false;
  const sectionsWithCards = record.sections.filter((section) =>
    (section.cards || []).length || (section.groups || []).some((group) => (group.cards || []).length)
  );
  if (!sectionsWithCards.length) return false;
  return sectionsWithCards.every((section) => {
    if ((section.groups || []).length) {
      const groupsWithCards = section.groups.filter((group) => (group.cards || []).length);
      return groupsWithCards.length > 0 && groupsWithCards.every((group) => group.feelsGood);
    }
    return section.feelsGood;
  });
}

function summarizeStructuredRecord(record) {
  if (!isV2Record(record)) return ["旧记录"];
  const baseTopic = getTopic(record.topicId) || FREE_RELEASE_TOPIC;
  const topic = record.releaseType ? { ...baseTopic, type: record.releaseType } : baseTopic;
  const structure = topicStructure(topic);
  return record.sections.map((section) => {
    if (sectionCanHaveGroups(structure, section.key)) {
      const cardCount = (section.groups || []).reduce((total, group) => total + (group.cards || []).length, 0);
      return `${section.title}：${(section.groups || []).length} 条 · ${cardCount} 个${fieldName(topic)}`;
    }
    const suffix = section.feelsGood ? "感觉好了" : "还不好";
    return `${section.title}：${(section.cards || []).length} 个${fieldName(topic)} · ${suffix}`;
  });
}

function cloneRecord(record) {
  return JSON.parse(JSON.stringify(record));
}

function currentTopicStructure() {
  const topic = getTopic(state.topicId) || TOPICS[0];
  return topicStructure(topic);
}

function draftRecord() {
  return state.editingDraftRecord;
}

function defaultTopicRecordSubject(topic) {
  return ITEMIZED_TOPIC_SUBJECTS[topic?.id] || "";
}

function topicUsesDefaultSubject(topic) {
  return Boolean(defaultTopicRecordSubject(topic));
}

function topicSubjectPrompt(topic) {
  const prompts = {
    "change-life": "列出想要改变的人事物",
    success: "想变得更成功的一个领域",
    "likes-dislikes": "主题",
    "must-do": "我觉得我必须做的事",
    goal: "我想要实现的目标",
    "want-security": "回想一件想要安全/生存的事",
    stuckness: "主题",
    "free-release": "释放对象"
  };
  return prompts[topic?.id] || topic?.fields?.[0] || "主题";
}

function sectionLabel(structure, section) {
  return sectionTabLabel(structure, section);
}

function sectionHeadingLabel(structure, section) {
  return section.heading || sectionLabel(structure, section);
}

function sectionDefinition(structure, section) {
  return structure.sections?.find((item) => item.key === section?.key) || section || {};
}

function groupInputLabel(structure, section, unit) {
  const definition = sectionDefinition(structure, section);
  return definition.groupPrompt || section?.groupPrompt || `${unit}内容`;
}

function groupContextLine(topic, structure, record, section) {
  const subject = (record?.subject || "").trim();
  const defaultSubject = defaultTopicRecordSubject(topic);
  const parts = [topic.title];
  if (subject && subject !== defaultSubject) parts.push(subject);
  parts.push(sectionLabel(structure, section));
  return parts.join(" · ");
}

function groupUnitLabel(structure, section) {
  if (structure.type === "likes-dislikes") return "方面";
  if (structure.type === "stuckness") return section.key === "benefits" ? "好处" : "坏处";
  if (structure.type === "goal" && section.key === "goal-actions") return "行动";
  if (structure.type === "itemized") return section.groupLabel || structure.groupLabel || "条目";
  return "条目";
}

function addGroupLabelForSection(structure, section) {
  const unit = groupUnitLabel(structure, section);
  if (unit === "事情") return "添加一件事情";
  return `添加一个${unit}`;
}

function sectionStats(section) {
  const groups = section.groups || [];
  const cards = groups.length ? groups.flatMap((group) => group.cards || []) : (section.cards || []);
  const released = cards.filter((card) => card.released).length;
  const feelsGood = groups.length
    ? groups.length > 0 && groups.every((group) => group.feelsGood)
    : Boolean(section.feelsGood);
  return {
    groupCount: groups.length,
    cardCount: cards.length,
    released,
    feelsGood
  };
}

function recordSummary(topic, record, sectionKey = "") {
  const structure = topicStructure(topic);
  const sections = record.sections || [];
  const section = sections.find((item) => item.key === sectionKey) || sections.find((item) => {
    const stats = sectionStats(item);
    return stats.groupCount || stats.cardCount;
  }) || sections[0];
  const stats = section ? sectionStats(section) : { groupCount: 0, cardCount: 0, released: 0, feelsGood: false };
  const hasGroups = section && sectionCanHaveGroups(structure, section.key);
  const unit = section ? groupUnitLabel(structure, section) : "条目";
  const label = section ? sectionLabel(structure, section) : "";
  return {
    label,
    unit,
    stats,
    primary: hasGroups
      ? `${label} ${stats.groupCount} 个${unit} · ${stats.cardCount} 个${fieldName(topic)}`
      : `${label} ${stats.cardCount} 个${fieldName(topic)}`,
    secondary: `${stats.released}/${stats.cardCount} 已释放 · ${stats.feelsGood ? "感觉好了" : "感觉还不好"}`
  };
}

function recordSectionSummaries(topic, record) {
  const structure = topicStructure(topic);
  const sections = record.sections || [];
  return sections.map((section) => {
    const stats = sectionStats(section);
    const hasGroups = sectionCanHaveGroups(structure, section.key);
    const unit = groupUnitLabel(structure, section);
    const label = sectionLabel(structure, section);
    return {
      section,
      stats,
      label,
      primary: hasGroups
        ? `${label} ${stats.groupCount} 个${unit} · ${stats.cardCount} 个${fieldName(topic)}`
        : `${label} ${stats.cardCount} 个${fieldName(topic)}`,
      release: `${stats.released}/${stats.cardCount} 已释放`,
      good: stats.feelsGood
    };
  });
}

function groupSummary(topic, section, group) {
  const cards = group.cards || [];
  const released = cards.filter((card) => card.released).length;
  const preview = cards.map((card) => card.text).filter(Boolean).slice(0, 3).join(" · ") || `还没有${fieldName(topic)}`;
  return {
    preview,
    released,
    total: cards.length,
    feelsGood: Boolean(group.feelsGood)
  };
}

function iconSvg(name) {
  const icons = {
    home: `<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>`,
    topics: `<path d="M7 4h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"/><path d="M10 8h4"/><path d="M10 12h4"/>`,
    release: `<path d="M12 21c-4.2-2.2-7-5.6-7-9.7V5.8L12 3l7 2.8v5.5c0 4.1-2.8 7.5-7 9.7Z"/><path d="M9 12.4c2.6-.1 4.4-1.2 5.5-3.4.7 3.5-.8 6-4.5 7.4"/><path d="M10 16.4c.8-2.1 2.1-3.7 4-4.7"/>`,
    gains: `<path d="M12 21v-7"/><path d="M7 9c3.2 0 5 1.8 5 5-3.2 0-5-1.8-5-5Z"/><path d="M17 7c-3.2 0-5 2-5 5 3.2 0 5-2 5-5Z"/><path d="M5 21h14"/>`,
    goals: `<path d="M12 21v-6"/><path d="M6 12c3.6 0 6 1.8 6 5-3.6 0-6-1.8-6-5Z"/><path d="M18 8c-3.6 0-6 2-6 5 3.6 0 6-2 6-5Z"/><path d="M12 4v4"/>`,
    leaf: `<path d="M11 20A7 7 0 0 1 4 13C4 6 12 3 20 4c1 8-2 16-9 16Z"/><path d="M4 20c4-4 8-6 14-8"/>`,
    sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>`,
    chat: `<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z"/>`,
    mountain: `<path d="m3 19 6-10 4 6 2-3 6 7H3Z"/><path d="M9 9l2 3"/>`,
    target: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M22 12h-3"/>`,
    cloud: `<path d="M20 16.2A4.5 4.5 0 0 0 17 8h-1.3A7 7 0 1 0 4 14.9"/><path d="M7 17h11"/>`,
    want: `<path d="M12 22s7-4.4 7-11A7 7 0 0 0 5 11c0 6.6 7 11 7 11Z"/><path d="M12 8v5"/><path d="M12 16h.01"/>`
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.leaf}</svg>`;
}

function topicIconName(topic) {
  const map = {
    "likes-dislikes": "leaf",
    success: "sun",
    stuckness: "cloud",
    goal: "target",
    happiness: "sun",
    "free-release": "release"
  };
  if (map[topic.id]) return map[topic.id];
  if (topic.type === "want") return "want";
  if (topic.columns?.length) return "chat";
  return "leaf";
}

function iconBubble(iconName, extraClass = "") {
  return `<span class="icon-bubble ${extraClass}">${iconSvg(iconName)}</span>`;
}

function emotionMetaForText(text = "") {
  const normalized = text.trim();
  if (!normalized) return null;
  const index = EMOTION_GROUPS.findIndex((group) => group.name === normalized || group.children.includes(normalized));
  if (index < 0) return null;
  return { group: EMOTION_GROUPS[index], index };
}

function cardEmotionIcon(card) {
  const meta = emotionMetaForText(card.text);
  if (!meta) return iconBubble("leaf", "emotion-list-icon muted");
  return `<span class="icon-bubble emotion-list-icon emotion-card-${meta.index}"><span class="emotion-icon">${emotionIcon(meta.group, meta.index)}</span></span>`;
}

function sectionByFormName(record, name) {
  return findSection(record, name.replace(/^section-/, ""));
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

function makeCardRow(topic, namePrefix, card = null) {
  const id = card?.id || "";
  return `
    <div class="release-table-row" data-card-row>
      <input type="hidden" name="${namePrefix}CardId" value="${escapeHtml(id)}" />
      <input name="${namePrefix}CardText" value="${escapeHtml(card?.text || "")}" aria-label="${fieldName(topic)}" placeholder="${feelingPlaceholder(topic)}" />
      <label class="mini-check"><input type="checkbox" name="${namePrefix}CardReleased" value="${escapeHtml(id || "new")}" ${card?.released ? "checked" : ""} /><span>✓</span><b>释放了吗</b></label>
      <button class="text-delete-btn card-delete-btn" type="button" data-action="remove-structured-card-row" aria-label="删除这一条${fieldName(topic)}">删除</button>
    </div>
  `;
}

function promptsFor(type) {
  return type === "want" ? WANT_PROMPTS : EMOTION_PROMPTS;
}

function modeLabel(type) {
  return type === "want" ? "释放想要" : "释放情绪";
}

function emotionIcon(group, index) {
  const color = "currentColor";
  const icons = [
    `<path d="m3 3 18 18"/><path d="M6.2 6.2A7 7 0 0 1 18.7 9.4 5 5 0 0 1 19 19H8a5 5 0 0 1-2.6-9.3"/>`,
    `<path d="M20 16.2A4.5 4.5 0 0 0 17 8h-1.3A7 7 0 1 0 4 14.9"/><path d="M8 19v1"/><path d="M12 19v1"/><path d="M16 19v1"/>`,
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/>`,
    `<path d="M11 11V7a2 2 0 0 1 4 0v5"/><path d="M15 11V8a2 2 0 0 1 4 0v7a6 6 0 0 1-6 6h-2a7 7 0 0 1-5.6-2.8L3 15a2 2 0 1 1 3.3-2.2L8 15"/><path d="M8 15V9a2 2 0 0 1 4 0v5"/>`,
    `<path d="M8.5 14.5A3.5 3.5 0 0 0 12 22a6 6 0 0 0 6-6c0-5-4-7-4-11-2 1-4 4-4 7a4 4 0 0 0-1.5 2.5Z"/>`,
    `<path d="m2 6 4 12h12l4-12-6 4-4-7-4 7-6-4Z"/><path d="M6 18h12"/>`,
    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>`,
    `<path d="m11 17 2 2a3 3 0 0 0 4 0l3-3"/><path d="m14 14 2 2"/><path d="m3 12 4-4 4 4"/><path d="M7 8h5l2 2"/>`,
    `<path d="M11 20A7 7 0 0 1 4 13C4 6 12 3 20 4c1 8-2 16-9 16Z"/><path d="M4 20c4-4 8-6 14-8"/>`
  ];
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${icons[index] || `<text x="12" y="16" text-anchor="middle">${group.icon}</text>`}
    </svg>
  `;
}

function emotionPicker() {
  return `
    <div class="emotion-picker" aria-label="九大情绪选择">
      <div class="emotion-reference-head">
        <b>情绪参考</b>
        <span>想不到具体感受时使用</span>
      </div>
      <div class="emotion-card-row">
        ${EMOTION_GROUPS.map((group, index) => `
          <article class="emotion-card emotion-card-${index}" data-emotion="${group.name}">
            <button class="emotion-card-main" type="button" data-action="select-emotion" data-emotion="${group.name}" aria-label="${group.name}">
              <span class="emotion-orb"><span class="emotion-icon">${emotionIcon(group, index)}</span></span>
              <strong>${group.name}</strong>
            </button>
            <div class="emotion-action-popover" aria-label="${group.name}子情绪入口">
              <button class="emotion-more-btn" type="button" data-action="open-subemotions" data-emotion="${group.name}">子情绪</button>
            </div>
            <div class="emotion-subemotion-sheet" data-action="close-subemotions" aria-label="${group.name}子情绪">
              <div class="emotion-subemotion-panel">
                <header>
                  <span class="emotion-sheet-icon">${emotionIcon(group, index)}</span>
                  <strong>${group.name}</strong>
                  <button type="button" data-action="close-subemotions">收回</button>
                </header>
                <div class="emotion-chip-cloud">
                  ${group.children.map((child) => `<button type="button" data-action="select-subemotion" data-emotion="${group.name}">${child}</button>`).join("")}
                </div>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
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
  const sessions = state.data.sessions.filter((session) => session.recordId === record.id);
  const rounds = sessions.flatMap((session) =>
    state.data.rounds
      .filter((round) => round.sessionId === session.id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((round) => ({ ...round, session }))
  );
  const sectionLines = isV2Record(record)
    ? record.sections.flatMap((section) => {
        const lines = [`## ${markdownEscape(section.title)}`, "", `- 感觉好吗：${section.feelsGood ? "是" : "否"}`];
        if ((section.cards || []).length) {
          lines.push("", ...(section.cards.map((card) => `- [${card.released ? "x" : " "}] ${markdownEscape(card.text)}`)));
        }
        if ((section.groups || []).length) {
          for (const group of section.groups) {
            lines.push("", `### ${markdownEscape(group.text || "未填写")}`, "", `- 感觉好吗：${group.feelsGood ? "是" : "否"}`);
            lines.push(...((group.cards || []).map((card) => `- [${card.released ? "x" : " "}] ${markdownEscape(card.text)}`)));
          }
        }
        if (!(section.cards || []).length && !(section.groups || []).length) lines.push("", "- 未填写");
        return lines;
      })
    : ["## 旧记录", "", "此记录使用旧数据结构，当前版本不再导出旧明细。"];
  const lines = [
    `# ${markdownEscape(record.subject || "未命名释放")}`,
    "",
    `- 主题：${topic.title}`,
    `- 页码：${topic.page}`,
    `- 类型：${modeLabel(topic.type)}`,
    `- 创建时间：${record.createdAt || ""}`,
    `- 更新时间：${record.updatedAt || ""}`,
    `- 感觉好吗：${recordIsGood(record) ? "是" : "否"}`,
    "",
    ...sectionLines,
    "",
    "## 引导记录",
    "",
    ...(rounds.length
      ? rounds.map((round, index) => [
          `### 第 ${index + 1} 轮：${markdownEscape(round.feeling)}`,
          "",
          ...((round.promptAnswers || []).map((answer) => `- ${markdownEscape(answer.prompt)}：${markdownEscape(answer.answer)}`)),
          `- 释放了吗：${round.released ? "是" : "否"}`,
          `- 感觉好吗：${round.feelsGood ? "是" : "否"}`,
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
  const records = state.data.topicRecords
    .filter(isV2Record)
    .sort((a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""));
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
    .filter((record) => isV2Record(record) && record.gain)
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
      <button class="icon-btn" data-route="home" aria-label="首页">${iconSvg("home")}</button>
    </header>
    ${content}
    ${bottomNav()}
    ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
    ${state.dialog ? renderDialog() : ""}
  `;
}

function bottomNav() {
  const items = [
    ["home", "home", "首页"],
    ["topics", "topics", "主题"],
    ["releaseStart", "release", "释放"],
    ["gains", "gains", "收获"]
  ];
  return `
    <nav class="bottom-nav" aria-label="主要导航">
      <div class="bottom-nav-inner">
        ${items
          .map(
            ([route, icon, label]) => `
              <button class="nav-item ${state.route === route ? "active" : ""}" data-route="${route}">
                <span class="nav-icon">${iconSvg(icon)}</span>
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
      ${open ? `<button class="entry-card" data-action="resume-latest">${iconBubble("release", "mark")}<strong>继续未完成释放</strong><span>还有 ${open} 次释放保存为进行中。</span></button>` : ""}
      <section class="entry-grid">
        ${entryCard("topics", "topics", "主题释放数据库", "按原书目录进入主题，查看资料提醒，并以卡片方式填写。")}
        ${entryCard("releaseStart", "release", "开始释放", "主题释放或自由释放，系统按情绪/想要切换引导问题。")}
        ${entryCard("gains", "gains", "收获本", "记录每次释放后的好处、成功、变化和觉察。")}
        ${entryCard("goals", "goals", "目标与行动", "目标表格和行动清单相互关联，释放行动阻力。")}
      </section>
    </main>
  `);
}

function entryCard(route, iconName, title, description) {
  return `
    <button class="entry-card" data-route="${route}">
      ${iconBubble(iconName, "mark")}
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
          const count = activeTopicRecords(topic.id).length;
          return `
            <button class="list-card" data-topic="${topic.id}">
              <header>
                <span class="list-card-title">${iconBubble(topicIconName(topic), "list-card-icon")}<h3>${topic.title}</h3></span>
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
  const records = activeTopicRecords(topic.id);
  if (state.topicRecordView === "record" && draftRecord()) return topicRecordEditPage(topic, draftRecord());
  if (state.topicRecordView === "group" && draftRecord()) return topicGroupEditPage(topic, draftRecord());
  state.topicRecordView = "list";
  return appFrame(`
    <main class="screen topic-record-list-screen">
      <section class="topic-record-hero">
        <div class="topic-record-hero-mark">${iconBubble(topicIconName(topic), "topic-hero-icon")}</div>
        <span class="eyebrow">练习本 P.${topic.page}</span>
        <h1 class="screen-title">${topic.title}</h1>
        <p>${topic.guidance}</p>
      </section>
      <section class="record-list-section">
        <div class="section-heading-row record-list-heading">
          <h2 class="section-title">释放记录</h2>
          <button class="primary-btn compact-primary" type="button" data-action="new-topic-record" data-topic="${topic.id}">${iconSvg("release")} 新建记录</button>
        </div>
        ${records.length ? `
          <div class="record-card-list">
            ${records.map((record) => topicRecordSummaryCard(topic, record)).join("")}
          </div>
        ` : `<div class="empty calm-empty">还没有记录。新建一条记录，从一个主题开始。</div>`}
      </section>
    </main>
  `);
}

function topicRecordSummaryCard(topic, record) {
  const summaries = recordSectionSummaries(topic, record);
  const expanded = state.expandedRecordId === record.id;
  return `
    <article class="release-record-card ${expanded ? "expanded" : ""}">
      ${iconBubble(topicIconName(topic), "release-record-icon")}
      <button class="release-record-main" type="button" data-action="edit-topic-record-card" data-record="${record.id}">
        <strong>${escapeHtml(record.subject || "未命名释放")}</strong>
        <small>${formatDate(record.createdAt)}</small>
        <span class="record-chip-row">
          ${summaries.map((summary) => `
            <span class="summary-chip">${escapeHtml(summary.primary)}</span>
            <span class="summary-chip">${summary.release}</span>
            <span class="summary-chip good-chip ${summary.good ? "is-good" : "not-good"}">${summary.good ? "感觉好了" : "还没感觉好"}</span>
          `).join("")}
        </span>
      </button>
      <button class="chevron-btn record-expand-btn" type="button" data-action="toggle-record-actions" data-record="${record.id}" aria-label="展开记录操作">›</button>
      ${expanded ? `<button class="text-delete-btn record-inline-delete" type="button" data-action="delete-record" data-record="${record.id}">删除记录</button>` : ""}
    </article>
  `;
}

function topicRecordEditPage(topic, record) {
  if (!isV2Record(record)) return appFrame(`<main class="screen"><div class="empty">这是一条旧结构记录，当前版本不再编辑旧记录。</div></main>`);
  const structure = topicStructure(topic);
  const section = findSection(record, state.editingSectionKey) || record.sections[0];
  if (!state.editingSectionKey && section) state.editingSectionKey = section.key;
  const fixedSubject = topicUsesDefaultSubject(topic);
  if (fixedSubject && !record.subject) record.subject = defaultTopicRecordSubject(topic);
  return appFrame(`
    <main class="screen record-edit-screen">
      <div class="edit-kicker">${iconBubble(topicIconName(topic), "tiny-leaf")}<span>${topic.title}</span></div>
      <h1 class="screen-title">记录编辑</h1>
      <form class="progressive-form" data-form="topic-record-card" data-record="${escapeHtml(record.id)}">
        <section class="quiet-card subject-card">
          <label class="field-label">${escapeHtml(topicSubjectPrompt(topic))}</label>
          ${fixedSubject
            ? `<input type="hidden" name="subject" value="${escapeHtml(record.subject || defaultTopicRecordSubject(topic))}" /><div class="fixed-subject">${escapeHtml(record.subject || defaultTopicRecordSubject(topic))}</div>`
            : `<input name="subject" data-draft-field="subject" value="${escapeHtml(record.subject || "")}" placeholder="写下这一项" required />`}
          ${record.sections.length > 1 ? recordSectionSegmented(structure, record, section) : ""}
        </section>
        ${section ? recordSectionEditor(topic, structure, record, section) : ""}
        <section class="progressive-section">
          <div class="section-line-title">${iconBubble("leaf", "tiny-leaf")}<h2>收获</h2></div>
          <textarea name="gain" data-draft-field="gain" placeholder="这次练习后的收获、变化或觉察">${escapeHtml(record.gain || "")}</textarea>
        </section>
        <button class="primary-btn save-record-btn" type="submit">${iconSvg("topics")} 保存记录</button>
      </form>
    </main>
  `);
}

function recordSectionSegmented(structure, record, activeSection) {
  return `
    <div class="record-section-switch" role="tablist" aria-label="记录分区">
      <span class="switch-label">${escapeHtml(structure.switchLabel || "释放的角度")}</span>
      <span class="segmented-control">
        ${record.sections.map((section) => `
          <button class="${section.key === activeSection.key ? "active" : ""}" type="button" data-action="switch-record-section" data-section-key="${escapeHtml(section.key)}">${escapeHtml(sectionLabel(structure, section))}</button>
        `).join("")}
      </span>
    </div>
  `;
}

function recordSectionEditor(topic, structure, record, section) {
  const grouped = sectionCanHaveGroups(structure, section.key);
  if (grouped) {
    return `
      <section class="progressive-section">
        <div class="section-line-title">${iconBubble(topicIconName(topic), "tiny-leaf")}<h2>${escapeHtml(sectionHeadingLabel(structure, section))}</h2></div>
        <button class="dashed-add-btn" type="button" data-action="add-progressive-group" data-section-key="${escapeHtml(section.key)}">＋ ${escapeHtml(addGroupLabelForSection(structure, section))}</button>
        <div class="group-card-list">
          ${(section.groups || []).map((group) => groupSummaryCard(topic, structure, section, group)).join("")}
        </div>
      </section>
    `;
  }
  return `
    <section class="progressive-section">
      <div class="section-line-title">${iconBubble(topicIconName(topic), "tiny-leaf")}<h2>${escapeHtml(sectionHeadingLabel(structure, section))}</h2></div>
      ${directCardListEditor(topic, section, section)}
      ${feelsGoodSegment("section", section.feelsGood, "感觉好吗？")}
    </section>
  `;
}

function groupSummaryCard(topic, structure, section, group) {
  const summary = groupSummary(topic, section, group);
  const expanded = state.expandedGroupId === group.id;
  return `
    <article class="group-summary-card ${expanded ? "expanded" : ""}">
      ${iconBubble(topicIconName(topic), "group-summary-icon")}
      <button class="group-summary-main" type="button" data-action="edit-progressive-group" data-section-key="${escapeHtml(section.key)}" data-group="${escapeHtml(group.id)}">
        <strong>${escapeHtml(group.text || `未命名${groupUnitLabel(structure, section)}`)}</strong>
        <small>${escapeHtml(summary.preview)}</small>
        <span class="record-chip-row">
          <span class="summary-chip">${summary.released}/${summary.total} 已释放</span>
          <span class="summary-chip good-chip ${summary.feelsGood ? "is-good" : "not-good"}">${summary.feelsGood ? "感觉好了" : "还没感觉好"}</span>
        </span>
      </button>
      <button class="chevron-btn group-expand-btn" type="button" data-action="toggle-group-actions" data-section-key="${escapeHtml(section.key)}" data-group="${escapeHtml(group.id)}" aria-label="展开${escapeHtml(groupUnitLabel(structure, section))}操作">›</button>
      ${expanded ? `<button class="text-delete-btn group-inline-delete" type="button" data-action="delete-progressive-group" data-section-key="${escapeHtml(section.key)}" data-group="${escapeHtml(group.id)}">删除${escapeHtml(groupUnitLabel(structure, section))}</button>` : ""}
    </article>
  `;
}

function topicGroupEditPage(topic, record) {
  const structure = topicStructure(topic);
  const section = findSection(record, state.editingSectionKey) || record.sections[0];
  const group = section ? findGroup(section, state.editingGroupId) : null;
  if (!section || !group) {
    state.topicRecordView = "record";
    return topicRecordEditPage(topic, record);
  }
  const unit = groupUnitLabel(structure, section);
  return appFrame(`
    <main class="screen group-edit-screen">
      <h1 class="screen-title">${escapeHtml(unit)}详情</h1>
      <p class="context-line">${escapeHtml(groupContextLine(topic, structure, record, section))}</p>
      <form class="progressive-form" data-form="topic-group-card">
        <section class="progressive-section">
          <label class="field-label">${escapeHtml(groupInputLabel(structure, section, unit))}</label>
          <input name="groupText" data-draft-group-field="text" value="${escapeHtml(group.text || "")}" placeholder="${escapeHtml(groupPlaceholder(section))}" />
        </section>
        <section class="progressive-section">
          <div class="section-line-title"><h2>${escapeHtml(cardListQuestion(topic))}</h2></div>
          ${directCardListEditor(topic, group, group)}
          <button class="dashed-add-btn" type="button" data-action="add-progressive-card" data-container="group">＋ 添加${fieldName(topic)}</button>
        </section>
        <section class="progressive-section">
          <h2 class="feels-question">${escapeHtml(groupGoodLabel(section))}</h2>
          ${feelsGoodSegment("group", group.feelsGood, groupGoodLabel(section))}
        </section>
        <button class="primary-btn save-record-btn" type="submit">保存${escapeHtml(unit)}</button>
      </form>
    </main>
  `);
}

function directCardListEditor(topic, container, owner) {
  const cards = container.cards || [];
  return `
    <div class="progressive-card-list" data-card-container="${owner.id}">
      ${cards.map((card) => feelingRow(topic, card)).join("")}
    </div>
    ${owner === container && !sectionCanHaveGroups(currentTopicStructure(), state.editingSectionKey) ? `<button class="dashed-add-btn" type="button" data-action="add-progressive-card" data-container="section">＋ 添加${fieldName(topic)}</button>` : ""}
  `;
}

function feelingRow(topic, card) {
  const expanded = state.expandedCardId === card.id;
  return `
    <div class="feeling-row ${expanded ? "expanded" : ""}" data-card="${escapeHtml(card.id)}">
      ${cardEmotionIcon(card)}
      <input data-draft-card-field="text" data-card="${escapeHtml(card.id)}" value="${escapeHtml(card.text || "")}" placeholder="${fieldName(topic)}" />
      <button class="status-chip ${card.released ? "released" : ""}" type="button" data-action="toggle-progressive-card-release" data-card="${escapeHtml(card.id)}">${card.released ? "已释放" : "未释放"}</button>
      <button class="chevron-btn" type="button" data-action="toggle-card-actions" data-card="${escapeHtml(card.id)}" aria-label="更多">›</button>
      ${expanded ? `<button class="text-delete-btn card-inline-delete" type="button" data-action="delete-progressive-card" data-card="${escapeHtml(card.id)}">删除</button>` : ""}
    </div>
  `;
}

function feelsGoodSegment(scope, checked, label) {
  return `
    <div class="good-segment" role="group" aria-label="${escapeHtml(label)}">
      <button class="${checked ? "" : "active"}" type="button" data-action="set-progressive-good" data-scope="${scope}" data-good="false">还没有</button>
      <button class="${checked ? "active" : ""}" type="button" data-action="set-progressive-good" data-scope="${scope}" data-good="true">感觉好了</button>
    </div>
  `;
}

function resetTopicRecordEditing() {
  state.topicRecordView = "list";
  state.editingRecordId = null;
  state.editingDraftRecord = null;
  state.editingSectionKey = "";
  state.editingGroupId = "";
  state.expandedRecordId = "";
  state.expandedGroupId = "";
  state.expandedCardId = "";
  state.focusCardId = "";
}

function beginTopicRecordDraft(topic, record = null) {
  const draft = record ? cloneRecord(record) : makeStructuredRecord(topic);
  state.editingRecordId = record?.id || null;
  state.selectedTopicRecordId = record?.id || null;
  state.editingDraftRecord = draft;
  state.editingSectionKey = draft.sections[0]?.key || "";
  state.editingGroupId = "";
  state.expandedRecordId = "";
  state.expandedGroupId = "";
  state.expandedCardId = "";
  state.focusCardId = "";
  state.topicRecordView = "record";
}

function currentDraftSection() {
  const record = draftRecord();
  return record ? findSection(record, state.editingSectionKey) || record.sections[0] : null;
}

function currentDraftGroup() {
  const section = currentDraftSection();
  return section ? findGroup(section, state.editingGroupId) : null;
}

function currentCardContainer(scope = "") {
  if (scope === "group") return currentDraftGroup();
  if (scope === "section") return currentDraftSection();
  return currentDraftGroup() || currentDraftSection();
}

function findDraftCard(cardId) {
  const record = draftRecord();
  if (!record) return { card: null, container: null };
  for (const section of record.sections || []) {
    for (const card of section.cards || []) {
      if (card.id === cardId) return { card, container: section };
    }
    for (const group of section.groups || []) {
      for (const card of group.cards || []) {
        if (card.id === cardId) return { card, container: group };
      }
    }
  }
  return { card: null, container: null };
}

function normalizeRecordForSave(record) {
  const normalized = cloneRecord(record);
  normalized.sections = (normalized.sections || []).map((section) => {
    section.cards = (section.cards || []).filter((card) => card.text?.trim());
    section.groups = (section.groups || [])
      .map((group) => ({
        ...group,
        text: group.text?.trim() || "",
        cards: (group.cards || []).filter((card) => card.text?.trim())
      }))
      .filter((group) => group.text || group.cards.length);
    return section;
  });
  normalized.subject = normalized.subject?.trim() || "";
  normalized.gain = normalized.gain?.trim() || "";
  normalized.updatedAt = nowIso();
  return normalized;
}

function structuredFields(topic, record) {
  const structure = topicStructure(topic);
  const useTabs = structure.sections.length > 1;
  return `
    <div class="structured-editor ${useTabs ? "tabbed-structured-editor" : ""}">
      ${useTabs ? `
        <div class="structured-tabs" role="tablist" aria-label="释放记录分区">
          ${record.sections.map((section, index) => `
            <button class="structured-tab ${index === 0 ? "active" : ""}" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" data-action="switch-structured-section-tab" data-section-id="${escapeHtml(section.id)}">${escapeHtml(sectionTabLabel(structure, section))}</button>
          `).join("")}
        </div>
      ` : ""}
      <div class="${useTabs ? "structured-tab-panels" : "structured-sections"}">
        ${record.sections.map((section, index) => structuredSectionFields(topic, structure, section, { tabbed: useTabs, active: index === 0 })).join("")}
      </div>
    </div>
  `;
}

function sectionTabLabel(structure, section) {
  const labels = {
    success: "如果成功",
    failure: "如果失败",
    likes: "喜欢的方面",
    dislikes: "不喜欢的方面",
    benefits: "有什么好处",
    harms: "有什么坏处",
    "goal-feelings": "目标感受",
    "goal-actions": "行动清单"
  };
  return labels[section.key] || section.title || structure.title || "分区";
}

function addGroupButtonLabel(structure, section) {
  if (structure.type === "likes-dislikes") return section.key === "likes" ? "添加喜欢的方面" : "添加不喜欢的方面";
  if (structure.type === "stuckness") return section.key === "benefits" ? "添加好处" : "添加坏处";
  if (structure.type === "goal") return "添加行动";
  if (structure.type === "itemized") return addGroupLabelForSection(structure, section);
  return `添加${sectionTabLabel(structure, section)}`;
}

function structuredSectionFields(topic, structure, section, options = {}) {
  const grouped = sectionCanHaveGroups(structure, section.key);
  return `
    <section class="structured-section ${options.tabbed ? "structured-tab-panel" : ""} ${options.active ? "active" : ""}" data-section-id="${escapeHtml(section.id)}" data-section-key="${escapeHtml(section.key)}" ${options.tabbed && !options.active ? "hidden" : ""}>
      <header class="structured-section-head">
        <h3>${escapeHtml(section.title)}</h3>
      </header>
      ${grouped ? groupedSectionFields(topic, structure, section) : `
        ${directCardsFields(topic, `section-${section.id}`, section.cards || [])}
        ${goodToggle(`section-${section.id}FeelsGood`, section.feelsGood)}
      `}
    </section>
  `;
}

function groupedSectionFields(topic, structure, section) {
  const definition = structure.sections.find((item) => item.key === section.key);
  return `
    <div class="structured-groups" data-groups>
      ${(section.groups || []).map((group, index) => structuredGroupFields(topic, section, group, definition, index)).join("")}
      ${!(section.groups || []).length ? structuredGroupFields(topic, section, makeGroup("", [makeCard(topic)]), definition, 0) : ""}
    </div>
    <button class="soft-btn group-add-btn" type="button" data-action="add-structured-group">${addGroupButtonLabel(structure, section)}</button>
  `;
}

function groupTitle(section, index) {
  const labels = {
    likes: "方面",
    dislikes: "方面",
    benefits: "好处",
    harms: "坏处",
    "goal-actions": "行动"
  };
  return `${labels[section.key] || section.groupLabel || "项目"} ${index + 1}`;
}

function groupPlaceholder(section) {
  const placeholders = {
    likes: "例如：他说话很真诚",
    dislikes: "例如：这件事让我有压力",
    benefits: "例如：不用面对失败",
    harms: "例如：一直停在原地",
    "goal-actions": "写下为了达成目标要做的事"
  };
  return placeholders[section.key] || section.groupPrompt || "写下这一项";
}

function groupGoodLabel(section) {
  const labels = {
    likes: "这个方面感觉好吗？",
    dislikes: "这个方面感觉好吗？",
    benefits: "这个好处感觉好吗？",
    harms: "这个坏处感觉好吗？",
    "goal-actions": "这个行动感觉好吗？"
  };
  return labels[section.key] || section.goodLabel || "感觉好吗？";
}

function cardListQuestion(topic) {
  return topic.type === "want" ? "我对此有什么想要？" : "我对此有什么感受？";
}

function structuredGroupFields(topic, section, group, definition, index = 0) {
  const prefix = `group-${group.id}`;
  return `
    <article class="structured-group" data-group-id="${escapeHtml(group.id)}">
      <header class="structured-group-head">
        <h4>${escapeHtml(groupTitle(section, index))}</h4>
        <button class="text-delete-btn group-delete-btn" type="button" data-action="remove-structured-group" aria-label="删除${escapeHtml(groupTitle(section, index))}">删除</button>
      </header>
      <div class="field compact-field group-text-field">
        <textarea name="${prefix}Text" aria-label="${escapeHtml(definition?.groupPrompt || groupTitle(section, index))}" placeholder="${escapeHtml(groupPlaceholder(section))}">${escapeHtml(group.text || "")}</textarea>
      </div>
      ${directCardsFields(topic, prefix, group.cards || [])}
      ${goodToggle(`${prefix}FeelsGood`, group.feelsGood, groupGoodLabel(section))}
    </article>
  `;
}

function directCardsFields(topic, prefix, cards) {
  const rows = cards.length ? cards : [makeCard(topic)];
  return `
    <div class="release-table" data-release-table data-prefix="${escapeHtml(prefix)}">
      <div class="release-table-head">
        <span>${feelingLabel(topic)}</span>
        <span>释放了吗</span>
        <span></span>
      </div>
      ${rows.map((card) => makeCardRow(topic, prefix, card)).join("")}
    </div>
    <button class="soft-btn add-card-btn" type="button" data-action="add-structured-card-row">添加${fieldName(topic)}</button>
  `;
}

function goodToggle(name, checked, label = "感觉好吗？") {
  return `
    <label class="record-good-toggle">
      <input type="checkbox" name="${escapeHtml(name)}" ${checked ? "checked" : ""} />
      <span class="box-mark">✓</span>
      <span>${escapeHtml(label)}</span>
    </label>
  `;
}

function cardsFromTable(topic, form, table) {
  const prefix = table.dataset.prefix;
  return [...table.querySelectorAll("[data-card-row]")]
    .map((row) => {
      const id = row.querySelector(`input[name="${prefix}CardId"]`)?.value || uid("card");
      const text = row.querySelector(`input[name="${prefix}CardText"]`)?.value.trim() || "";
      const released = Boolean(row.querySelector(`input[name="${prefix}CardReleased"]`)?.checked);
      const previous = allRecordCards(state.data.topicRecords.find((record) => record.id === form.dataset.record) || {}).find((card) => card.id === id);
      return {
        id,
        kind: cardKind(topic),
        text,
        released,
        createdAt: previous?.createdAt || nowIso(),
        updatedAt: nowIso()
      };
    })
    .filter((card) => card.text);
}

function sectionsFromForm(topic, form, baseRecord) {
  const structure = topicStructure(topic);
  return [...form.querySelectorAll(".structured-section")].map((sectionNode) => {
    const sectionId = sectionNode.dataset.sectionId;
    const sectionKey = sectionNode.dataset.sectionKey;
    const previousSection = findSection(baseRecord, sectionId) || {};
    const definition = structure.sections.find((item) => item.key === sectionKey) || previousSection;
    const grouped = sectionCanHaveGroups(structure, sectionKey);
    const section = {
      id: sectionId || uid("section"),
      key: sectionKey,
      title: definition.title,
      text: previousSection.text || "",
      feelsGood: Boolean(form.elements[`section-${sectionId}FeelsGood`]?.checked),
      groups: [],
      cards: [],
      createdAt: previousSection.createdAt || nowIso(),
      updatedAt: nowIso()
    };
    if (grouped) {
      section.groups = [...sectionNode.querySelectorAll(".structured-group")]
        .map((groupNode) => {
          const groupId = groupNode.dataset.groupId || uid("group");
          const previousGroup = findGroup(previousSection, groupId) || {};
          const prefix = `group-${groupId}`;
          const table = groupNode.querySelector("[data-release-table]");
          const group = {
            id: groupId,
            text: form.elements[`${prefix}Text`]?.value.trim() || "",
            feelsGood: Boolean(form.elements[`${prefix}FeelsGood`]?.checked),
            cards: table ? cardsFromTable(topic, form, table) : [],
            createdAt: previousGroup.createdAt || nowIso(),
            updatedAt: nowIso()
          };
          return group;
        })
        .filter((group) => group.text || group.cards.length);
    } else {
      const table = sectionNode.querySelector("[data-release-table]");
      section.cards = table ? cardsFromTable(topic, form, table) : [];
    }
    return section;
  });
}

function topicForm(topic) {
  const draft = makeStructuredRecord(topic);
  return `
    <form class="form-card" data-form="topic-record">
      <h2 class="section-title">添加释放记录</h2>
      <input type="hidden" name="topicId" value="${topic.id}" />
      <div class="field">
        <label>${topic.fields[0]}</label>
        <textarea name="subject" required placeholder="写下这一项"></textarea>
      </div>
      ${structuredFields(topic, draft)}
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
  const mode = state.topicRecordMode === "detail" ? "detail-mode" : "list-mode";
  return `
    <div class="record-browser ${mode}">
      <div class="record-master" aria-label="释放目标列表">
        ${records.map((record) => `
          <button class="record-master-item ${selected?.id === record.id ? "active" : ""}" data-action="select-topic-record" data-record="${record.id}">
            <span class="box-mark record-status-box" aria-label="${recordIsGood(record) ? "感觉好" : "感觉未好"}">${recordIsGood(record) ? "✓" : ""}</span>
            <span class="record-master-copy">
              <strong>${escapeHtml(record.subject || "未命名释放")}</strong>
              <small>${formatDate(record.createdAt)}</small>
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
  if (!isV2Record(record)) return `<div class="empty">这是一条旧结构记录，当前版本不再编辑旧记录。</div>`;
  const effectiveTopic = record.releaseType ? { ...topic, type: record.releaseType } : topic;
  return `
    <form class="record-detail-card" data-form="update-topic-record" data-record="${record.id}">
      <button class="soft-btn mobile-only" type="button" data-action="back-to-record-list">返回记录列表</button>
      <header>
        <div class="field compact-field">
          <label>${topic.fields[0]}</label>
          <textarea name="subject" required>${escapeHtml(record.subject)}</textarea>
        </div>
        <span class="meta">${formatDate(record.createdAt)}</span>
      </header>
      ${structuredFields(effectiveTopic, record)}
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
  const baseTopic = getTopic(setup.topicId);
  const topic = setup.topicId === FREE_RELEASE_TOPIC.id && setup.releaseType ? { ...baseTopic, type: setup.releaseType } : baseTopic;
  const structure = topicStructure(topic);
  const needsContext = topic.id !== "goal" && (structure.sections.length > 1 || COMPLEX_TOPIC_IDS.has(topic.id));
  const selectedSection = setup.sectionKey ? structure.sections.find((section) => section.key === setup.sectionKey) : structure.sections[0];
  const hasGroupedSection = structure.sections.some((section) => sectionCanHaveGroups(structure, section.key));
  const isSubjectStep = setup.step === "subject";
  const isContextStep = setup.step === "context";
  const isGoalActionStep = setup.step === "goalAction";
  const isFeelingStep = setup.step === "feeling";
  const itemizedContext = isContextStep && structure.type === "itemized";
  const prompt = isSubjectStep
    ? topicSubjectPrompt(topic)
    : isGoalActionStep
      ? "为了达成目标要做什么？"
      : isContextStep
      ? (itemizedContext ? (selectedSection?.groupPrompt || "先写下具体释放的内容") : "这次释放属于哪一部分？")
      : feelingLabel(topic);
  return appFrame(`
    <main class="release-stage">
      <div>
        <span class="eyebrow">${topic.title} · ${modeLabel(topic.type)}</span>
        <h1 class="screen-title">主题释放</h1>
      </div>
      <form class="prompt-card" data-form="${isSubjectStep ? "release-setup-subject" : isGoalActionStep ? "release-setup-goal-action" : isContextStep ? "release-setup-context" : "release-setup-feeling"}">
        <input type="hidden" name="topicId" value="${topic.id}" />
        <span class="meta">${isSubjectStep ? "第一步" : isGoalActionStep ? "行动清单" : isContextStep ? "第二步" : needsContext ? "第三步" : "第二步"}</span>
        <p class="prompt-text">${prompt}</p>
        ${isSubjectStep ? `<textarea name="subject" required placeholder="写下这次具体释放的内容">${escapeHtml(setup.subject || "")}</textarea>` : ""}
        ${isGoalActionStep ? `<textarea name="groupText" required placeholder="写下一个为了达成目标要做的事">${escapeHtml(setup.groupText || "")}</textarea>` : ""}
        ${isContextStep ? `
          <select name="sectionKey">
            ${structure.sections.map((section) => `<option value="${section.key}" ${setup.sectionKey === section.key ? "selected" : ""}>${section.title}</option>`).join("")}
          </select>
          ${hasGroupedSection ? `
            <textarea name="groupText" ${itemizedContext ? "required" : ""} placeholder="${escapeHtml(selectedSection?.groupPrompt || "方面/行动内容，选择对应分区时填写")}">${escapeHtml(setup.groupText || "")}</textarea>
          ` : ""}
        ` : ""}
        ${isFeelingStep ? `<input name="feeling" required placeholder="${topic.type === "want" ? "现在最明显的想要是什么？" : "现在最明显的感受是什么？"}" />` : ""}
        <button class="primary-btn" type="submit">${isFeelingStep ? "进入引导" : "下一步"}</button>
      </form>
      ${isFeelingStep && topic.type === "emotion" ? `<section class="emotion-picker-panel">${emotionPicker()}</section>` : ""}
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

function releaseContextLines(release) {
  const topic = getTopic(release.topicId) || FREE_RELEASE_TOPIC;
  const { record, section, group } = currentReleaseTarget();
  const subjectLabel = topic.id === "goal" ? "目标" : "主题";
  const lines = [{ label: subjectLabel, value: record?.subject || release.subject }];
  if (section) {
    if (topic.id === "success") {
      lines.push({ label: section.title, value: "" });
    } else if (topic.id === "likes-dislikes" && group?.text) {
      lines.push({ label: section.key === "likes" ? "喜欢" : "不喜欢", value: group.text });
    } else if (topic.id === "stuckness" && group?.text) {
      lines.push({ label: section.key === "benefits" ? "好处" : "坏处", value: group.text });
    } else if (topic.id === "goal" && group?.text) {
      lines.push({ label: "行动", value: group.text });
    } else if (topicStructure(topic).type === "itemized" && group?.text) {
      lines.push({ label: section.title || groupUnitLabel(topicStructure(topic), section), value: group.text });
    } else if (topic.id !== "goal" && topic.id !== FREE_RELEASE_TOPIC.id && section.key !== "default" && section.title !== feelingLabel(topic)) {
      lines.push({ label: "归属", value: section.title });
    }
  }
  return lines.filter((line) => line.value || line.label).slice(0, 3);
}

function releaseContextPanel(release) {
  const lines = releaseContextLines(release);
  return `
    <section class="release-context" aria-label="释放上下文">
      ${lines.map((line, index) => `
        <div class="release-context-line ${index === 0 ? "primary" : ""}">
          <span>${escapeHtml(line.label)}</span>
          ${line.value ? `<strong>${escapeHtml(line.value)}</strong>` : ""}
        </div>
      `).join("")}
    </section>
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
      ${release.releaseType === "emotion" ? `<section class="emotion-picker-panel">${emotionPicker()}</section>` : ""}
    `;
  }

  if (release.step === "continueRelease") {
    content = `
      <section class="prompt-card">
        <span class="meta">继续检查</span>
        <p class="prompt-text">还想继续释放吗？</p>
        <span class="hint">继续会写入同一条释放记录，不会另起一条割裂记录。</span>
        <div class="choice-grid">
          <button class="choice-btn" data-action="continue-release" data-answer="true">想继续</button>
          <button class="choice-btn emphasis-choice" data-action="continue-release" data-answer="false">不想继续</button>
        </div>
      </section>
    `;
  }

  return appFrame(`
    <main class="release-stage">
      <div>
        <span class="eyebrow">${topic ? topic.title : "自由释放"}</span>
        <h1 class="screen-title">释放引导</h1>
      </div>
      ${releaseContextPanel(release)}
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
    .filter((record) => isV2Record(record) && record.gain)
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

async function createSession({ source, topicId = null, subject, releaseType, feeling, recordId = null, goalId = null, actionId = null, structurePath = null }) {
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
    structurePath,
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
    structurePath,
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
    structurePath: session.structurePath || null,
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
  await updateSessionStatus("completed", true);
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
    if (isV2Record(record)) {
      const target = findPathTarget(record, state.release.structurePath || session.structurePath);
      if (target.card) {
        target.card.text = state.release.currentFeeling;
        target.card.released = released;
        target.card.updatedAt = nowIso();
      }
      if (target.group) target.group.feelsGood = feelsGood;
      else if (target.section) target.section.feelsGood = feelsGood;
      record.updatedAt = nowIso();
      await putStore("topicRecords", record);
    }
  }
}

async function appendFeelingToCurrentPath(text) {
  const session = state.data.sessions.find((item) => item.id === state.release.sessionId);
  const record = state.data.topicRecords.find((item) => item.id === session?.recordId);
  const baseTopic = getTopic(session?.topicId);
  const topic = baseTopic && session?.releaseType ? { ...baseTopic, type: session.releaseType } : baseTopic;
  if (!isV2Record(record) || !topic) return;
  const target = findPathTarget(record, state.release.structurePath || session.structurePath);
  const card = makeCard(topic, text);
  target.container?.cards.push(card);
  if (target.group) target.group.updatedAt = nowIso();
  if (target.section) target.section.updatedAt = nowIso();
  record.updatedAt = nowIso();
  const structurePath = {
    sectionId: target.section?.id || "",
    groupId: target.group?.id || "",
    cardId: card.id
  };
  session.structurePath = structurePath;
  session.currentFeeling = text;
  session.updatedAt = nowIso();
  await putStore("topicRecords", record);
  await putStore("sessions", session);
  await loadData();
  state.release.structurePath = structurePath;
  state.release.currentFeeling = text;
}

function ensureGoalRecord(subject, goalId = "") {
  const topic = getTopic("goal");
  const existing = state.data.topicRecords.find((record) =>
    isV2Record(record) && record.topicId === "goal" && ((goalId && record.goalId === goalId) || record.subject === subject)
  );
  if (existing) return existing;
  const record = makeStructuredRecord(topic, subject);
  record.goalId = goalId;
  return record;
}

function currentReleaseTarget() {
  const session = state.data.sessions.find((item) => item.id === state.release?.sessionId);
  const record = state.data.topicRecords.find((item) => item.id === session?.recordId);
  if (!isV2Record(record)) return { session, record: null, section: null, group: null, card: null };
  const target = findPathTarget(record, state.release.structurePath || session.structurePath);
  return { session, record, ...target };
}

async function createStructuredReleaseSession({ topic, subject, sectionKey, groupText = "", feeling, source = "topic-record", goalId = "", actionId = "", record = null }) {
  const workingRecord = record || makeStructuredRecord(topic, subject);
  workingRecord.subject = subject;
  if (goalId) workingRecord.goalId = goalId;
  const structure = topicStructure(topic);
  const section = findSection(workingRecord, sectionKey) || workingRecord.sections[0];
  let container = section;
  let group = null;
  if (sectionCanHaveGroups(structure, section.key)) {
    group = actionId ? (section.groups || []).find((item) => item.actionId === actionId) : null;
    if (!group) {
      group = makeGroup(groupText);
      if (actionId) group.actionId = actionId;
      section.groups.push(group);
    } else if (groupText) {
      group.text = groupText;
      group.updatedAt = nowIso();
    }
    container = group;
  }
  const card = makeCard(topic, feeling);
  container.cards.push(card);
  section.updatedAt = nowIso();
  workingRecord.updatedAt = nowIso();
  await putStore("topicRecords", workingRecord);
  await loadData();
  state.selectedTopicRecordId = workingRecord.id;
  const structurePath = {
    sectionId: section.id,
    groupId: group?.id || "",
    cardId: card.id
  };
  await createSession({
    source,
    topicId: topic.id,
    subject,
    releaseType: topic.type,
    feeling,
    recordId: workingRecord.id,
    goalId,
    actionId,
    structurePath
  });
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
  if (state.route === "topicDetail") {
    if (state.topicRecordView === "group") {
      state.topicRecordView = "record";
      state.editingGroupId = "";
      state.expandedCardId = "";
      render();
      return;
    }
    if (state.topicRecordView === "record") {
      resetTopicRecordEditing();
      render();
      return;
    }
    return setRoute("topics");
  }
  if (state.route === "releaseSetup") return setRoute("releaseStart", { releaseSetup: null });
  if (state.route === "release") return pauseRelease();
  setRoute("home");
}

app.addEventListener("click", async (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    if (routeButton.dataset.route !== "topicDetail") resetTopicRecordEditing();
    setRoute(routeButton.dataset.route);
  }

  const backButton = event.target.closest("[data-action='back']");
  if (backButton) handleBack();

  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) {
    resetTopicRecordEditing();
    setRoute("topicDetail", { topicId: topicButton.dataset.topic, topicRecordMode: "list", topicRecordView: "list" });
  }

  const action = event.target.closest("[data-action]");
  if (!action) return;
  const name = action.dataset.action;

  if (name === "start-selected-topic") {
    const select = document.querySelector("#topicSelect");
    const topic = getTopic(select.value);
    const structure = topicStructure(topic);
    const needsContext = topic.id !== "goal" && (structure.sections.length > 1 || COMPLEX_TOPIC_IDS.has(topic.id));
    const defaultSubject = defaultTopicRecordSubject(topic);
    state.releaseSetup = {
      topicId: topic.id,
      step: defaultSubject && needsContext ? "context" : "subject",
      subject: defaultSubject,
      sectionKey: structure.sections[0]?.key || "default"
    };
    setRoute("releaseSetup");
  }
  if (name === "select-emotion") {
    if (ignoreNextEmotionClick && action.classList.contains("emotion-card-main")) {
      ignoreNextEmotionClick = false;
      return;
    }
    ignoreNextEmotionClick = false;
    const input = action.closest("form")?.querySelector('input[name="feeling"]') || action.closest(".release-stage")?.querySelector('form input[name="feeling"]');
    if (input) {
      input.value = action.dataset.emotion;
      input.blur();
      action.closest(".emotion-picker")?.querySelectorAll(".emotion-card").forEach((card) => {
        card.classList.toggle("selected", card.dataset.emotion === action.dataset.emotion);
        card.classList.remove("subemotion-open");
      });
    }
  }
  if (name === "open-subemotions") {
    const picker = action.closest(".emotion-picker");
    picker?.querySelectorAll(".emotion-card").forEach((card) => {
      card.classList.toggle("selected", card.dataset.emotion === action.dataset.emotion);
      card.classList.toggle("subemotion-open", card.dataset.emotion === action.dataset.emotion);
    });
  }
  if (name === "close-subemotions") {
    if (action.classList.contains("emotion-subemotion-sheet") && event.target.closest(".emotion-subemotion-panel")) return;
    action.closest(".emotion-card")?.classList.remove("subemotion-open");
  }
  if (name === "select-subemotion") {
    const input = action.closest(".release-stage")?.querySelector('form input[name="feeling"]');
    const card = action.closest(".emotion-card");
    if (input) {
      input.value = action.dataset.emotion;
      input.blur();
    }
    card?.closest(".emotion-picker")?.querySelectorAll(".emotion-card").forEach((item) => {
      item.classList.toggle("selected", item === card);
      item.classList.remove("subemotion-open");
    });
  }
  if (name === "export-topic-records") exportTopicRecords();
  if (name === "export-gains") exportGains();
  if (name === "close-dialog") {
    state.dialog = null;
    render();
  }
  if (name === "new-topic-record") {
    const topic = getTopic(action.dataset.topic) || getTopic(state.topicId) || TOPICS[0];
    beginTopicRecordDraft(topic);
    render();
    window.setTimeout(() => document.querySelector('[data-draft-field="subject"]')?.focus(), 80);
  }
  if (name === "edit-topic-record-card") {
    const topic = getTopic(state.topicId) || TOPICS[0];
    const record = state.data.topicRecords.find((item) => item.id === action.dataset.record);
    if (isV2Record(record)) {
      beginTopicRecordDraft(topic, record);
      render();
    }
  }
  if (name === "toggle-record-actions") {
    state.expandedRecordId = state.expandedRecordId === action.dataset.record ? "" : action.dataset.record;
    render();
  }
  if (name === "switch-record-section") {
    state.editingSectionKey = action.dataset.sectionKey;
    state.editingGroupId = "";
    state.expandedGroupId = "";
    state.expandedCardId = "";
    render();
  }
  if (name === "add-progressive-group") {
    const record = draftRecord();
    const section = record ? findSection(record, action.dataset.sectionKey) : null;
    if (record && section) {
      const group = makeGroup("", []);
      section.groups.push(group);
      section.updatedAt = nowIso();
      state.editingSectionKey = section.key;
      state.editingGroupId = group.id;
      state.topicRecordView = "group";
      render();
      window.setTimeout(() => document.querySelector('[data-draft-group-field="text"]')?.focus(), 80);
    }
  }
  if (name === "edit-progressive-group") {
    state.editingSectionKey = action.dataset.sectionKey;
    state.editingGroupId = action.dataset.group;
    state.expandedGroupId = "";
    state.expandedCardId = "";
    state.topicRecordView = "group";
    render();
  }
  if (name === "toggle-group-actions") {
    state.expandedGroupId = state.expandedGroupId === action.dataset.group ? "" : action.dataset.group;
    render();
  }
  if (name === "delete-progressive-group") {
    const record = draftRecord();
    const section = record ? findSection(record, action.dataset.sectionKey) : null;
    if (section) {
      section.groups = (section.groups || []).filter((group) => group.id !== action.dataset.group);
      section.updatedAt = nowIso();
      record.updatedAt = nowIso();
      state.expandedGroupId = "";
      render();
    }
  }
  if (name === "add-progressive-card") {
    const topic = getTopic(state.topicId) || TOPICS[0];
    const container = currentCardContainer(action.dataset.container);
    if (container) {
      const card = makeCard(topic);
      container.cards = container.cards || [];
      container.cards.push(card);
      container.updatedAt = nowIso();
      state.focusCardId = card.id;
      render();
      window.setTimeout(() => document.querySelector(`[data-draft-card-field][data-card="${card.id}"]`)?.focus(), 80);
    }
  }
  if (name === "toggle-progressive-card-release") {
    const { card } = findDraftCard(action.dataset.card);
    if (card) {
      card.released = !card.released;
      card.updatedAt = nowIso();
      render();
    }
  }
  if (name === "toggle-card-actions") {
    state.expandedCardId = state.expandedCardId === action.dataset.card ? "" : action.dataset.card;
    render();
  }
  if (name === "delete-progressive-card") {
    const { card, container } = findDraftCard(action.dataset.card);
    if (card && container) {
      container.cards = (container.cards || []).filter((item) => item.id !== card.id);
      container.updatedAt = nowIso();
      state.expandedCardId = "";
      render();
    }
  }
  if (name === "set-progressive-good") {
    const value = action.dataset.good === "true";
    if (action.dataset.scope === "group") {
      const group = currentDraftGroup();
      if (group) {
        group.feelsGood = value;
        group.updatedAt = nowIso();
      }
    } else {
      const section = currentDraftSection();
      if (section) {
        section.feelsGood = value;
        section.updatedAt = nowIso();
      }
    }
    render();
  }
  if (name === "add-topic-form-row") {
    showToast("当前版本已使用结构化记录，请使用各分区里的添加按钮");
  }
  if (name === "add-structured-card-row") {
    const form = action.closest("form");
    const topic = getTopic(form?.querySelector('input[name="topicId"]')?.value) || getTopic(state.topicId) || FREE_RELEASE_TOPIC;
    const table = action.previousElementSibling?.matches("[data-release-table]") ? action.previousElementSibling : action.parentElement.querySelector("[data-release-table]");
    if (table) table.insertAdjacentHTML("beforeend", makeCardRow(topic, table.dataset.prefix));
  }
  if (name === "remove-structured-card-row") {
    const row = action.closest("[data-card-row]");
    const table = action.closest("[data-release-table]");
    const rows = table ? [...table.querySelectorAll("[data-card-row]")] : [];
    if (row && rows.length > 1) {
      row.remove();
    } else if (row) {
      const input = row.querySelector('input[name$="CardText"]');
      const checkbox = row.querySelector('input[name$="CardReleased"]');
      if (input) input.value = "";
      if (checkbox) checkbox.checked = false;
    }
  }
  if (name === "add-structured-group") {
    const form = action.closest("form");
    const topic = getTopic(form?.querySelector('input[name="topicId"]')?.value) || getTopic(state.topicId) || TOPICS[0];
    const section = action.closest(".structured-section");
    const groupList = section?.querySelector("[data-groups]");
    const sectionKey = section?.dataset.sectionKey;
    const definition = topicStructure(topic).sections.find((item) => item.key === sectionKey);
    if (groupList) {
      const nextIndex = groupList.querySelectorAll(".structured-group").length;
      groupList.insertAdjacentHTML("beforeend", structuredGroupFields(topic, { id: section.dataset.sectionId, key: sectionKey }, makeGroup("", [makeCard(topic)]), definition, nextIndex));
    }
  }
  if (name === "switch-structured-section-tab") {
    const editor = action.closest(".tabbed-structured-editor");
    const targetId = action.dataset.sectionId;
    editor?.querySelectorAll(".structured-tab").forEach((tab) => {
      const active = tab.dataset.sectionId === targetId;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    editor?.querySelectorAll(".structured-tab-panel").forEach((panel) => {
      const active = panel.dataset.sectionId === targetId;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  }
  if (name === "remove-structured-group") {
    const group = action.closest(".structured-group");
    const list = group?.parentElement;
    const groups = list ? [...list.querySelectorAll(".structured-group")] : [];
    if (group && groups.length > 1) group.remove();
    else if (group) {
      group.querySelector("textarea")?.replaceChildren();
      const input = group.querySelector("textarea");
      if (input) input.value = "";
      group.querySelectorAll('input[type="text"], input[name$="CardText"]').forEach((item) => item.value = "");
      group.querySelectorAll('input[type="checkbox"]').forEach((item) => item.checked = false);
    }
  }
  if (name === "create-empty-topic-record") {
    const topic = getTopic(action.dataset.topic);
    const record = makeStructuredRecord(topic);
    await putStore("topicRecords", record);
    await loadData();
    state.selectedTopicRecordId = record.id;
    state.topicRecordMode = "detail";
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
      await syncLinkedRecord(false, false);
      state.release.promptIndex = 0;
      state.release.step = "prompt";
    }
    render();
  }
  if (name === "answer-good") {
    const good = action.dataset.answer === "true";
    if (good) {
      await saveRound(true, true);
      await syncLinkedRecord(true, true);
      const target = currentReleaseTarget();
      if (state.release.topicId === "goal" && target.section?.key === "goal-feelings") {
        state.releaseSetup = {
          topicId: "goal",
          step: "goalAction",
          subject: state.release.subject,
          recordId: target.record?.id || target.session?.recordId || ""
        };
        await updateSessionStatus("completed", true);
        state.release = null;
        setRoute("releaseSetup");
        return;
      }
      state.release.step = "continueRelease";
      render();
    } else {
      await saveRound(true, false);
      await syncLinkedRecord(true, false);
      state.release.step = "nextFeeling";
      render();
    }
  }
  if (name === "continue-release") {
    const keepGoing = action.dataset.answer === "true";
    if (keepGoing) {
      const topic = getTopic(state.release.topicId) || FREE_RELEASE_TOPIC;
      const structure = topicStructure(topic);
      const needsContext = topic.id !== "goal" && (structure.sections.length > 1 || COMPLEX_TOPIC_IDS.has(topic.id));
      const recordId = state.data.sessions.find((session) => session.id === state.release.sessionId)?.recordId || "";
      state.releaseSetup = {
        topicId: topic.id,
        releaseType: state.release.releaseType,
        step: topic.id === "goal" ? "goalAction" : needsContext ? "context" : "feeling",
        subject: state.release.subject,
        recordId,
        sectionKey: topic.id === "goal" ? "goal-actions" : structure.sections[0]?.key || "default"
      };
      await updateSessionStatus("completed", true);
      state.release = null;
      setRoute("releaseSetup");
    } else {
      await completeRelease();
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
    state.topicRecordMode = "detail";
    render();
  }
  if (name === "back-to-record-list") {
    state.topicRecordMode = "list";
    render();
  }
  if (name === "delete-record") {
    const record = state.data.topicRecords.find((item) => item.id === action.dataset.record);
    if (!window.confirm(`删除「${record?.subject || "未命名释放"}」这条释放记录？删除后无法恢复。`)) return;
    await deleteStore("topicRecords", action.dataset.record);
    await loadData();
    state.selectedTopicRecordId = null;
    state.topicRecordMode = "list";
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
    const record = ensureGoalRecord(goal.statement, goal.id);
    await createStructuredReleaseSession({ source: "goal", topic: getTopic("goal"), subject: goal.statement, sectionKey: "goal-feelings", feeling: goal.feeling || "对目标的感受", goalId: goal.id, record });
  }
  if (name === "release-action") {
    const item = state.data.actions.find((entry) => entry.id === action.dataset.actionId);
    const goal = state.data.goals.find((entry) => entry.id === item.goalId);
    const subject = goal?.statement || item.title;
    const record = ensureGoalRecord(subject, item.goalId);
    await createStructuredReleaseSession({ source: "action", topic: getTopic("goal"), subject, sectionKey: "goal-actions", groupText: item.title, feeling: item.feeling || "对行动的感受", goalId: item.goalId, actionId: item.id, record });
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
    card.closest(".emotion-picker")?.querySelectorAll(".emotion-card.expanded").forEach((item) => {
      if (item !== card) item.classList.remove("expanded");
    });
    card.classList.toggle("expanded");
  }, 520);
});

app.addEventListener("pointerup", (event) => {
  const card = event.target.closest("[data-emotion-card]");
  window.clearTimeout(emotionPressTimer);
  if (!card || emotionLongPressed) return;
  const input = card.closest("form")?.querySelector('input[name="feeling"]') || card.closest(".release-stage")?.querySelector('form input[name="feeling"]');
  if (input) {
    input.value = card.dataset.emotion;
    input.focus();
    card.closest(".emotion-picker")?.querySelectorAll(".emotion-card").forEach((item) => item.classList.toggle("selected", item === card));
  }
});

app.addEventListener("pointercancel", () => {
  window.clearTimeout(emotionPressTimer);
});

app.addEventListener("pointerleave", () => {
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

app.addEventListener("input", (event) => {
  const target = event.target;
  const record = draftRecord();
  if (!record || state.route !== "topicDetail") return;
  if (target.matches("[data-draft-field]")) {
    record[target.dataset.draftField] = target.value;
    record.updatedAt = nowIso();
  }
  if (target.matches("[data-draft-group-field]")) {
    const group = currentDraftGroup();
    if (group) {
      group[target.dataset.draftGroupField] = target.value;
      group.updatedAt = nowIso();
      record.updatedAt = nowIso();
    }
  }
  if (target.matches("[data-draft-card-field]")) {
    const { card } = findDraftCard(target.dataset.card);
    if (card) {
      card[target.dataset.draftCardField] = target.value;
      card.updatedAt = nowIso();
      record.updatedAt = nowIso();
    }
  }
});

app.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());

  if (form.dataset.form === "topic-record-card") {
    const record = draftRecord();
    if (isV2Record(record)) {
      record.subject = data.subject || record.subject || "";
      record.gain = data.gain || record.gain || "";
      const normalized = normalizeRecordForSave(record);
      await putStore("topicRecords", normalized);
      await loadData();
      state.selectedTopicRecordId = normalized.id;
      resetTopicRecordEditing();
      render();
      showToast("释放记录已保存");
    }
    return;
  }

  if (form.dataset.form === "topic-group-card") {
    const group = currentDraftGroup();
    const structure = currentTopicStructure();
    const section = currentDraftSection();
    const unit = section ? groupUnitLabel(structure, section) : "条目";
    if (group) {
      group.text = data.groupText || group.text || "";
      group.updatedAt = nowIso();
      const record = draftRecord();
      if (record) record.updatedAt = nowIso();
    }
    state.topicRecordView = "record";
    state.editingGroupId = "";
    state.expandedCardId = "";
    render();
    showToast(`${unit}已保存`);
    return;
  }

  if (form.dataset.form === "topic-record") {
    const topic = getTopic(data.topicId);
    const record = makeStructuredRecord(topic, data.subject);
    record.sections = sectionsFromForm(topic, form, record);
    record.gain = data.gain || "";
    record.updatedAt = nowIso();
    await putStore("topicRecords", record);
    await loadData();
    state.selectedTopicRecordId = record.id;
    render();
    form.reset();
    showToast(`${topic.title} 已保存`);
  }

  if (form.dataset.form === "update-topic-record") {
    const record = state.data.topicRecords.find((item) => item.id === form.dataset.record);
    if (isV2Record(record)) {
      const baseTopic = getTopic(record.topicId);
      const topic = record.releaseType ? { ...baseTopic, type: record.releaseType } : baseTopic;
      record.subject = data.subject;
      record.sections = sectionsFromForm(topic, form, record);
      record.gain = data.gain || "";
      record.updatedAt = nowIso();
      await save("topicRecords", record);
      showToast("释放记录已更新");
    }
  }

  if (form.dataset.form === "start-topic-release") {
    state.dialog = null;
  }

  if (form.dataset.form === "release-setup-subject") {
    const topic = getTopic(data.topicId);
    const structure = topicStructure(topic);
    const needsContext = topic.id !== "goal" && (structure.sections.length > 1 || COMPLEX_TOPIC_IDS.has(topic.id));
    const subject = data.subject || defaultTopicRecordSubject(topic);
    state.releaseSetup = {
      topicId: topic.id,
      step: needsContext ? "context" : "feeling",
      subject,
      sectionKey: topic.id === "goal" ? "goal-feelings" : structure.sections[0]?.key || "default",
      recordId: state.releaseSetup?.recordId || ""
    };
    render();
  }

  if (form.dataset.form === "release-setup-goal-action") {
    state.releaseSetup = {
      ...state.releaseSetup,
      topicId: "goal",
      step: "feeling",
      sectionKey: "goal-actions",
      groupText: data.groupText || ""
    };
    render();
  }

  if (form.dataset.form === "release-setup-context") {
    const topic = getTopic(data.topicId);
    state.releaseSetup = {
      ...state.releaseSetup,
      topicId: topic.id,
      step: "feeling",
      sectionKey: data.sectionKey,
      groupText: data.groupText || ""
    };
    render();
  }

  if (form.dataset.form === "release-setup-feeling") {
    const baseTopic = getTopic(data.topicId);
    const topic = data.topicId === FREE_RELEASE_TOPIC.id && state.releaseSetup?.releaseType ? { ...baseTopic, type: state.releaseSetup.releaseType } : baseTopic;
    const subject = state.releaseSetup?.subject || topic.title;
    const existing = state.releaseSetup?.recordId ? state.data.topicRecords.find((record) => record.id === state.releaseSetup.recordId) : null;
    const structure = topicStructure(topic);
    const sectionKey = state.releaseSetup?.sectionKey || structure.sections[0]?.key || "default";
    const groupText = state.releaseSetup?.groupText || "";
    state.releaseSetup = null;
    await createStructuredReleaseSession({
      source: "topic-record",
      topic,
      subject,
      sectionKey,
      groupText,
      feeling: data.feeling,
      record: isV2Record(existing) ? existing : null
    });
  }

  if (form.dataset.form === "free-release") {
    const topic = { ...FREE_RELEASE_TOPIC, type: data.releaseType };
    await createStructuredReleaseSession({
      source: "free",
      topic,
      subject: data.subject,
      sectionKey: "default",
      feeling: data.feeling
    });
  }

  if (form.dataset.form === "next-feeling") {
    await appendFeelingToCurrentPath(data.feeling);
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
    const session = state.data.sessions.find((item) => item.id === state.dialog.sessionId);
    if (body) {
      await putStore("gains", {
        id: uid("gain"),
        body,
        createdAt: nowIso(),
        sessionId: state.dialog.sessionId,
        topicId: session?.topicId || "",
        recordId: session?.recordId || "",
        goalId: session?.goalId || ""
      });
      const record = state.data.topicRecords.find((item) => item.id === session?.recordId);
      if (isV2Record(record)) {
        record.gain = body;
        record.updatedAt = nowIso();
        await putStore("topicRecords", record);
      }
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

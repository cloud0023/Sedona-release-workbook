import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const files = ["index.html", "styles.css", "src/app.js", "manifest.json", "service-worker.js"];

for (const file of files) {
  const content = readFileSync(join(root, file), "utf8");
  if (!content.trim()) throw new Error(`${file} is empty`);
}

const app = readFileSync(join(root, "src/app.js"), "utf8");
const requiredSnippets = [
  "允许自己感受它吗？",
  "什么时候放它离开呢？",
  "允许自己感受这个想要吗？",
  "const WANT_PROMPTS",
  "createSession",
  "STRUCTURED_SCHEMA_VERSION",
  "sectionsFromForm",
  "我对此有什么感受？",
  "我对此有什么想要？",
  "topicRecords"
];

for (const snippet of requiredSnippets) {
  if (!app.includes(snippet)) throw new Error(`Missing required snippet: ${snippet}`);
}

console.log("smoke ok");

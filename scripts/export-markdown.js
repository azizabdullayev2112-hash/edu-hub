import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const terms = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'terms.json'), 'utf8'));

let md = `# 📖 OpenEdu Hub - Academic Glossary & Simplified Guide\n\n`;
md += `> A community-driven reference dictionary translating heavy academic terminology into intuitive explanations (ELI5) and real-world analogies.\n\n`;
md += `| Term | Category | Difficulty | Plain English (ELI5) |\n`;
md += `| :--- | :--- | :--- | :--- |\n`;

terms.forEach((t) => {
  md += `| **[${t.term}](#${t.id})** | \`${t.category}\` | ${t.difficulty} | ${t.eli5.replace(/\|/g, '\\|')} |\n`;
});

md += `\n---\n\n`;

terms.forEach((t) => {
  md += `### <a id="${t.id}"></a>${t.term}\n\n`;
  md += `- **Category:** \`${t.category}\`\n`;
  md += `- **Difficulty:** \`${t.difficulty}\`\n`;
  md += `- **Tags:** ${t.tags.map((tg) => `\`#${tg}\``).join(' ')}\n\n`;
  md += `#### 🏛️ Formal Academic Definition\n> "${t.formalDefinition}"\n\n`;
  md += `#### 💡 Explain Like I'm 5 (ELI5)\n${t.eli5}\n\n`;
  md += `#### 🌍 Real-World Analogy\n${t.analogy}\n\n`;
  md += `#### 🎯 Why It Matters\n${t.keyTakeaway}\n\n`;
  md += `---\n\n`;
});

fs.writeFileSync(path.join(rootDir, 'GLOSSARY.md'), md, 'utf8');
console.log('✅ Generated GLOSSARY.md successfully!');

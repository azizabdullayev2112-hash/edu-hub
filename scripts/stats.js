import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const terms = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'terms.json'), 'utf8'));
const roadmaps = JSON.parse(fs.readFileSync(path.join(rootDir, 'data', 'roadmaps.json'), 'utf8'));

console.log('==================================================');
console.log('📊 OpenEdu Hub Knowledge Base Summary Metrics');
console.log('==================================================\n');

console.log(`Total Curated Academic Terms:  ${terms.length}`);
console.log(`Total Skill Roadmaps:          ${roadmaps.length}`);

const categories = {};
const difficulties = {};

terms.forEach(t => {
  categories[t.category] = (categories[t.category] || 0) + 1;
  difficulties[t.difficulty] = (difficulties[t.difficulty] || 0) + 1;
});

console.log('\n--- Categories Breakdown ---');
Object.entries(categories).forEach(([k, v]) => console.log(`• ${k}: ${v}`));

console.log('\n--- Difficulty Levels ---');
Object.entries(difficulties).forEach(([k, v]) => console.log(`• ${k}: ${v}`));

let totalSkillsCount = 0;
roadmaps.forEach(r => {
  r.phases.forEach(p => {
    totalSkillsCount += (p.skills || []).length;
  });
});

console.log(`\nTotal Structured Skill Milestones: ${totalSkillsCount}`);
console.log('\n==================================================\n');

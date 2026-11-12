import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const termsPath = path.join(rootDir, 'data', 'terms.json');
const roadmapsPath = path.join(rootDir, 'data', 'roadmaps.json');

console.log('🔍 [OpenEdu-Hub] Starting dataset integrity and schema validation...\n');

let errorCount = 0;

// Validate Terms
if (!fs.existsSync(termsPath)) {
  console.error(`❌ Terms file missing at: ${termsPath}`);
  process.exit(1);
}

const terms = JSON.parse(fs.readFileSync(termsPath, 'utf8'));
const requiredTermFields = ['id', 'term', 'category', 'difficulty', 'formalDefinition', 'eli5', 'analogy'];
const termIds = new Set();

terms.forEach((item, index) => {
  if (!item.id || termIds.has(item.id)) {
    console.error(`❌ Term at index ${index} has missing or duplicate id: "${item.id}"`);
    errorCount++;
  } else {
    termIds.add(item.id);
  }

  requiredTermFields.forEach(field => {
    if (!item[field] || typeof item[field] !== 'string' || item[field].trim().length === 0) {
      console.error(`❌ Term "${item.id || index}" is missing or has empty required field: "${field}"`);
      errorCount++;
    }
  });
});

console.log(`✅ Validated ${terms.length} academic terms across ${new Set(terms.map(t => t.category)).size} categories.`);

// Validate Roadmaps
if (!fs.existsSync(roadmapsPath)) {
  console.error(`❌ Roadmaps file missing at: ${roadmapsPath}`);
  process.exit(1);
}

const roadmaps = JSON.parse(fs.readFileSync(roadmapsPath, 'utf8'));
const roadmapIds = new Set();

roadmaps.forEach((rm, index) => {
  if (!rm.id || roadmapIds.has(rm.id)) {
    console.error(`❌ Roadmap at index ${index} has missing or duplicate id: "${rm.id}"`);
    errorCount++;
  } else {
    roadmapIds.add(rm.id);
  }

  if (!Array.isArray(rm.phases) || rm.phases.length === 0) {
    console.error(`❌ Roadmap "${rm.id}" must contain at least one phase.`);
    errorCount++;
  }
});

console.log(`✅ Validated ${roadmaps.length} learning roadmaps.`);

if (errorCount > 0) {
  console.error(`\n❌ Validation failed with ${errorCount} error(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 All dataset schemas and references validated successfully!\n');
  process.exit(0);
}

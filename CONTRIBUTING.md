# Contributing to OpenEdu Hub 🎓

Thank you for your interest in contributing to **OpenEdu Hub**! This project is an open-source, community-driven initiative dedicated to lowering the barrier to entry for complex computer science, mathematics, and artificial intelligence subjects.

---

## 🌟 How You Can Help

1. **Add Academic Terms (ELI5):** Help students by submitting clear, memorable explanations of difficult concepts.
2. **Expand Skill Roadmaps:** Suggest missing milestones, topics, or practical capstone projects for existing curricula.
3. **Enhance the Web Platform:** Improve accessibility, UI components, search functionality, or add new interactive learning modes.

---

## 📝 Submitting a New Academic Term

All terminology data lives in `data/terms.json`. Every entry must adhere to the following schema:

```json
{
  "id": "kebab-case-unique-id",
  "term": "Term Name",
  "category": "Computer Science | Machine Learning | Distributed Systems | Mathematics",
  "difficulty": "Beginner | Intermediate | Advanced",
  "formalDefinition": "Precise textbook definition with citation or standard phrasing.",
  "eli5": "Intuitive explanation that anyone without a PhD can grasp immediately.",
  "analogy": "Concrete real-world metaphor illustrating how the concept behaves.",
  "keyTakeaway": "Practical consequence or why a software engineer must know this.",
  "tags": ["relevant", "keywords"]
}
```

After modifying `data/terms.json`, always run:
```bash
npm test
npm run generate:docs
```

---

## 🛠️ Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/azizabdullayev2112-hash/edu-hub.git
   cd edu-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Run schema validation & builds:**
   ```bash
   npm test
   npm run build
   ```

---

## 📋 Pull Request Guidelines

- Ensure `npm run test` passes with 0 errors before opening a PR.
- Keep commits clear and descriptive (e.g., `feat(terms): add CAP theorem breakdown`).
- Open a GitHub Issue for large feature proposals before submitting significant code changes.

Thank you for helping make world-class computer science education accessible to everyone! 🚀

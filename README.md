# 🎓 Edu Hub (OpenEdu)

> **A centralized, community-driven educational platform providing structured skill roadmaps and simplified breakdowns of complex academic terminology for self-taught learners and university students.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build & Validation](https://github.com/azizabdullayev2112-hash/edu-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/azizabdullayev2112-hash/edu-hub/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)

---

## 🌍 The Problem We Address

Higher-level technical education in Computer Science, Machine Learning, and Distributed Systems is often gated behind expensive tutoring platforms, proprietary course paywalls, and impenetrable academic jargon.

Self-taught learners and students from emerging tech ecosystems frequently hit roadblocks not due to a lack of ambition, but because:
1. **Curricula are fragmented:** Students don't know what order of skills to study or how theoretical math connects to real engineering.
2. **Academic terminology is needlessly obscure:** Textbooks define terms using dense mathematical formalism without providing intuitive mental models or analogies.

**OpenEdu Hub** is an open-source initiative designed to permanently lower this barrier to entry by unifying:
- 🗺️ **Structured Skill Roadmaps:** Clear, phase-by-phase learning pathways with practical capstone milestones.
- 💡 **ELI5 Academic Glossary:** Heavy academic concepts broken down into "Explain Like I'm 5" summaries, real-world analogies, and formal definitions.
- ⚡ **Interactive Self-Testing Drill:** Active-recall flashcards that help students reinforce conceptual understanding.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Interactive Skill Roadmaps** | Visual timelines for Computer Science and Applied AI tracks with milestone checklists saved directly to browser storage. |
| **Tri-Mode Terminology Cards** | Every concept can be toggled between **ELI5 Plain English**, **Real-World Analogy**, and **Formal Academic Definition**. |
| **Instant Filter & Search** | Live search across keywords, categories, and difficulty levels (Beginner, Intermediate, Advanced). |
| **Active Recall Flashcards** | Practice mode with flip-cards and progress tracking to cement tricky concepts. |
| **Machine-Readable Dataset** | All knowledge is stored in clean JSON files under `/data`, fully validated via automated CI scripts. |
| **Markdown Export** | Auto-generates a stand-alone [GLOSSARY.md](GLOSSARY.md) readable directly on GitHub. |

---

## 🛠️ Architecture & Tech Stack

```
openedu-hub/
├── data/
│   ├── terms.json              # Curated academic glossary & ELI5 explanations
│   └── roadmaps.json           # Phase-based educational curricula & milestones
├── scripts/
│   ├── validate-dataset.js     # CI script ensuring schema integrity & no broken links
│   ├── export-markdown.js      # Auto-generates GLOSSARY.md for GitHub readers
│   └── stats.js                # Metrics reporting on dataset coverage
├── src/
│   ├── components/             # Modular React UI components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── RoadmapView.tsx
│   │   ├── GlossaryView.tsx
│   │   └── QuizView.tsx
│   ├── types.ts                # TypeScript schemas for terms and roadmaps
│   ├── App.tsx
│   └── main.tsx
├── .github/
│   └── workflows/ci.yml        # GitHub Actions continuous integration
├── GLOSSARY.md                 # Generated standalone dictionary
├── CONTRIBUTING.md             # Contributor guidelines
└── LICENSE                     # MIT Open Source License
```

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Data & Tools:** Pure Node.js ESM validation scripts, zero heavy external runtime dependencies
- **Deployment Target:** Static bundle deployable to GitHub Pages, Vercel, or Netlify

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### 1. Clone & Install
```bash
git clone https://github.com/azizabdullayev2112-hash/edu-hub.git
cd edu-hub
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Validate Data Integrity
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 🧭 Project Roadmap & Milestones

- [x] Initial architecture, data schemas, and UI design system.
- [x] Computer Science & AI/ML foundation roadmaps.
- [x] Searchable ELI5 academic glossary with category & difficulty tagging.
- [x] Active recall flashcard quiz module with persistent progress.
- [x] Automated dataset validation and Markdown generation pipeline.
- [ ] **Phase 2 (Upcoming):** Community submission portal for university student chapters.
- [ ] **Phase 2 (Upcoming):** Multilingual support (adding Uzbek, Spanish, and French translations).
- [ ] **Phase 3:** Interactive browser-based coding sandbox for roadmap milestones.

---

## 🤝 Contributing

Contributions from students, self-taught engineers, and educators are warmly welcomed! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on submitting terms, fixing explanations, or proposing new roadmaps.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Free for students, educators, and anyone eager to learn.

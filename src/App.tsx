import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoadmapView } from './components/RoadmapView';
import { GlossaryView } from './components/GlossaryView';
import { QuizView } from './components/QuizView';
import { AcademicTerm, SkillRoadmap } from './types';

import rawTerms from '../data/terms.json';
import rawRoadmaps from '../data/roadmaps.json';

const terms = rawTerms as AcademicTerm[];
const roadmaps = rawRoadmaps as SkillRoadmap[];

export function App() {
  const [activeTab, setActiveTab] = useState<'roadmaps' | 'glossary' | 'quiz'>('roadmaps');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        <Hero
          onExploreRoadmaps={() => setActiveTab('roadmaps')}
          onExploreTerms={() => setActiveTab('glossary')}
          termsCount={terms.length}
          roadmapsCount={roadmaps.length}
        />

        <div className="py-6">
          {activeTab === 'roadmaps' && <RoadmapView roadmaps={roadmaps} />}
          {activeTab === 'glossary' && <GlossaryView terms={terms} />}
          {activeTab === 'quiz' && <QuizView terms={terms} />}
        </div>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <p className="text-slate-400 font-medium">
            OpenEdu Hub — An Open-Source Educational Initiative for Students Worldwide.
          </p>
          <p>
            Licensed under the{' '}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline"
            >
              MIT Open Source License
            </a>
            . Built for community contributions.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

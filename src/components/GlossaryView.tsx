import React, { useState, useMemo } from 'react';
import { AcademicTerm } from '../types';
import { Search, Sparkles, BookOpen, Lightbulb, BookmarkCheck, Tag, Filter } from 'lucide-react';

interface GlossaryViewProps {
  terms: AcademicTerm[];
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ terms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeCardTab, setActiveCardTab] = useState<Record<string, 'eli5' | 'analogy' | 'formal'>>({});
  const [masteredTerms, setMasteredTerms] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('openedu_mastered_terms');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const categories = useMemo(() => {
    const set = new Set(terms.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, [terms]);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const toggleMastered = (id: string) => {
    setMasteredTerms((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('openedu_mastered_terms', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const filteredTerms = useMemo(() => {
    return terms.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eli5.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formalDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [terms, searchTerm, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-indigo-400" />
            <span>Academic Terminology (ELI5 Hub)</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Bridging rigorous academic textbooks with intuitive, memorable explanations.
          </p>
        </div>

        <div className="text-sm text-slate-400">
          Showing <span className="text-white font-semibold">{filteredTerms.length}</span> of {terms.length} concepts
          {' • '}
          <span className="text-emerald-400 font-medium">{masteredTerms.length} Mastered</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 mb-8 space-y-4 backdrop-blur">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search concepts, algorithms, or keywords (e.g. attention, gradient, big-o)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center text-slate-400 gap-1.5 mr-1 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />

          <div className="flex items-center text-slate-400 gap-1.5 mr-1 font-medium">
            <span>Difficulty:</span>
          </div>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedDifficulty === diff
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-base">No academic concepts matched your filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="mt-3 text-indigo-400 hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item) => {
            const currentTab = activeCardTab[item.id] || 'eli5';
            const isMastered = masteredTerms.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-slate-800/40 border border-slate-700/60 hover:border-slate-600 rounded-2xl p-6 transition flex flex-col justify-between shadow-sm relative group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-700 text-indigo-300 font-medium">
                          {item.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                            item.difficulty === 'Beginner'
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                              : item.difficulty === 'Intermediate'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          }`}
                        >
                          {item.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{item.term}</h3>
                    </div>

                    <button
                      onClick={() => toggleMastered(item.id)}
                      title={isMastered ? 'Marked as mastered' : 'Mark as mastered'}
                      className={`p-2 rounded-xl transition ${
                        isMastered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <BookmarkCheck className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mode switcher tabs inside card */}
                  <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl mb-4 border border-slate-700/50 text-xs font-medium">
                    <button
                      onClick={() =>
                        setActiveCardTab((prev) => ({ ...prev, [item.id]: 'eli5' }))
                      }
                      className={`flex-1 py-1 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                        currentTab === 'eli5' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ELI5 (Simple)</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveCardTab((prev) => ({ ...prev, [item.id]: 'analogy' }))
                      }
                      className={`flex-1 py-1 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                        currentTab === 'analogy' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Analogy</span>
                    </button>
                    <button
                      onClick={() =>
                        setActiveCardTab((prev) => ({ ...prev, [item.id]: 'formal' }))
                      }
                      className={`flex-1 py-1 px-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                        currentTab === 'formal' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Academic</span>
                    </button>
                  </div>

                  {/* Card Content display */}
                  <div className="min-h-[110px] text-sm leading-relaxed mb-4">
                    {currentTab === 'eli5' && (
                      <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-3.5 text-indigo-100">
                        <span className="font-semibold text-indigo-300 block mb-1 text-xs uppercase tracking-wider">
                          Simple Breakdown:
                        </span>
                        {item.eli5}
                      </div>
                    )}

                    {currentTab === 'analogy' && (
                      <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3.5 text-amber-100">
                        <span className="font-semibold text-amber-300 block mb-1 text-xs uppercase tracking-wider">
                          Real-World Analogy:
                        </span>
                        {item.analogy}
                      </div>
                    )}

                    {currentTab === 'formal' && (
                      <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-3.5 text-slate-300 font-serif italic">
                        <span className="font-sans font-semibold text-slate-400 block mb-1 text-xs uppercase tracking-wider not-italic">
                          Formal Academic Definition:
                        </span>
                        "{item.formalDefinition}"
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 mb-3 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-indigo-400 font-medium">Why it matters: </span>
                    {item.keyTakeaway}
                  </div>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-700/40 text-slate-400 hover:text-slate-200 transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

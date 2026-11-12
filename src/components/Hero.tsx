import React from 'react';
import { Compass, BookOpenCheck } from 'lucide-react';

interface HeroProps {
  onExploreRoadmaps: () => void;
  onExploreTerms: () => void;
  termsCount: number;
  roadmapsCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreRoadmaps,
  onExploreTerms,
  termsCount,
  roadmapsCount,
}) => {
  return (
    <div className="relative overflow-hidden py-12 md:py-16 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Community Open Source Initiative</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Democratizing Higher Tech Education with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Roadmaps & ELI5 Terminology
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A centralized, open-source educational platform built for self-taught learners and university students.
          We break down complex academic definitions into intuitive analogies and clear learning trajectories.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreRoadmaps}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Roadmaps</span>
          </button>

          <button
            onClick={onExploreTerms}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition transform hover:-translate-y-0.5"
          >
            <BookOpenCheck className="w-5 h-5 text-indigo-400" />
            <span>Browse Simplified Terms</span>
          </button>
        </div>

        {/* Feature stats counter */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{roadmapsCount}</div>
            <div className="text-xs text-slate-400 mt-1">Curated Roadmaps</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{termsCount}</div>
            <div className="text-xs text-slate-400 mt-1">ELI5 Academic Terms</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-emerald-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">MIT Open Source</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 backdrop-blur-sm">
            <div className="text-2xl font-bold text-indigo-400">Community</div>
            <div className="text-xs text-slate-400 mt-1">Global & Local Reach</div>
          </div>
        </div>
      </div>
    </div>
  );
};

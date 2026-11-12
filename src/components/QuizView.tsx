import React, { useState } from 'react';
import { AcademicTerm } from '../types';
import { BrainCircuit, RotateCcw, Check, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  terms: AcademicTerm[];
}

export const QuizView: React.FC<QuizViewProps> = ({ terms }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentTerm = terms[currentIndex];

  const handleNext = (mastered: boolean) => {
    if (mastered) {
      setScore((prev) => prev + 1);
    }
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);

    if (currentIndex + 1 < terms.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setReviewedCount(0);
  };

  const isCompleted = reviewedCount >= terms.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
          <BrainCircuit className="w-7 h-7 text-indigo-400" />
          <span>Interactive Terminology Flashcards</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Active recall drill: read the concept and test if you can explain it in plain English.
        </p>
      </div>

      {isCompleted ? (
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-8 sm:p-12 text-center backdrop-blur">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Drill Session Complete!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
            You scored <span className="text-emerald-400 font-bold text-lg">{score}</span> out of{' '}
            <span className="font-bold text-lg">{terms.length}</span> terms. Consistent active recall is the fastest way to master technical concepts.
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-lg shadow-indigo-600/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again</span>
          </button>
        </div>
      ) : (
        <div>
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-2">
            <span>
              Card {currentIndex + 1} of {terms.length}
            </span>
            <span>
              Score: <strong className="text-emerald-400">{score}</strong> / {reviewedCount}
            </span>
          </div>

          {/* Flashcard Box */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-slate-800/60 hover:bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 sm:p-10 min-h-[320px] flex flex-col justify-between shadow-xl transition-all relative overflow-hidden backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-700 text-indigo-300 font-medium">
                {currentTerm.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                {isFlipped ? 'Click to show question' : 'Click to flip & reveal ELI5'}
              </span>
            </div>

            <div className="py-6 text-center">
              {!isFlipped ? (
                <div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    {currentTerm.term}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-lg mx-auto italic font-serif">
                    "{currentTerm.formalDefinition}"
                  </p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-indigo-400 font-medium bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>How would you explain this simply? Click to check</span>
                  </div>
                </div>
              ) : (
                <div className="text-left space-y-4 max-w-xl mx-auto">
                  <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 text-indigo-100 text-sm">
                    <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider block mb-1">
                      ELI5 (Simplified):
                    </span>
                    {currentTerm.eli5}
                  </div>

                  <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 text-amber-100 text-sm">
                    <span className="text-xs uppercase font-bold text-amber-300 tracking-wider block mb-1">
                      Analogy:
                    </span>
                    {currentTerm.analogy}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-slate-500">
              {currentTerm.difficulty} level concept
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => handleNext(false)}
              className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium text-sm transition flex items-center justify-center gap-2"
            >
              <span>Need Review</span>
            </button>

            <button
              onClick={() => handleNext(true)}
              className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Understood!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { SkillRoadmap } from '../types';
import { Map, Clock, CheckCircle2, Circle, Trophy, BookCheck } from 'lucide-react';

interface RoadmapViewProps {
  roadmaps: SkillRoadmap[];
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmaps }) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(roadmaps[0]?.id || '');
  const [completedSkills, setCompletedSkills] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('openedu_completed_skills');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  const toggleSkill = (skillName: string) => {
    setCompletedSkills((prev) => {
      const updated = prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName];
      try {
        localStorage.setItem('openedu_completed_skills', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Calculate progress for active roadmap
  const allSkillsInRoadmap = activeRoadmap.phases.flatMap((p) => p.skills);
  const completedCount = allSkillsInRoadmap.filter((s) => completedSkills.includes(s)).length;
  const progressPercent = allSkillsInRoadmap.length
    ? Math.round((completedCount / allSkillsInRoadmap.length) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Map className="w-7 h-7 text-indigo-400" />
          <span>Structured Skill Roadmaps</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Open-access learning trajectories engineered to navigate complex computer science and AI domains.
        </p>
      </div>

      {/* Roadmap selector buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {roadmaps.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRoadmapId(r.id)}
            className={`px-5 py-3 rounded-2xl font-medium text-sm transition flex items-center gap-2.5 border ${
              selectedRoadmapId === r.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
            }`}
          >
            <BookCheck className="w-4 h-4" />
            <span>{r.title}</span>
          </button>
        ))}
      </div>

      {/* Roadmap Header & Progress Card */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-6 sm:p-8 mb-10 backdrop-blur">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
              Target: {activeRoadmap.targetAudience}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">{activeRoadmap.title}</h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-5 min-w-[260px] flex flex-col justify-center">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Est. Duration: {activeRoadmap.estimatedWeeks} weeks
              </span>
              <span className="text-indigo-300 font-bold">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-2 text-right text-[11px] text-slate-400">
              {completedCount} of {allSkillsInRoadmap.length} milestones checked
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-slate-800 before:z-0">
        {activeRoadmap.phases.map((phase) => {
          const phaseSkillsCompleted = phase.skills.filter((s) => completedSkills.includes(s)).length;
          const isPhaseDone = phaseSkillsCompleted === phase.skills.length && phase.skills.length > 0;

          return (
            <div key={phase.phaseNumber} className="relative z-10 pl-14 sm:pl-20">
              {/* Step indicator node */}
              <div
                className={`absolute left-0 top-1 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-base sm:text-lg border transition-all ${
                  isPhaseDone
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-800 text-indigo-400 border-slate-700 shadow-sm'
                }`}
              >
                {isPhaseDone ? '✓' : `0${phase.phaseNumber}`}
              </div>

              {/* Phase Content Box */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 sm:p-7 hover:border-slate-600 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="text-xl font-bold text-white tracking-tight">{phase.name}</h4>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 w-fit">
                    {phaseSkillsCompleted} / {phase.skills.length} Completed
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-5 leading-relaxed">{phase.description}</p>

                {/* Skills Interactive List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {phase.skills.map((skill) => {
                    const isChecked = completedSkills.includes(skill);
                    return (
                      <div
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-sm cursor-pointer transition select-none ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                            : 'bg-slate-900/40 border-slate-700/40 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </div>
                        <span className={isChecked ? 'line-through text-slate-400' : ''}>{skill}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Hands-on Project Milestone */}
                <div className="bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3.5">
                  <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
                      Practical Capstone Milestone:
                    </span>
                    <span className="text-sm text-slate-200 mt-0.5 block">
                      {phase.projectMilestone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

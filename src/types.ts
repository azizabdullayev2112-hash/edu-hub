export interface AcademicTerm {
  id: string;
  term: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  formalDefinition: string;
  eli5: string;
  analogy: string;
  keyTakeaway: string;
  tags: string[];
}

export interface RoadmapPhase {
  phaseNumber: number;
  name: string;
  description: string;
  skills: string[];
  projectMilestone: string;
}

export interface SkillRoadmap {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  estimatedWeeks: number;
  phases: RoadmapPhase[];
}

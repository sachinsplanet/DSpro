export interface CareerRole {
  id: string;
  number: string;
  name: string;
  oneliner: string;
  description: string;
  keySkills: string[];
  typicalTools: string[];
}

export interface Industry {
  id: string;
  number: string;
  title: string;
  description: string;
  exampleUseCases: string[];
}

export interface FutureTrend {
  id: string;
  number: string;
  title: string;
  description: string;
  impactArea: string;
}

export interface SkillItem {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'technical' | 'soft';
}

export interface JourneyStage {
  step: string;
  phase: string;
  title: string;
  description: string;
  milestone: string;
}

export interface StudentInfo {
  name: string;
  classDivision: string;
  rollNo: string;
  subject: string;
}

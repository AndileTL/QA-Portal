// Define types for the QA Portal
export interface Agent {
  id: string;
  name: string;
  team: string;
  role: string;
  avatar: string;
}

export interface QAScore {
  id: string;
  agentId: string;
  date: string;
  overallScore: number;
  categories: {
    customerService: number;
    compliance: number;
    productKnowledge: number;
    communicationSkills: number;
  };
  evaluator: string;
  comments: string;
}

export interface MeritDemerit {
  id: string;
  agentId: string;
  date: string;
  type: 'merit' | 'demerit';
  points: number;
  reason: string;
  issuedBy: string;
}

export interface Comment {
  id: string;
  agentId: string;
  date: string;
  content: string;
  author: string;
  relatedTo?: {
    type: 'qa' | 'merit' | 'demerit';
    id: string;
  };
  responses?: {
    id: string;
    date: string;
    content: string;
    author: string;
  }[];
}

export interface Goal {
  id: string;
  agentId: string;
  title: string;
  description: string;
  targetScore: number;
  currentScore: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed' | 'missed';
}
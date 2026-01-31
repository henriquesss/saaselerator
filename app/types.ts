export interface BusinessCanvas {
  customerSegments: string;
  valuePropositions: string;
  channels: string;
  customerRelationships: string;
  revenueStreams: string;
  keyResources: string;
  keyActivities: string;
  keyPartnerships: string;
  costStructure: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
  completed: boolean;
  phase: 'planning' | 'development' | 'testing' | 'launch';
}

export interface InfrastructureCost {
  service: string;
  provider: string;
  monthlyCost: number;
  description: string;
  alternative?: string;
  alternativeCost?: number;
}

export interface Problem {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface Professional {
  role: string;
  description: string;
  estimatedCost: string;
  whenToHire: string;
  alternative: string;
}

export interface MVPPlan {
  summary: string;
  timelineWeeks: number;
  tasks: Task[];
  infrastructureCosts: InfrastructureCost[];
  totalMonthlyCost: number;
  problems: Problem[];
  professionals: Professional[];
}

export interface GeneratedPlan {
  businessCanvas: BusinessCanvas;
  mvpPlan: MVPPlan;
}

export type Step = 'input' | 'loading' | 'canvas' | 'mvp';

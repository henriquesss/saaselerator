import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const businessCanvasSchema = z.object({
  customerSegments: z.string().describe('Who are your most important customers? Be specific about demographics, behaviors, and needs.'),
  valuePropositions: z.string().describe('What unique value do you deliver? What problems do you solve?'),
  channels: z.string().describe('How do you reach your customers? What channels work best?'),
  customerRelationships: z.string().describe('What type of relationship does each customer segment expect?'),
  revenueStreams: z.string().describe('For what value are customers willing to pay? How would they prefer to pay?'),
  keyResources: z.string().describe('What key resources does your value proposition require?'),
  keyActivities: z.string().describe('What key activities does your value proposition require?'),
  keyPartnerships: z.string().describe('Who are your key partners and suppliers?'),
  costStructure: z.string().describe('What are the most important costs inherent to your business model?'),
});

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  estimatedHours: z.number(),
  completed: z.boolean(),
  phase: z.enum(['planning', 'development', 'testing', 'launch']),
});

const infrastructureCostSchema = z.object({
  service: z.string(),
  provider: z.string(),
  monthlyCost: z.number(),
  description: z.string(),
  alternative: z.string(),
  alternativeCost: z.number(),
});

const problemSchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.enum(['high', 'medium', 'low']),
  mitigation: z.string(),
});

const professionalSchema = z.object({
  role: z.string(),
  description: z.string(),
  estimatedCost: z.string(),
  whenToHire: z.string(),
  alternative: z.string(),
});

const mvpPlanSchema = z.object({
  summary: z.string().describe('A brief 2-3 sentence summary of the MVP approach'),
  timelineWeeks: z.number().describe('Estimated weeks to complete the MVP'),
  tasks: z.array(taskSchema).describe('Ordered list of tasks to complete the MVP'),
  infrastructureCosts: z.array(infrastructureCostSchema).describe('Infrastructure and cloud services needed'),
  totalMonthlyCost: z.number().describe('Total estimated monthly infrastructure cost'),
  problems: z.array(problemSchema).describe('Potential problems and challenges'),
  professionals: z.array(professionalSchema).describe('Professionals that might need to be hired'),
});

const generatedPlanSchema = z.object({
  businessCanvas: businessCanvasSchema,
  mvpPlan: mvpPlanSchema,
});

export async function POST(request: Request) {
  try {
    const { idea } = await request.json();

    if (!idea || typeof idea !== 'string') {
      return Response.json({ error: 'Please provide a valid SaaS idea' }, { status: 400 });
    }

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: generatedPlanSchema,
      prompt: `You are an expert startup advisor and technical architect. Analyze the following SaaS idea and generate a comprehensive business model canvas and MVP plan.

SaaS Idea: ${idea}

Generate a detailed and realistic plan with the following requirements:

BUSINESS CANVAS:
- Be specific and actionable for each section
- Focus on the SaaS business model
- Consider both B2B and B2C aspects if applicable
- Each field should be 2-4 sentences, practical and insightful

MVP PLAN:
- Create 10-15 specific, actionable tasks organized by phase
- Tasks should be ordered by dependency and priority
- Include realistic hour estimates
- Phases: planning, development, testing, launch

INFRASTRUCTURE COSTS:
- Focus on cost-effective, startup-friendly solutions
- Always suggest cheaper alternatives (free tiers, open source)
- Include: hosting, database, auth, monitoring, email, etc.
- Be realistic with pricing

PROBLEMS:
- Identify 4-6 realistic challenges
- Include technical, business, and market challenges
- Provide actionable mitigation strategies

PROFESSIONALS:
- Suggest 3-5 roles that might be needed
- Include when to hire (MVP, growth, scale phases)
- Suggest alternatives (freelancers, agencies, no-code tools)
- Be realistic about costs`,
    });

    return Response.json(object);
  } catch (error) {
    console.error('Generation error:', error);
    return Response.json(
      { error: 'Failed to generate plan. Please check your API key and try again.' },
      { status: 500 }
    );
  }
}

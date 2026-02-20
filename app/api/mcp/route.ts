import { NextResponse } from 'next/server';
import { getAllPlans, getLatestPlan, getPlan, updatePlan } from '../../lib/storage';
import type { Task } from '../../types';

// MCP-compatible JSON-RPC handler for Next.js
// This implements the MCP protocol over HTTP for stateless environments

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

// Tool definitions for MCP
const TOOLS = [
  {
    name: 'list_plans',
    description: 'List all saved SaaS plans from Sasselerator',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_latest_plan',
    description: 'Get the most recently created SaaS plan',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_plan',
    description: 'Get a specific SaaS plan by its ID',
    inputSchema: {
      type: 'object',
      properties: { planId: { type: 'string', description: 'The ID of the plan to retrieve' } },
      required: ['planId'],
    },
  },
  {
    name: 'get_mvp_tasks',
    description: 'Get MVP tasks from a plan, optionally filtered by phase or priority',
    inputSchema: {
      type: 'object',
      properties: {
        planId: { type: 'string', description: 'Plan ID (uses latest if not provided)' },
        phase: { type: 'string', enum: ['planning', 'development', 'testing', 'launch'] },
        priority: { type: 'string', enum: ['high', 'medium', 'low'] },
      },
      required: [],
    },
  },
  {
    name: 'get_business_canvas',
    description: 'Get the business canvas from a plan',
    inputSchema: {
      type: 'object',
      properties: { planId: { type: 'string', description: 'Plan ID (uses latest if not provided)' } },
      required: [],
    },
  },
  {
    name: 'get_infrastructure_costs',
    description: 'Get infrastructure cost estimates from a plan',
    inputSchema: {
      type: 'object',
      properties: { planId: { type: 'string', description: 'Plan ID (uses latest if not provided)' } },
      required: [],
    },
  },
  {
    name: 'get_problems',
    description: 'Get identified problems and risks from a plan',
    inputSchema: {
      type: 'object',
      properties: { planId: { type: 'string', description: 'Plan ID (uses latest if not provided)' } },
      required: [],
    },
  },
  {
    name: 'mark_task_complete',
    description: 'Mark a task as completed in a plan',
    inputSchema: {
      type: 'object',
      properties: {
        planId: { type: 'string', description: 'The plan ID' },
        taskId: { type: 'string', description: 'The task ID to mark as complete' },
      },
      required: ['planId', 'taskId'],
    },
  },
  {
    name: 'export_tasks_markdown',
    description: 'Export tasks as a markdown checklist',
    inputSchema: {
      type: 'object',
      properties: { planId: { type: 'string', description: 'Plan ID (uses latest if not provided)' } },
      required: [],
    },
  },
];

// Tool handlers
async function handleTool(name: string, args: Record<string, unknown>): Promise<{ content: Array<{ type: string; text: string }> }> {
  switch (name) {
    case 'list_plans': {
      const plans = await getAllPlans();
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(plans.map(p => ({
            id: p.id,
            idea: p.idea,
            createdAt: p.createdAt,
            taskCount: p.plan.mvpPlan.tasks.length,
          })), null, 2),
        }],
      };
    }

    case 'get_latest_plan': {
      const plan = await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plans found. Create a plan in Sasselerator first.' }] };
      }
      return { content: [{ type: 'text', text: JSON.stringify(plan, null, 2) }] };
    }

    case 'get_plan': {
      const planId = args.planId as string;
      const plan = await getPlan(planId);
      if (!plan) {
        return { content: [{ type: 'text', text: `Plan with ID "${planId}" not found.` }] };
      }
      return { content: [{ type: 'text', text: JSON.stringify(plan, null, 2) }] };
    }

    case 'get_mvp_tasks': {
      const planId = args.planId as string | undefined;
      const phase = args.phase as string | undefined;
      const priority = args.priority as string | undefined;
      
      const plan = planId ? await getPlan(planId) : await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plan found.' }] };
      }

      let tasks: Task[] = plan.plan.mvpPlan.tasks;
      if (phase) tasks = tasks.filter(t => t.phase === phase);
      if (priority) tasks = tasks.filter(t => t.priority === priority);

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            planId: plan.id,
            idea: plan.idea,
            totalTasks: plan.plan.mvpPlan.tasks.length,
            filteredTasks: tasks.length,
            tasks,
          }, null, 2),
        }],
      };
    }

    case 'get_business_canvas': {
      const planId = args.planId as string | undefined;
      const plan = planId ? await getPlan(planId) : await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plan found.' }] };
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            planId: plan.id,
            idea: plan.idea,
            businessCanvas: plan.plan.businessCanvas,
          }, null, 2),
        }],
      };
    }

    case 'get_infrastructure_costs': {
      const planId = args.planId as string | undefined;
      const plan = planId ? await getPlan(planId) : await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plan found.' }] };
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            planId: plan.id,
            idea: plan.idea,
            infrastructureCosts: plan.plan.mvpPlan.infrastructureCosts,
            totalMonthlyCost: plan.plan.mvpPlan.totalMonthlyCost,
          }, null, 2),
        }],
      };
    }

    case 'get_problems': {
      const planId = args.planId as string | undefined;
      const plan = planId ? await getPlan(planId) : await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plan found.' }] };
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            planId: plan.id,
            idea: plan.idea,
            problems: plan.plan.mvpPlan.problems,
          }, null, 2),
        }],
      };
    }

    case 'mark_task_complete': {
      const planId = args.planId as string;
      const taskId = args.taskId as string;
      
      const plan = await getPlan(planId);
      if (!plan) {
        return { content: [{ type: 'text', text: `Plan "${planId}" not found.` }] };
      }

      const task = plan.plan.mvpPlan.tasks.find(t => t.id === taskId);
      if (!task) {
        return { content: [{ type: 'text', text: `Task "${taskId}" not found in plan.` }] };
      }

      task.completed = true;
      await updatePlan(planId, plan.plan);

      return { content: [{ type: 'text', text: `Task "${task.title}" marked as complete.` }] };
    }

    case 'export_tasks_markdown': {
      const planId = args.planId as string | undefined;
      const plan = planId ? await getPlan(planId) : await getLatestPlan();
      if (!plan) {
        return { content: [{ type: 'text', text: 'No plan found.' }] };
      }

      const phases = ['planning', 'development', 'testing', 'launch'] as const;
      let markdown = `# MVP Tasks: ${plan.idea}\n\n`;
      markdown += `**Timeline:** ${plan.plan.mvpPlan.timelineWeeks} weeks\n\n`;
      markdown += `${plan.plan.mvpPlan.summary}\n\n`;

      for (const phase of phases) {
        const phaseTasks = plan.plan.mvpPlan.tasks.filter(t => t.phase === phase);
        if (phaseTasks.length === 0) continue;

        markdown += `## ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase\n\n`;
        for (const task of phaseTasks) {
          const checkbox = task.completed ? '[x]' : '[ ]';
          const priorityIcon = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
          markdown += `- ${checkbox} ${priorityIcon} **${task.title}** (~${task.estimatedHours}h)\n`;
          markdown += `  ${task.description}\n\n`;
        }
      }

      return { content: [{ type: 'text', text: markdown }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Handle JSON-RPC requests
async function handleJsonRpc(request: JsonRpcRequest): Promise<JsonRpcResponse> {
  const { id, method, params } = request;

  try {
    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'sasselerator', version: '1.0.0' },
          },
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: { tools: TOOLS },
        };

      case 'tools/call': {
        const toolName = (params as { name: string }).name;
        const toolArgs = (params as { arguments?: Record<string, unknown> }).arguments || {};
        const result = await handleTool(toolName, toolArgs);
        return {
          jsonrpc: '2.0',
          id,
          result,
        };
      }

      case 'notifications/initialized':
      case 'ping':
        return { jsonrpc: '2.0', id, result: {} };

      default:
        return {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        };
    }
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id,
      error: { code: -32603, message: error instanceof Error ? error.message : 'Internal error' },
    };
  }
}

// POST handler for MCP JSON-RPC
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = await Promise.all(body.map(handleJsonRpc));
      return NextResponse.json(responses);
    }
    
    // Handle single request
    const response = await handleJsonRpc(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error('MCP error:', error);
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32700, message: 'Parse error' },
        id: null,
      },
      { status: 400 }
    );
  }
}

// GET handler for server info/discovery
export async function GET() {
  return NextResponse.json({
    name: 'sasselerator',
    version: '1.0.0',
    description: 'MCP server for Sasselerator - SaaS planning tool',
    protocol: 'mcp',
    protocolVersion: '2024-11-05',
    capabilities: { tools: {} },
    tools: TOOLS.map(t => ({ name: t.name, description: t.description })),
  });
}

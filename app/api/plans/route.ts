import { NextRequest, NextResponse } from 'next/server';
import { savePlan, getAllPlans, updatePlan, getPlan, deletePlan } from '../../lib/storage';
import type { GeneratedPlan } from '../../types';

// GET: List all plans or get a specific plan
export async function GET(request: NextRequest) {
  try {
    const planId = request.nextUrl.searchParams.get('id');
    
    if (planId) {
      const plan = await getPlan(planId);
      if (!plan) {
        return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
      }
      return NextResponse.json(plan);
    }
    
    const plans = await getAllPlans();
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

// POST: Save a new plan
export async function POST(request: NextRequest) {
  try {
    const { idea, plan } = await request.json() as { idea: string; plan: GeneratedPlan };
    
    if (!idea || !plan) {
      return NextResponse.json(
        { error: 'Idea and plan are required' },
        { status: 400 }
      );
    }
    
    const storedPlan = await savePlan(idea, plan);
    return NextResponse.json(storedPlan, { status: 201 });
  } catch (error) {
    console.error('Error saving plan:', error);
    return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 });
  }
}

// PUT: Update an existing plan
export async function PUT(request: NextRequest) {
  try {
    const { id, plan } = await request.json() as { id: string; plan: GeneratedPlan };
    
    if (!id || !plan) {
      return NextResponse.json(
        { error: 'Plan ID and plan data are required' },
        { status: 400 }
      );
    }
    
    const updatedPlan = await updatePlan(id, plan);
    
    if (!updatedPlan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
  }
}

// DELETE: Delete a plan
export async function DELETE(request: NextRequest) {
  try {
    const planId = request.nextUrl.searchParams.get('id');
    
    if (!planId) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }
    
    const deleted = await deletePlan(planId);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
  }
}

import { supabase } from './supabase';
import type { GeneratedPlan, BusinessCanvas, MVPPlan } from '../types';

export interface StoredPlan {
  id: string;
  idea: string;
  plan: GeneratedPlan;
  createdAt: string;
  updatedAt: string;
}

interface PlanRow {
  id: string;
  idea: string;
  business_canvas: unknown;
  mvp_plan: unknown;
  created_at: string;
  updated_at: string;
}

function toStoredPlan(row: PlanRow): StoredPlan {
  return {
    id: row.id,
    idea: row.idea,
    plan: {
      businessCanvas: row.business_canvas as BusinessCanvas,
      mvpPlan: row.mvp_plan as MVPPlan,
    },
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export async function savePlan(idea: string, plan: GeneratedPlan): Promise<StoredPlan> {
  const { data, error } = await supabase
    .from('plans')
    .insert({
      idea,
      business_canvas: plan.businessCanvas,
      mvp_plan: plan.mvpPlan,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Failed to save plan');
  }
  return toStoredPlan(data as PlanRow);
}

export async function updatePlan(id: string, plan: GeneratedPlan): Promise<StoredPlan | null> {
  const { data, error } = await supabase
    .from('plans')
    .update({
      business_canvas: plan.businessCanvas,
      mvp_plan: plan.mvpPlan,
    })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    return null;
  }
  return toStoredPlan(data as PlanRow);
}

export async function getPlan(id: string): Promise<StoredPlan | null> {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }
  return toStoredPlan(data as PlanRow);
}

export async function getAllPlans(): Promise<StoredPlan[]> {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data) {
    return [];
  }
  return (data as PlanRow[]).map(toStoredPlan);
}

export async function getLatestPlan(): Promise<StoredPlan | null> {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }
  return toStoredPlan(data as PlanRow);
}

export async function deletePlan(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from('plans')
    .delete({ count: 'exact' })
    .eq('id', id);

  if (error || count === 0) {
    return false;
  }
  return true;
}

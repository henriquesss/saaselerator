'use client';

import { useState, useCallback } from 'react';
import { IdeaInput } from './components/IdeaInput';
import { ResultTabs } from './components/ResultTabs';
import { LoadingState } from './components/LoadingState';
import { mockPlan } from './mockData';
import type { GeneratedPlan, BusinessCanvas as BusinessCanvasType, MVPPlan as MVPPlanType, Step } from './types';

interface StoredPlanMeta {
  id: string;
  idea: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>('input');
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [planMeta, setPlanMeta] = useState<StoredPlanMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Save plan to storage
  const savePlanToStorage = useCallback(async (idea: string, planData: GeneratedPlan) => {
    try {
      const response = await fetch('/api/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, plan: planData }),
      });
      if (response.ok) {
        const stored = await response.json();
        setPlanMeta({ id: stored.id, idea: stored.idea });
        return stored.id;
      }
    } catch (err) {
      console.error('Failed to save plan:', err);
    }
    return null;
  }, []);

  // Update plan in storage
  const updatePlanInStorage = useCallback(async (planData: GeneratedPlan) => {
    if (!planMeta?.id) return;
    try {
      await fetch('/api/plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: planMeta.id, plan: planData }),
      });
    } catch (err) {
      console.error('Failed to update plan:', err);
    }
  }, [planMeta?.id]);

  const handleSubmit = async (idea: string) => {
    setStep('loading');
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate plan');
      }

      const data: GeneratedPlan = await response.json();
      setPlan(data);
      setStep('result');
      
      // Save to storage for MCP access
      await savePlanToStorage(idea, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('input');
    }
  };

  const handleCanvasUpdate = (canvas: BusinessCanvasType) => {
    if (plan) {
      const updatedPlan = { ...plan, businessCanvas: canvas };
      setPlan(updatedPlan);
      updatePlanInStorage(updatedPlan);
    }
  };

  const handleMVPUpdate = (mvpPlan: MVPPlanType) => {
    if (plan) {
      const updatedPlan = { ...plan, mvpPlan: mvpPlan };
      setPlan(updatedPlan);
      updatePlanInStorage(updatedPlan);
    }
  };

  const handleReset = () => {
    setStep('input');
    setPlan(null);
    setPlanMeta(null);
    setError(null);
  };

  const handleDemo = async () => {
    setPlan(mockPlan);
    setStep('result');
    // Save demo plan to storage too
    await savePlanToStorage('Demo: Task Management SaaS', mockPlan);
  };

  return (
    <main className="min-h-[100dvh]">
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm max-w-md text-center">
          {error}
        </div>
      )}

      {step === 'input' && (
        <IdeaInput onSubmit={handleSubmit} onDemo={handleDemo} isLoading={false} />
      )}

      {step === 'loading' && <LoadingState />}

      {step === 'result' && plan && (
        <ResultTabs
          plan={plan}
          onCanvasUpdate={handleCanvasUpdate}
          onMVPUpdate={handleMVPUpdate}
          onReset={handleReset}
        />
      )}
    </main>
  );
}

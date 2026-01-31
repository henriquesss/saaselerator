'use client';

import { useState } from 'react';
import { IdeaInput } from './components/IdeaInput';
import { BusinessCanvas } from './components/BusinessCanvas';
import { MVPPlan } from './components/MVPPlan';
import { LoadingState } from './components/LoadingState';
import { mockPlan } from './mockData';
import type { GeneratedPlan, BusinessCanvas as BusinessCanvasType, MVPPlan as MVPPlanType, Step } from './types';

export default function Home() {
  const [step, setStep] = useState<Step>('input');
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setStep('canvas');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('input');
    }
  };

  const handleCanvasUpdate = (canvas: BusinessCanvasType) => {
    if (plan) {
      setPlan({ ...plan, businessCanvas: canvas });
    }
  };

  const handleMVPUpdate = (mvpPlan: MVPPlanType) => {
    if (plan) {
      setPlan({ ...plan, mvpPlan: mvpPlan });
    }
  };

  const handleReset = () => {
    setStep('input');
    setPlan(null);
    setError(null);
  };

  const handleDemo = () => {
    setPlan(mockPlan);
    setStep('canvas');
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

      {step === 'canvas' && plan && (
        <BusinessCanvas
          canvas={plan.businessCanvas}
          onUpdate={handleCanvasUpdate}
          onNext={() => setStep('mvp')}
          onBack={handleReset}
        />
      )}

      {step === 'mvp' && plan && (
        <MVPPlan
          plan={plan.mvpPlan}
          onUpdate={handleMVPUpdate}
          onBack={() => setStep('canvas')}
        />
      )}
    </main>
  );
}

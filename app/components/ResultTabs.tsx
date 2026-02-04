'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, Rocket, ArrowLeft } from 'lucide-react';
import { BusinessCanvas } from './BusinessCanvas';
import { MVPPlan } from './MVPPlan';
import type { 
  GeneratedPlan, 
  BusinessCanvas as BusinessCanvasType, 
  MVPPlan as MVPPlanType 
} from '../types';

type TabId = 'canvas' | 'mvp';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'canvas', label: 'Business Canvas', icon: <Grid3X3 className="w-4 h-4" /> },
  { id: 'mvp', label: 'MVP Plan', icon: <Rocket className="w-4 h-4" /> },
];

interface ResultTabsProps {
  plan: GeneratedPlan;
  onCanvasUpdate: (canvas: BusinessCanvasType) => void;
  onMVPUpdate: (mvpPlan: MVPPlanType) => void;
  onReset: () => void;
}

export function ResultTabs({ plan, onCanvasUpdate, onMVPUpdate, onReset }: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('canvas');

  return (
    <div className="min-h-[100dvh] flex flex-col">
      {/* Header with tabs */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Start over
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${activeTab === tab.id 
                    ? 'text-accent' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-accent/10 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1">
        {activeTab === 'canvas' && (
          <BusinessCanvas
            canvas={plan.businessCanvas}
            onUpdate={onCanvasUpdate}
          />
        )}
        {activeTab === 'mvp' && (
          <MVPPlan
            plan={plan.mvpPlan}
            onUpdate={onMVPUpdate}
          />
        )}
      </div>
    </div>
  );
}

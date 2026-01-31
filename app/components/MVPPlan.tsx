'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Clock,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Server,
  Users2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Zap,
  Calendar,
  Shield,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import type { MVPPlan as MVPPlanType, Task, InfrastructureCost, Problem, Professional } from '../types';

interface MVPPlanProps {
  plan: MVPPlanType;
  onUpdate: (plan: MVPPlanType) => void;
  onBack: () => void;
}

type Phase = 'planning' | 'development' | 'testing' | 'launch';

const phaseConfig: Record<Phase, { label: string; color: string; bgColor: string }> = {
  planning: { label: 'Planning', color: 'text-violet-600 dark:text-violet-400', bgColor: 'bg-violet-500/10' },
  development: { label: 'Development', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500/10' },
  testing: { label: 'Testing', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-500/10' },
  launch: { label: 'Launch', color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-500/10' },
};

const priorityConfig = {
  high: { label: 'High', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-500/10' },
  medium: { label: 'Medium', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-500/10' },
  low: { label: 'Low', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10' },
};

const severityConfig = {
  high: { label: 'High Risk', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-500/10', icon: <AlertTriangle className="w-4 h-4" /> },
  medium: { label: 'Medium Risk', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-500/10', icon: <Shield className="w-4 h-4" /> },
  low: { label: 'Low Risk', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500/10', icon: <Lightbulb className="w-4 h-4" /> },
};

export function MVPPlan({ plan, onUpdate, onBack }: MVPPlanProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['tasks', 'infrastructure', 'problems', 'professionals']));

  const toggleSection = (section: string) => {
    const newSet = new Set(expandedSections);
    if (newSet.has(section)) {
      newSet.delete(section);
    } else {
      newSet.add(section);
    }
    setExpandedSections(newSet);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = plan.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdate({ ...plan, tasks: updatedTasks });
  };

  const completedTasks = plan.tasks.filter(t => t.completed).length;
  const totalTasks = plan.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalHours = plan.tasks.reduce((acc, t) => acc + t.estimatedHours, 0);

  const tasksByPhase = plan.tasks.reduce((acc, task) => {
    if (!acc[task.phase]) acc[task.phase] = [];
    acc[task.phase].push(task);
    return acc;
  }, {} as Record<Phase, Task[]>);

  return (
    <div className="min-h-[100dvh] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Canvas
          </button>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">MVP Development Plan</h1>
          <p className="text-muted-foreground">{plan.summary}</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Timeline"
            value={`${plan.timelineWeeks} weeks`}
            color="text-accent"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Total Hours"
            value={`${totalHours}h`}
            color="text-blue-500"
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="Progress"
            value={`${completedTasks}/${totalTasks}`}
            color="text-emerald-500"
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Monthly Cost"
            value={`$${plan.totalMonthlyCost}`}
            color="text-amber-500"
          />
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-accent rounded-full"
            />
          </div>
        </motion.div>

        {/* Tasks Section */}
        <Section
          title="Task Checklist"
          icon={<Zap className="w-5 h-5" />}
          expanded={expandedSections.has('tasks')}
          onToggle={() => toggleSection('tasks')}
          delay={0.2}
        >
          <div className="space-y-6">
            {(['planning', 'development', 'testing', 'launch'] as Phase[]).map((phase) => (
              tasksByPhase[phase] && tasksByPhase[phase].length > 0 && (
                <div key={phase}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${phaseConfig[phase].bgColor} ${phaseConfig[phase].color} text-sm font-medium mb-3`}>
                    {phaseConfig[phase].label}
                  </div>
                  <div className="space-y-2">
                    {tasksByPhase[phase].map((task, index) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => toggleTask(task.id)}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </Section>

        {/* Infrastructure Costs */}
        <Section
          title="Infrastructure & Costs"
          icon={<Server className="w-5 h-5" />}
          expanded={expandedSections.has('infrastructure')}
          onToggle={() => toggleSection('infrastructure')}
          delay={0.25}
        >
          <div className="space-y-3">
            {plan.infrastructureCosts.map((cost, index) => (
              <InfrastructureItem key={index} cost={cost} />
            ))}
            <div className="mt-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Monthly Total</span>
                <span className="text-xl font-semibold text-accent">${plan.totalMonthlyCost}/mo</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Potential Problems */}
        <Section
          title="Potential Challenges"
          icon={<AlertTriangle className="w-5 h-5" />}
          expanded={expandedSections.has('problems')}
          onToggle={() => toggleSection('problems')}
          delay={0.3}
        >
          <div className="space-y-3">
            {plan.problems.map((problem, index) => (
              <ProblemItem key={index} problem={problem} />
            ))}
          </div>
        </Section>

        {/* Professionals to Hire */}
        <Section
          title="Team & Hiring"
          icon={<Users2 className="w-5 h-5" />}
          expanded={expandedSections.has('professionals')}
          onToggle={() => toggleSection('professionals')}
          delay={0.35}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {plan.professionals.map((pro, index) => (
              <ProfessionalItem key={index} professional={pro} />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Section({ 
  title, 
  icon, 
  children, 
  expanded, 
  onToggle,
  delay 
}: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  expanded: boolean; 
  onToggle: () => void;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-6"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-accent">{icon}</div>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-x border-b border-border rounded-b-xl bg-card/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TaskItem({ task, onToggle, index }: { task: Task; onToggle: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`p-3 rounded-xl border transition-all ${
        task.completed 
          ? 'bg-muted/50 border-border opacity-60' 
          : 'bg-card border-border hover:border-accent/30'
      }`}
    >
      <div className="flex gap-3">
        <button
          onClick={onToggle}
          className={`mt-0.5 flex-shrink-0 transition-colors ${task.completed ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
        >
          {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color}`}>
              {priorityConfig[task.priority].label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{task.estimatedHours}h estimated</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfrastructureItem({ cost }: { cost: InfrastructureCost }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{cost.service}</h4>
          <p className="text-sm text-muted-foreground">{cost.provider}</p>
        </div>
        <div className="text-right">
          <div className="font-semibold">${cost.monthlyCost}/mo</div>
          {cost.alternative && cost.alternativeCost !== undefined && (
            <div className="text-xs text-emerald-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Alt: ${cost.alternativeCost}/mo
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{cost.description}</p>
      {cost.alternative && (
        <div className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
          <Lightbulb className="w-3 h-3" />
          Alternative: {cost.alternative}
        </div>
      )}
    </div>
  );
}

function ProblemItem({ problem }: { problem: Problem }) {
  const config = severityConfig[problem.severity];
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}>
          {config.icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-medium">{problem.title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${config.bgColor} ${config.color}`}>
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{problem.description}</p>
          <div className="text-sm">
            <span className="font-medium text-accent">Mitigation:</span>{' '}
            <span className="text-muted-foreground">{problem.mitigation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessionalItem({ professional }: { professional: Professional }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          <Users2 className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium mb-1">{professional.role}</h4>
          <p className="text-sm text-muted-foreground mb-3">{professional.description}</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Cost:</span>
              <span>{professional.estimatedCost}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">When:</span>
              <span>{professional.whenToHire}</span>
            </div>
          </div>
          <div className="mt-3 text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Alternative: {professional.alternative}
          </div>
        </div>
      </div>
    </div>
  );
}

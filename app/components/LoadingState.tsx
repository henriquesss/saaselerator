'use client';

import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, Target, Rocket, CheckCircle2 } from 'lucide-react';

const loadingSteps = [
  { icon: <Lightbulb className="w-5 h-5" />, text: 'Analyzing your idea...' },
  { icon: <Target className="w-5 h-5" />, text: 'Identifying target market...' },
  { icon: <Sparkles className="w-5 h-5" />, text: 'Generating business canvas...' },
  { icon: <Rocket className="w-5 h-5" />, text: 'Building MVP roadmap...' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Finalizing your plan...' },
];

export function LoadingState() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/10 mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-accent" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold mb-3"
        >
          Crafting Your Plan
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-10"
        >
          Our AI is working on your personalized business canvas and MVP roadmap
        </motion.p>

        {/* Loading Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.3 }}
              className="flex items-center gap-3 text-left"
            >
              <motion.div
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.9, 1, 0.9]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
                className="p-2 rounded-lg bg-accent/10 text-accent"
              >
                {step.icon}
              </motion.div>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
                className="text-muted-foreground"
              >
                {step.text}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10"
        >
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              className="h-full w-1/3 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

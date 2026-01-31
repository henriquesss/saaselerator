'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, ArrowRight } from 'lucide-react';

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  onDemo: () => void;
  isLoading: boolean;
}

export function IdeaInput({ onSubmit, onDemo, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea.trim());
    }
  };

  const examples = [
    "An AI-powered code review tool that integrates with GitHub",
    "A subscription box management platform for small businesses",
    "A real-time collaboration tool for remote design teams",
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6"
          >
            <Rocket className="w-8 h-8 text-accent" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          >
            {/* SaaS<span className="text-accent">selerator</span> */}
            Don't waste time with business stuff and focus on your <span className="text-accent">SAAS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-md mx-auto"
          >
            Get a business orientiation and be accelerated by SaaSselerator
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your SaaS idea in detail..."
              disabled={isLoading}
              className="w-full px-5 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none text-base md:text-lg disabled:opacity-50"
              rows={4}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {idea.length} / 1000
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!idea.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 rounded-xl bg-accent text-accent-foreground font-medium text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Generating your plan...
              </>
            ) : (
              <>
                Generate Business Canvas & MVP Plan
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Demo Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex justify-center"
        >
          <button
            type="button"
            onClick={onDemo}
            disabled={isLoading}
            className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4 transition-colors disabled:opacity-50"
          >
            Or try the demo with sample data →
          </button>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <p className="text-sm text-muted-foreground text-center mb-4">
            Need inspiration? Try one of these:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => setIdea(example)}
                disabled={isLoading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 hover:text-foreground transition-all disabled:opacity-50"
              >
                {example.slice(0, 40)}...
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

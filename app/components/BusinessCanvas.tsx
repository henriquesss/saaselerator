'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Gift, 
  Megaphone, 
  Heart, 
  DollarSign, 
  Boxes, 
  Cog, 
  Handshake, 
  PiggyBank,
  Pencil,
  Check
} from 'lucide-react';
import type { BusinessCanvas as BusinessCanvasType } from '../types';

interface BusinessCanvasProps {
  canvas: BusinessCanvasType;
  onUpdate: (canvas: BusinessCanvasType) => void;
}

type CanvasField = keyof BusinessCanvasType;

const canvasFields: { key: CanvasField; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'keyPartnerships', label: 'Key Partnerships', icon: <Handshake className="w-4 h-4" />, color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  { key: 'keyActivities', label: 'Key Activities', icon: <Cog className="w-4 h-4" />, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { key: 'keyResources', label: 'Key Resources', icon: <Boxes className="w-4 h-4" />, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
  { key: 'valuePropositions', label: 'Value Propositions', icon: <Gift className="w-4 h-4" />, color: 'bg-accent/10 text-accent' },
  { key: 'customerRelationships', label: 'Customer Relationships', icon: <Heart className="w-4 h-4" />, color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400' },
  { key: 'channels', label: 'Channels', icon: <Megaphone className="w-4 h-4" />, color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
  { key: 'customerSegments', label: 'Customer Segments', icon: <Users className="w-4 h-4" />, color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { key: 'costStructure', label: 'Cost Structure', icon: <PiggyBank className="w-4 h-4" />, color: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  { key: 'revenueStreams', label: 'Revenue Streams', icon: <DollarSign className="w-4 h-4" />, color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
];

export function BusinessCanvas({ canvas, onUpdate }: BusinessCanvasProps) {
  const [editingField, setEditingField] = useState<CanvasField | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (field: CanvasField) => {
    setEditingField(field);
    setEditValue(canvas[field]);
  };

  const saveEdit = () => {
    if (editingField) {
      onUpdate({ ...canvas, [editingField]: editValue });
      setEditingField(null);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Business Model Canvas</h1>
          <p className="text-muted-foreground">
            Review and edit your generated business model. Click any section to modify.
          </p>
        </motion.div>

        {/* Canvas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Row 1: Partners, Activities/Resources, Value Prop, Relationships/Channels, Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:row-span-2"
          >
            <CanvasCard
              field={canvasFields[0]}
              value={canvas.keyPartnerships}
              isEditing={editingField === 'keyPartnerships'}
              editValue={editValue}
              onEdit={() => startEditing('keyPartnerships')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <CanvasCard
              field={canvasFields[1]}
              value={canvas.keyActivities}
              isEditing={editingField === 'keyActivities'}
              editValue={editValue}
              onEdit={() => startEditing('keyActivities')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
            <CanvasCard
              field={canvasFields[2]}
              value={canvas.keyResources}
              isEditing={editingField === 'keyResources'}
              editValue={editValue}
              onEdit={() => startEditing('keyResources')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:row-span-2"
          >
            <CanvasCard
              field={canvasFields[3]}
              value={canvas.valuePropositions}
              isEditing={editingField === 'valuePropositions'}
              editValue={editValue}
              onEdit={() => startEditing('valuePropositions')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
              highlighted
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col gap-4"
          >
            <CanvasCard
              field={canvasFields[4]}
              value={canvas.customerRelationships}
              isEditing={editingField === 'customerRelationships'}
              editValue={editValue}
              onEdit={() => startEditing('customerRelationships')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
            <CanvasCard
              field={canvasFields[5]}
              value={canvas.channels}
              isEditing={editingField === 'channels'}
              editValue={editValue}
              onEdit={() => startEditing('channels')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:row-span-2"
          >
            <CanvasCard
              field={canvasFields[6]}
              value={canvas.customerSegments}
              isEditing={editingField === 'customerSegments'}
              editValue={editValue}
              onEdit={() => startEditing('customerSegments')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>

          {/* Row 2: Cost Structure and Revenue Streams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="md:col-span-1 lg:col-span-2"
          >
            <CanvasCard
              field={canvasFields[7]}
              value={canvas.costStructure}
              isEditing={editingField === 'costStructure'}
              editValue={editValue}
              onEdit={() => startEditing('costStructure')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 lg:col-span-2"
          >
            <CanvasCard
              field={canvasFields[8]}
              value={canvas.revenueStreams}
              isEditing={editingField === 'revenueStreams'}
              editValue={editValue}
              onEdit={() => startEditing('revenueStreams')}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onChange={setEditValue}
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

interface CanvasCardProps {
  field: { key: CanvasField; label: string; icon: React.ReactNode; color: string };
  value: string;
  isEditing: boolean;
  editValue: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  highlighted?: boolean;
}

function CanvasCard({ field, value, isEditing, editValue, onEdit, onSave, onCancel, onChange, highlighted }: CanvasCardProps) {
  return (
    <div className={`h-full p-4 rounded-2xl bg-card border transition-all ${highlighted ? 'border-accent/30 shadow-lg shadow-accent/5' : 'border-border'} ${isEditing ? 'ring-2 ring-accent' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${field.color}`}>
            {field.icon}
          </div>
          <h3 className="font-medium text-sm">{field.label}</h3>
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 rounded-lg bg-muted border border-border text-sm resize-none focus:outline-none focus:ring-1 focus:ring-accent"
            rows={4}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="flex-1 py-1.5 px-3 rounded-lg bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={onCancel}
              className="py-1.5 px-3 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
      )}
    </div>
  );
}

import React from 'react';

export const COLORS = {
  emerald: '#10B981',
  emeraldDark: '#059669',
  emeraldLight: '#D1FAE5',
  bgLight: '#F0FDF4',
};

export const TEMPLATES = [
  { 
    id: 'executive', 
    name: 'Executive', 
    description: 'Sophisticated design for senior leaders.', 
    bestFor: ['Management', 'Finance', 'Leadership'], 
    defaultColor: '#059669' 
  },
  { 
    id: 'modern_sidebar', 
    name: 'Modern Sidebar', 
    description: 'Contemporary layout with a focused sidebar.', 
    bestFor: ['Tech', 'Marketing', 'Startups'], 
    defaultColor: '#10b981' 
  },
  { 
    id: 'minimal_clean', 
    name: 'Minimal Clean', 
    description: 'Clean, spacious design that lets your experience speak.', 
    bestFor: ['Creative', 'Design', 'Media'], 
    defaultColor: '#059669' 
  },
  { 
    id: 'creative_bold', 
    name: 'Creative Bold', 
    description: 'Vibrant and eye-catching with gradients.', 
    bestFor: ['Design', 'Arts', 'Media'], 
    defaultColor: '#10b981' 
  },
  { 
    id: 'professional_classic', 
    name: 'Professional Classic', 
    description: 'Traditional serif design for corporate success.', 
    bestFor: ['Legal', 'Finance', 'Academic'], 
    defaultColor: '#111827' 
  },
  { 
    id: 'tech_developer', 
    name: 'Tech Developer', 
    description: 'Dark mode mono-spaced design for developers.', 
    bestFor: ['Software Eng', 'DevOps', 'Data Science'], 
    defaultColor: '#10b981' 
  }
];

export const COLOR_PRESETS = [
  { name: 'Ocean', primary: '#0ea5e9', secondary: '#06b6d4' },
  { name: 'Forest', primary: '#10b981', secondary: '#14b8a6' },
  { name: 'Sunset', primary: '#f59e0b', secondary: '#f97316' },
  { name: 'Berry', primary: '#8b5cf6', secondary: '#a855f7' },
  { name: 'Rose', primary: '#ec4899', secondary: '#f43f5e' },
  { name: 'Navy', primary: '#1e40af', secondary: '#3b82f6' },
  { name: 'Slate', primary: '#475569', secondary: '#64748b' },
  { name: 'Emerald', primary: '#059669', secondary: '#10b981' },
];

export const ACCENT_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Black', value: '#111827' }
];

export const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  'Technology': ['JavaScript', 'React', 'Node.js', 'AWS', 'Agile', 'CI/CD', 'Docker', 'Kubernetes', 'Python', 'SQL'],
  'Finance': ['Financial Modeling', 'Risk Management', 'Asset Allocation', 'GAAP', 'CFA', 'Excel', 'Trading', 'Forecasting'],
  'Healthcare': ['Patient Care', 'Clinical Research', 'HIPAA', 'EMR', 'Nursing', 'Diagnostics', 'Medical Ethics'],
  'Marketing': ['SEO', 'Content Strategy', 'Social Media', 'Analytics', 'Brand Management', 'PPC', 'CRM', 'Copywriting'],
  'Education': ['Curriculum Design', 'Lesson Planning', 'Student Engagement', 'STEM', 'Special Education', 'Assessment'],
};

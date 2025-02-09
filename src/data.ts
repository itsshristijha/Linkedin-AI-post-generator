import { Template, AITool } from './types';

export const templates: Template[] = [
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    prompt: 'Create a professional LinkedIn post about',
  },
  {
    id: 'carousel',
    name: 'Carousel Post',
    prompt: 'Create a carousel post with multiple slides about',
  },
  {
    id: 'article',
    name: 'Article',
    prompt: 'Write a detailed LinkedIn article about',
  },
  {
    id: 'poll',
    name: 'Poll',
    prompt: 'Create an engaging poll about',
  },
];

export const aiTools: AITool[] = [
  {
    id: 'hook',
    name: 'Generate Hook',
    emoji: '🎯',
    prompt: 'Write an attention-grabbing hook for',
  },
  {
    id: 'ideas',
    name: 'Generate Ideas',
    emoji: '💡',
    prompt: 'Generate content ideas about',
  },
  {
    id: 'improve',
    name: 'Improve Writing',
    emoji: '✨',
    prompt: 'Improve the following content:',
  },
  {
    id: 'rephrase',
    name: 'Rephrase',
    emoji: '🔄',
    prompt: 'Rephrase the following content:',
  },
];

export const unsplashImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];
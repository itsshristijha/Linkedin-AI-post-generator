export interface Post {
  id: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: Date;
  scheduledFor?: Date;
  images?: string[];
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
}

export interface AITool {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}
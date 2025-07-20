// Legacy blog type - use types/index.ts for new implementations
export interface BlogType {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
}

// Re-export from main types
export type { BlogPost } from '../types';

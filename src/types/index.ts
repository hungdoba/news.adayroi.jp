// Global type definitions
export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  content?: string;
  readingTime?: number;
  tags?: string[];
  author?: string;
  featured?: boolean;
}

export interface LinkType {
  id: string;
  text: string;
  level?: number;
}

export interface PostCardProps {
  title: string;
  slug: string;
  description: string;
  createdAt: string;
  priority?: boolean;
}

export interface ShareProps {
  url: string;
  title?: string;
}

export interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export interface OnThisPageProps {
  htmlContent: string;
  className?: string;
}

export interface DatePaginationProps {
  currentDate?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Metadata types
export interface PageMetadata {
  title: string;
  description: string;
  url?: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType;
  disabled?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

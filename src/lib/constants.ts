// Application constants
export const APP_CONFIG = {
  name: 'News Adayroi',
  description: 'Tin tức cập nhật dành cho người Việt Nam tại Nhật Bản',
  url: 'https://news.hungba.net',
  locale: 'vi_VN',
  timezone: 'Asia/Tokyo',
  author: 'Adayroi Team',
  email: 'contact@hungba.net',
} as const;

export const SOCIAL_LINKS = {
  twitter: '@adayroi',
  facebook: 'https://facebook.com/adayroi',
  github: 'https://github.com/hungdoba',
} as const;

export const SEO_CONFIG = {
  defaultTitle: 'News - Adayroi',
  titleTemplate: '%s | News - Adayroi',
  defaultDescription: APP_CONFIG.description,
  siteUrl: APP_CONFIG.url,
  image: '/images/thubnails/logo/logo.png',
  twitterUsername: SOCIAL_LINKS.twitter,
  keywords: [
    'tin tức',
    'vietnamese',
    'japan',
    'nhật bản',
    'người việt',
    'cộng đồng',
    'news',
    'community',
  ],
} as const;

export const ROUTES = {
  home: '/',
  about: '/about-us',
  contact: '/contact',
  terms: '/terms',
  post: (slug: string) => `/post/${slug}`,
  date: (date: string) => `/${date}`,
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
} as const;

export const CONTENT_CONFIG = {
  postsPerPage: 10,
  excerptLength: 150,
  dateFormat: 'dd/MM/yyyy',
  contentDir: 'content',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

# Project Architecture

## Overview

News Adayroi is a modern, static news website built with Next.js 15, designed specifically for the Vietnamese community in Japan. The architecture focuses on performance, SEO, and maintainability.

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.x
- **UI Components**: shadcn/ui + Radix UI
- **Content**: Markdown with gray-matter
- **Deployment**: Static Site Generation (SSG)

### Development Tools
- **Package Manager**: pnpm (recommended)
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript strict mode
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── post/[slug]/       # Dynamic post pages
│   ├── [date]/            # Date-based navigation
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── PostCard.tsx      # Article cards
│   ├── Navbar.tsx        # Navigation
│   └── ...
├── lib/                   # Utility functions
│   ├── utils.ts          # General utilities
│   ├── post.ts           # Content management
│   ├── constants.ts      # App constants
│   └── errors.ts         # Error handling
├── types/                # TypeScript definitions
│   └── index.ts          # Global types
└── ...

content/                   # Markdown content
├── article-1.md
├── article-2.md
└── ...

public/                   # Static assets
├── images/
│   └── optimize/        # Optimized images
└── ...
```

## Key Features

### Performance
- Static Site Generation (SSG)
- Image optimization with next-image-export-optimizer
- Code splitting and lazy loading
- Tailwind CSS optimization

### SEO
- Dynamic metadata generation
- Open Graph and Twitter cards
- Structured data
- Sitemap and robots.txt
- Semantic HTML

### Content Management
- Markdown-based content
- Front matter metadata
- Automatic post discovery
- Date-based navigation
- Search functionality

### Developer Experience
- TypeScript strict mode
- ESLint and Prettier
- Git hooks for quality
- Hot reload in development
- Comprehensive error handling

## Data Flow

1. **Content Loading**: Markdown files are read from the `content/` directory
2. **Processing**: gray-matter extracts frontmatter and content
3. **Caching**: Posts are cached in memory with TTL
4. **Rendering**: Next.js generates static pages at build time
5. **Optimization**: Images and assets are optimized during build

## Deployment Strategy

### Static Export
The site uses Next.js static export for optimal performance:
- No server required
- CDN-friendly
- Fast loading times
- High availability

### CI/CD Pipeline
1. Code push triggers GitHub Actions
2. Linting and type checking
3. Build process with optimizations
4. Deploy to GitHub Pages
5. Custom domain support

## Performance Optimizations

### Build Time
- Efficient content caching
- Parallel processing where possible
- Image optimization pipeline

### Runtime
- Static generation eliminates server requests
- Optimized bundle sizes
- Progressive enhancement
- Responsive images

## Security Considerations

- No server-side vulnerabilities (static site)
- Content Security Policy headers
- HTTPS enforcement
- Input validation for search
- Safe markdown rendering

## Monitoring and Analytics

- Google Analytics integration
- Core Web Vitals tracking
- Error boundary implementation
- Performance monitoring

## Scalability

### Content Growth
- Efficient file-based content management
- Paginated post lists
- Optimized build process for large content volumes

### Traffic Growth
- CDN distribution
- Static file caching
- Minimal server requirements

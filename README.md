# News Adayroi 📰

A modern, responsive news website built for Vietnamese people living in Japan. Stay updated with the latest news, culture, and community information.

![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌐 **Bilingual Support**: Vietnamese content for Japanese residents
- 📱 **Responsive Design**: Optimized for all devices
- 🌙 **Dark/Light Mode**: User preference themes
- ⚡ **Fast Performance**: Static site generation with Next.js
- 🖼️ **Image Optimization**: Automated image processing
- 🔍 **SEO Optimized**: Enhanced search engine visibility
- 📊 **Analytics Ready**: Google Analytics integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/hungdoba/news.hungba.net.git
cd news.hungba.net

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Build and export static files
pnpm build

# Start production server (if not using static export)
pnpm start
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable UI components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── content/                # Markdown content files
├── public/                 # Static assets
└── docs/                  # Project documentation
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.0
- **UI Components**: shadcn/ui + Radix UI
- **Content**: Markdown with gray-matter
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Roboto Mono)
- **Analytics**: Google Analytics

## 📝 Content Management

Add new articles by creating `.md` files in the `content/` directory:

```markdown
---
title: 'Your Article Title'
description: 'Brief description'
created_at: '2025-01-20'
---

Your content here...
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vietnamese community in Japan
- Next.js team for the amazing framework
- shadcn for the beautiful UI components

---

Built with ❤️ for the Vietnamese community in Japan

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Deployment Steps

1. **Connect to Vercel**:

   ```bash
   # Install Vercel CLI
   pnpm add -g vercel

   # Deploy to Vercel
   vercel
   ```

2. **Environment Variables**: Set up your environment variables in Vercel dashboard

3. **Custom Domain**: Configure your custom domain in Vercel settings

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Contributing to News Adayroi

First off, thank you for considering contributing to News Adayroi! It's people like you that help make this a great resource for the Vietnamese community in Japan.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a branch for your changes
4. Make your changes
5. Test your changes
6. Submit a pull request

## 🔧 Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or pnpm (pnpm recommended)
- Git

### Setup Steps

```bash
# Clone your fork
git clone https://github.com/hungdoba/news.hungba.net.git
cd news.hungba.net

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

## 📝 How to Contribute

### Reporting Bugs

When filing an issue, make sure to answer these questions:

1. What version of Node.js and npm/pnpm are you using?
2. What operating system are you using?
3. What did you do?
4. What did you expect to see?
5. What did you see instead?

### Suggesting Enhancements

We welcome suggestions for improvements! Please:

1. Check if the enhancement has already been suggested
2. Provide a clear description of the feature
3. Explain why this enhancement would be useful

### Content Contributions

To add new articles:

1. Create a new `.md` file in the `content/` directory
2. Follow the frontmatter format:

   ```markdown
   ---
   title: 'Your Article Title'
   description: 'Brief description'
   created_at: '2025-01-20'
   author: 'Your Name'
   tags: ['tag1', 'tag2']
   ---

   Your content here...
   ```

## 🔄 Pull Request Process

1. **Update Documentation**: Update the README.md with details of changes if needed
2. **Follow Style Guidelines**: Ensure your code follows our style guidelines
3. **Test Your Changes**: Run the test suite and ensure all tests pass
4. **Commit Message Format**: Use clear and descriptive commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:

```
feat(post): add reading time calculation
fix(navbar): resolve mobile menu toggle issue
docs(readme): update installation instructions
```

## 🎨 Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public functions
- Use proper error handling

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use semantic HTML elements
- Ensure accessibility compliance

### File Organization

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable components
│   └── ui/       # UI components (shadcn/ui)
├── lib/          # Utility functions
├── types/        # TypeScript type definitions
└── ...
```

## 🧪 Testing

Before submitting a pull request:

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Format checking
pnpm format:check

# Build test
pnpm build
```

## 📞 Getting Help

If you need help:

1. Check the documentation
2. Search existing issues
3. Create a new issue with your question
4. Join our community discussions

## 🏆 Recognition

Contributors will be recognized in our README.md file and release notes.

Thank you for contributing! 🎉

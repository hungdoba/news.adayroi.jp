# Test Documentation

## Testing Strategy for News Adayroi

This document outlines our comprehensive testing approach, best practices, and guidelines for maintaining high-quality code through effective testing.

### Quick Start

```bash
# Run all tests
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Generate coverage report
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci

# Run specific test file
pnpm test -- PostCard.test.tsx

# Run tests matching a pattern
pnpm test -- --testNamePattern="should render"
```

### Test Architecture

```
src/
├── __tests__/
│   ├── components/           # Component tests
│   │   ├── PostCard.test.tsx
│   │   ├── SearchBar.test.tsx
│   │   ├── MaxWidthWrapper.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── Navbar.test.tsx
│   ├── lib/                  # Utility tests
│   │   ├── utils.test.ts
│   │   ├── post.test.ts
│   │   ├── constants.test.ts
│   │   └── errors.test.ts
│   ├── app/                  # Page tests
│   │   └── page.test.tsx
│   ├── integration/          # Integration tests
│   │   └── integration.test.tsx
│   └── __mocks__/           # Test mocks
│       └── next-image-export-optimizer.ts
├── components/
├── lib/
└── app/
```

### Testing Pyramid

We follow the testing pyramid principle:

1. **Unit Tests (70%)** - Fast, isolated, focused
   - Individual functions
   - Component logic
   - Utility functions
   - Error handling

2. **Integration Tests (20%)** - Component interactions
   - Component composition
   - Data flow between components
   - API integration points

3. **End-to-End Tests (10%)** - Full user workflows
   - Critical user journeys
   - Cross-browser compatibility
   - Performance validation

### Test Categories & Best Practices

#### 1. Unit Tests

**Purpose**: Test individual functions and components in isolation

**Best Practices**:

- Test one thing at a time
- Use descriptive test names that explain the expected behavior
- Follow Arrange-Act-Assert (AAA) pattern
- Mock external dependencies
- Test edge cases and error conditions

**Example**:

```typescript
describe('formatDate', () => {
  it('should format ISO date string to Vietnamese locale by default', () => {
    // Arrange
    const isoDate = '2023-12-25T10:30:00Z';

    // Act
    const result = formatDate(isoDate);

    // Assert
    expect(result).toContain('2023');
    expect(result).toContain('25');
  });

  it('should handle invalid dates gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    expect(formatDate('invalid-date')).toBe('');

    consoleSpy.mockRestore();
  });
});
```

#### 2. Component Tests

**Purpose**: Test React component behavior, props, and user interactions

**Best Practices**:

- Test component output, not implementation details
- Use user-centric queries (getByRole, getByText)
- Test user interactions with fireEvent or userEvent
- Mock child components when necessary
- Test accessibility attributes

**Example**:

```typescript
describe('PostCard', () => {
  const mockPost = {
    title: 'Test Post',
    slug: 'test-post',
    description: 'Test description',
    createdAt: '2023-12-25T10:30:00Z',
  };

  it('should render post information correctly', () => {
    render(<PostCard {...mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.description)).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('should navigate to post page when clicked', async () => {
    const user = userEvent.setup();
    render(<PostCard {...mockPost} />);

    const link = screen.getByRole('link', { name: mockPost.title });
    await user.click(link);

    expect(link).toHaveAttribute('href', `/post/${mockPost.slug}`);
  });
});
```

#### 3. Integration Tests

**Purpose**: Test how components work together

**Best Practices**:

- Test realistic user scenarios
- Use minimal mocking
- Focus on data flow between components
- Test error boundaries and loading states

**Example**:

```typescript
describe('Post List Integration', () => {
  it('should display posts and handle search', async () => {
    const user = userEvent.setup();
    render(<PostListPage />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getByText('Sample Post')).toBeInTheDocument();
    });

    // Test search functionality
    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'sample');

    expect(screen.getByText('Sample Post')).toBeInTheDocument();
  });
});
```

### Mocking Best Practices

#### Next.js Specific Mocks

```typescript
// jest.setup.ts - Global mocks for Next.js components
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

jest.mock('next-image-export-optimizer', () => {
  const MockedImage = ({
    src,
    alt,
    priority,
    unoptimized,
    fill,
    ...props
  }: any) => {
    const { className, style, width, height } = props;
    const imgProps: any = { src, alt };

    if (className) imgProps.className = className;
    if (fill) {
      imgProps.style = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      };
    }

    return React.createElement('img', imgProps);
  };
  return MockedImage;
});
```

#### Component-Level Mocking

```typescript
// Mock child components for focused testing
jest.mock('@/components/PostCard', () => {
  return function MockPostCard({ title }: { title: string }) {
    return <div data-testid="mock-post-card">{title}</div>;
  };
});

// Mock API calls
jest.mock('@/lib/api', () => ({
  fetchPosts: jest.fn().mockResolvedValue([
    { id: 1, title: 'Test Post', slug: 'test-post' }
  ]),
}));
```

#### Mocking Guidelines

- **Mock at the boundaries**: Mock external dependencies, not internal logic
- **Use realistic mock data**: Mirror actual API responses
- **Clean up mocks**: Restore mocks after each test
- **Mock time-dependent functions**: Use `jest.useFakeTimers()` for date/time testing

### Coverage Standards & Quality Metrics

#### Coverage Targets

- **Functions**: > 80%
- **Statements**: > 80%
- **Branches**: > 75%
- **Lines**: > 80%

#### Quality Indicators

- **Test Reliability**: Tests should pass consistently
- **Test Speed**: Unit tests < 100ms, Integration tests < 1s
- **Maintainability**: Tests should be easy to read and modify
- **Coverage Quality**: Focus on meaningful coverage, not just percentages

#### Coverage Analysis

```bash
# Generate detailed coverage report
pnpm test:coverage

# View coverage in browser
open coverage/lcov-report/index.html

# Check specific file coverage
pnpm test:coverage -- --collectCoverageFrom="src/lib/utils.ts"
```

#### What NOT to Test

- Third-party library internals
- Next.js framework code
- Trivial getters/setters
- Configuration files
- Type definitions only

### Test Writing Guidelines

#### 1. Test Naming Conventions

```typescript
// ✅ Good: Descriptive and specific
describe('PostCard component', () => {
  it('should display post title and description when rendered', () => {});
  it('should navigate to post detail page when title is clicked', () => {});
  it('should show loading state while image is loading', () => {});
});

// ❌ Bad: Vague and unhelpful
describe('PostCard', () => {
  it('works', () => {});
  it('renders stuff', () => {});
});
```

#### 2. Test Structure (AAA Pattern)

```typescript
it('should format date correctly', () => {
  // Arrange - Set up test data
  const inputDate = '2023-12-25T10:30:00Z';
  const expectedFormat = /25.*12.*2023/;

  // Act - Execute the function
  const result = formatDate(inputDate);

  // Assert - Verify the outcome
  expect(result).toMatch(expectedFormat);
});
```

#### 3. Testing Async Code

```typescript
// ✅ Using async/await
it('should fetch posts successfully', async () => {
  const posts = await fetchPosts();
  expect(posts).toHaveLength(5);
});

// ✅ Using waitFor for UI updates
it('should show loading spinner then content', async () => {
  render(<PostList />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Post Title')).toBeInTheDocument();
  });
});
```

#### 4. Error Testing

```typescript
it('should handle network errors gracefully', async () => {
  // Mock console.error to avoid noise in test output
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  // Mock the API to throw an error
  jest.mocked(fetchPosts).mockRejectedValue(new Error('Network error'));

  render(<PostList />);

  await waitFor(() => {
    expect(screen.getByText('Failed to load posts')).toBeInTheDocument();
  });

  consoleSpy.mockRestore();
});
```

#### 5. Accessibility Testing

```typescript
it('should have proper accessibility attributes', () => {
  render(<PostCard {...mockPost} />);

  // Test semantic HTML
  expect(screen.getByRole('article')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();

  // Test alt text for images
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('alt', mockPost.title);

  // Test keyboard navigation
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', `/post/${mockPost.slug}`);
});
```

### Continuous Integration & Automation

#### GitHub Actions Workflow

Tests run automatically on:

- **Pull Requests**: All tests must pass before merge
- **Main Branch**: Ensure main branch stability
- **Multiple Node Versions**: Test compatibility (18.x, 20.x)

#### Pre-commit Hooks

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:ci"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["npm run lint:fix", "npm run test:related"]
  }
}
```

#### Coverage Reporting

- **Codecov Integration**: Automatic coverage tracking
- **PR Comments**: Coverage diff in pull requests
- **Coverage Badges**: Visual coverage indicators
- **Trend Analysis**: Monitor coverage over time

### Development Workflow & TDD

#### Test-Driven Development (TDD) Process

1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make it pass
3. **Refactor**: Improve code while keeping tests green

```typescript
// Step 1: Write failing test
describe('calculateReadingTime', () => {
  it('should calculate reading time for average text', () => {
    const text = 'Lorem ipsum...'; // 250 words
    expect(calculateReadingTime(text)).toBe(1); // 1 minute
  });
});

// Step 2: Implement function
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
}

// Step 3: Refactor and add edge cases
```

#### Feature Development Workflow

1. **Plan**: Define acceptance criteria
2. **Test**: Write tests based on requirements
3. **Implement**: Code to satisfy tests
4. **Review**: Code review including test quality
5. **Deploy**: Confident deployment with test coverage

#### Testing Checklist

- [ ] Unit tests for new functions
- [ ] Component tests for UI changes
- [ ] Integration tests for feature flows
- [ ] Error handling and edge cases
- [ ] Accessibility requirements
- [ ] Performance implications
- [ ] Mobile responsiveness (if applicable)

### Debugging & Troubleshooting

#### Common Issues

**1. Tests Timing Out**

```typescript
// ❌ Common mistake
it('should load data', () => {
  render(<Component />);
  expect(screen.getByText('Data loaded')).toBeInTheDocument(); // Fails immediately
});

// ✅ Correct approach
it('should load data', async () => {
  render(<Component />);
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

**2. Console Warnings in Tests**

```typescript
// Suppress expected warnings
const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
// ... test code ...
consoleSpy.mockRestore();
```

**3. Memory Leaks**

```typescript
afterEach(() => {
  jest.clearAllMocks();
  cleanup(); // From @testing-library/react
});
```

#### Debug Mode

```bash
# Run tests in debug mode
pnpm test -- --verbose --no-cache

# Run specific test file with debugging
node --inspect-brk node_modules/.bin/jest --runInBand PostCard.test.tsx
```

### Performance Testing

#### Testing Performance Metrics

```typescript
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';

it('should render within performance budget', () => {
  const start = performance.now();
  render(<LargeComponent />);
  const end = performance.now();

  expect(end - start).toBeLessThan(100); // 100ms budget
});
```

#### Memory Usage Testing

```typescript
it('should not create memory leaks', () => {
  const { unmount } = render(<Component />);
  const initialMemory = process.memoryUsage().heapUsed;

  unmount();

  global.gc?.(); // Force garbage collection if available
  const afterMemory = process.memoryUsage().heapUsed;

  expect(afterMemory - initialMemory).toBeLessThan(1024 * 1024); // 1MB
});
```

### Resources & References

#### Essential Libraries

- **Jest**: Test framework and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom Jest matchers

#### Useful Queries

```typescript
// By Role (Preferred)
screen.getByRole('button', { name: 'Submit' });
screen.getByRole('textbox', { name: 'Email' });

// By Label
screen.getByLabelText('Password');

// By Text
screen.getByText('Welcome');

// By Test ID (Last resort)
screen.getByTestId('custom-element');
```

#### Documentation Links

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://web.dev/accessibility-testing/)

---

**Remember**: Good tests are like good documentation - they should clearly express intent and be maintainable over time.

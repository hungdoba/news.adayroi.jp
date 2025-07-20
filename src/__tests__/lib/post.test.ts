import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  getAllPosts,
  getPostsOnDay,
  getPostBySlug,
  clearPostsCache,
} from '@/lib/post';
import { toDateString } from '@/lib/utils';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');

// Mock utils module
jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  todayJST: () => new Date('2023-12-25T10:00:00Z'),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedMatter = matter as jest.MockedFunction<typeof matter>;

// Mock process.cwd() to return a predictable value
const originalCwd = process.cwd;
beforeAll(() => {
  process.cwd = jest.fn().mockReturnValue('/mock/project');
});

afterAll(() => {
  process.cwd = originalCwd;
});

describe('Post Utils', () => {
  const mockContentDir = '/mock/content';

  beforeEach(() => {
    jest.clearAllMocks();
    clearPostsCache();

    // Setup default mocks
    mockedPath.join.mockImplementation((...args) => {
      if (args.includes('content')) {
        return '/mock/project/content';
      }
      return args.join('/');
    });
    mockedFs.existsSync.mockReturnValue(true);
  });

  describe('getAllPosts', () => {
    it('should return empty array when content directory does not exist', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      mockedFs.existsSync.mockReturnValue(false);

      const posts = getAllPosts();
      expect(posts).toEqual([]);

      // Restore console.error
      console.error = originalError;
    });

    it('should filter and return valid posts', () => {
      const mockFiles = ['post1.md', 'post2.md', 'template.md', 'other.txt'];
      const mockPost1Content = 'content1';
      const mockPost2Content = 'content2';

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(mockFiles as any);
      mockedFs.readFileSync
        .mockReturnValueOnce(mockPost1Content)
        .mockReturnValueOnce(mockPost2Content);

      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: 'Post 1',
            description: 'Description 1',
            created_at: '2023-12-25T10:00:00Z',
          },
          content: 'content1',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Post 2',
            description: 'Description 2',
            created_at: '2023-12-24T10:00:00Z',
          },
          content: 'content2',
        } as any);

      const posts = getAllPosts();

      expect(posts).toHaveLength(2);
      expect(posts[0].title).toBe('Post 1');
      expect(posts[0].slug).toBe('post1');
      expect(posts[1].title).toBe('Post 2');
      expect(posts[1].slug).toBe('post2');

      // Should be sorted by date (newest first)
      expect(new Date(posts[0].createdAt).getTime()).toBeGreaterThan(
        new Date(posts[1].createdAt).getTime()
      );
    });

    it('should skip files with missing required fields', () => {
      // Suppress console.warn for this test
      const originalWarn = console.warn;
      console.warn = jest.fn();

      const mockFiles = ['valid.md', 'invalid.md'];

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(mockFiles as any);
      mockedFs.readFileSync
        .mockReturnValueOnce('valid content')
        .mockReturnValueOnce('invalid content');

      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: 'Valid Post',
            description: 'Valid Description',
            created_at: '2023-12-25T10:00:00Z',
          },
          content: 'valid content',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Invalid Post',
            // Missing description and created_at
          },
          content: 'invalid content',
        } as any);

      const posts = getAllPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Valid Post');

      // Restore console.warn
      console.warn = originalWarn;
    });

    it('should skip files with placeholder dates', () => {
      // Suppress console.warn for this test
      const originalWarn = console.warn;
      console.warn = jest.fn();

      const mockFiles = ['valid.md', 'placeholder.md'];

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(mockFiles as any);
      mockedFs.readFileSync
        .mockReturnValueOnce('valid content')
        .mockReturnValueOnce('placeholder content');

      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: 'Valid Post',
            description: 'Valid Description',
            created_at: '2023-12-25T10:00:00Z',
          },
          content: 'valid content',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Placeholder Post',
            description: 'Placeholder Description',
            created_at: '[YYYY-MM-DD]',
          },
          content: 'placeholder content',
        } as any);

      const posts = getAllPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Valid Post');

      // Restore console.warn
      console.warn = originalWarn;
    });

    it('should skip files with invalid dates', () => {
      // Suppress console.warn for this test
      const originalWarn = console.warn;
      console.warn = jest.fn();

      const mockFiles = ['valid.md', 'invalid-date.md'];

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(mockFiles as any);
      mockedFs.readFileSync
        .mockReturnValueOnce('valid content')
        .mockReturnValueOnce('invalid content');

      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: 'Valid Post',
            description: 'Valid Description',
            created_at: '2023-12-25T10:00:00Z',
          },
          content: 'valid content',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Invalid Date Post',
            description: 'Invalid Date Description',
            created_at: 'invalid-date',
          },
          content: 'invalid content',
        } as any);

      const posts = getAllPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Valid Post');

      // Restore console.warn
      console.warn = originalWarn;
    });

    it('should return cached posts on subsequent calls', () => {
      const mockFiles = ['post1.md'];

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(mockFiles as any);
      mockedFs.readFileSync.mockReturnValue('content');

      mockedMatter.mockReturnValue({
        data: {
          title: 'Test Post',
          description: 'Test Description',
          created_at: '2023-12-25T10:00:00Z',
        },
        content: 'content',
      } as any);

      // First call
      const posts1 = getAllPosts();
      // Second call
      const posts2 = getAllPosts();

      expect(posts1).toEqual(posts2);
      // fs.readdirSync should only be called once due to caching
      expect(mockedFs.readdirSync).toHaveBeenCalledTimes(1);
    });

    it('should handle errors gracefully', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockImplementation(() => {
        throw new Error('File system error');
      });

      const posts = getAllPosts();
      expect(posts).toEqual([]);

      // Restore console.error
      console.error = originalError;
    });
  });

  describe('getPostsOnDay', () => {
    beforeEach(() => {
      // Setup mock for getAllPosts
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(['post1.md', 'post2.md'] as any);
      mockedFs.readFileSync
        .mockReturnValueOnce('content1')
        .mockReturnValueOnce('content2');

      mockedMatter
        .mockReturnValueOnce({
          data: {
            title: 'Post 1',
            description: 'Description 1',
            created_at: '2023-12-25T10:00:00Z',
          },
          content: 'content1',
        } as any)
        .mockReturnValueOnce({
          data: {
            title: 'Post 2',
            description: 'Description 2',
            created_at: '2023-12-24T10:00:00Z',
          },
          content: 'content2',
        } as any);
    });

    it('should return posts for a specific date', () => {
      const posts = getPostsOnDay('2023-12-25');

      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Post 1');
    });

    it('should return posts for today when no date provided', () => {
      const posts = getPostsOnDay();
      expect(posts).toHaveLength(1);
      expect(posts[0].title).toBe('Post 1');
    });

    it('should return empty array for invalid date', () => {
      // Suppress console warnings and errors for this test
      const originalWarn = console.warn;
      const originalError = console.error;
      console.warn = jest.fn();
      console.error = jest.fn();

      const posts = getPostsOnDay('invalid-date');
      expect(posts).toEqual([]);

      // Restore console functions
      console.warn = originalWarn;
      console.error = originalError;
    });

    it('should handle errors gracefully', () => {
      // Clear cache and suppress console for this test
      clearPostsCache();
      const originalError = console.error;
      console.error = jest.fn();

      // Mock getAllPosts to throw an error
      mockedFs.readdirSync.mockImplementation(() => {
        throw new Error('File system error');
      });

      const posts = getPostsOnDay('2023-12-25');
      expect(posts).toEqual([]);

      // Restore console.error
      console.error = originalError;
    });
  });

  describe('getPostBySlug', () => {
    beforeEach(() => {
      // Reset all mocks for clean state in each test
      jest.clearAllMocks();
      clearPostsCache();

      // Reset path.join mock to default behavior
      mockedPath.join.mockImplementation((...args) => {
        if (args.includes('content')) {
          return '/mock/project/content';
        }
        return args.join('/');
      });
    });
    it('should return null for invalid slug', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      const post = getPostBySlug('');
      expect(post).toBeNull();

      // Restore console.error
      console.error = originalError;
    });

    it('should return null when file does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const post = getPostBySlug('non-existent');
      expect(post).toBeNull();
    });
  });

  describe('clearPostsCache', () => {
    it('should clear the posts cache', () => {
      // First, populate the cache
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(['post1.md'] as any);
      mockedFs.readFileSync.mockReturnValue('content');
      mockedMatter.mockReturnValue({
        data: {
          title: 'Test Post',
          description: 'Test Description',
          created_at: '2023-12-25T10:00:00Z',
        },
        content: 'content',
      } as any);

      getAllPosts();
      expect(mockedFs.readdirSync).toHaveBeenCalledTimes(1);

      // Call again to verify cache is used
      getAllPosts();
      expect(mockedFs.readdirSync).toHaveBeenCalledTimes(1);

      // Clear cache
      clearPostsCache();

      // Call again to verify cache was cleared
      getAllPosts();
      expect(mockedFs.readdirSync).toHaveBeenCalledTimes(2);
    });
  });
});

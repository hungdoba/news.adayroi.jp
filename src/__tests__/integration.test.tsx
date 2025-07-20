import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { formatDate, cn } from '@/lib/utils';

describe('Integration Tests', () => {
  describe('PostCard with MaxWidthWrapper', () => {
    const mockPost = {
      title: 'Integration Test Post',
      slug: 'integration-test-post',
      description: 'This is an integration test for the post card component.',
      createdAt: '2023-12-25T10:30:00Z',
      priority: false,
    };

    it('should render PostCard inside MaxWidthWrapper correctly', () => {
      render(
        <MaxWidthWrapper>
          <PostCard {...mockPost} />
        </MaxWidthWrapper>
      );

      // Check if the wrapper is rendered
      const wrapper = screen
        .getByText(mockPost.title)
        .closest('div[class*="mx-auto"]');
      expect(wrapper).toBeInTheDocument();

      // Check if the post card content is rendered
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost.description)).toBeInTheDocument();

      // Check if the formatted date is displayed
      const formattedDate = formatDate(mockPost.createdAt);
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('should handle multiple PostCards in MaxWidthWrapper', () => {
      const mockPost2 = {
        title: 'Second Integration Test Post',
        slug: 'second-integration-test-post',
        description: 'This is another integration test post.',
        createdAt: '2023-12-24T10:30:00Z',
        priority: true,
      };

      render(
        <MaxWidthWrapper className="custom-class">
          <PostCard {...mockPost} />
          <PostCard {...mockPost2} />
        </MaxWidthWrapper>
      );

      // Check if both posts are rendered
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText(mockPost2.title)).toBeInTheDocument();

      // Check if custom class is applied to wrapper
      const wrapper = screen
        .getByText(mockPost.title)
        .closest('div[class*="custom-class"]');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Utility function integration', () => {
    it('should work together to create proper styling', () => {
      const baseClasses = 'flex items-center';
      const conditionalClasses = 'text-red-500';
      const customClasses = 'font-bold';

      const result = cn(baseClasses, true && conditionalClasses, customClasses);

      expect(result).toContain('flex');
      expect(result).toContain('items-center');
      expect(result).toContain('text-red-500');
      expect(result).toContain('font-bold');
    });

    it('should format dates consistently across components', () => {
      const testDate = '2023-12-25T10:30:00Z';

      const viFormat = formatDate(testDate, 'vi-VN');
      const enFormat = formatDate(testDate, 'en-US');

      expect(viFormat).toContain('2023');
      expect(viFormat).toContain('25');
      expect(enFormat).toContain('December');
      expect(enFormat).toContain('2023');
    });
  });

  describe('Component composition', () => {
    it('should handle nested components with proper styling', () => {
      const { container } = render(
        <MaxWidthWrapper className="bg-gray-100">
          <div className="grid grid-cols-1 gap-4">
            <PostCard
              title="Nested Component Test"
              slug="nested-test"
              description="Testing nested component rendering"
              createdAt="2023-12-25T10:30:00Z"
              priority={false}
            />
          </div>
        </MaxWidthWrapper>
      );

      // Check if the structure is correct
      const wrapper = container.querySelector('.mx-auto');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('bg-gray-100');

      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();

      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });
  });
});

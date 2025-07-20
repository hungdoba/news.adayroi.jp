import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import type { PostCardProps } from '@/types';

// Mock the next-image-export-optimizer
jest.mock('next-image-export-optimizer', () => {
  interface MockedImageProps {
    src: string;
    alt: string;
    priority?: boolean;
    unoptimized?: boolean;
    fill?: boolean;
    sizes?: string;
    className?: string;
    [key: string]: unknown;
  }

  const MockedImage = ({
    src,
    alt,
    priority,
    unoptimized,
    fill,
    sizes,
    className,
    ...props
  }: MockedImageProps) => (
    <img
      src={src}
      alt={alt}
      className={className}
      data-priority={priority ? 'true' : 'false'}
      data-unoptimized={unoptimized ? 'true' : 'false'}
      data-fill={fill ? 'true' : 'false'}
      data-sizes={sizes}
      {...props}
    />
  );
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

const mockProps: PostCardProps = {
  title: 'Test Article Title',
  slug: 'test-article-slug',
  description: 'This is a test article description for testing purposes.',
  createdAt: '2023-12-25T10:30:00Z',
  priority: false,
};

describe('PostCard', () => {
  it('renders post card with all required elements', () => {
    render(<PostCard {...mockProps} />);

    // Check if title is rendered and is a link
    const titleLink = screen.getByRole('link', { name: mockProps.title });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', `/post/${mockProps.slug}`);

    // Check if description is rendered
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    // Check if "Đọc thêm" link is rendered
    const readMoreLink = screen.getByRole('link', {
      name: `Read more: "${mockProps.title}"`,
    });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', `/post/${mockProps.slug}`);
  });

  it('renders the image with correct attributes', () => {
    render(<PostCard {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      `/images/thumbnails/${mockProps.slug}.webp`
    );
    expect(image).toHaveAttribute('alt', mockProps.title);
  });

  it('displays formatted date', () => {
    render(<PostCard {...mockProps} />);

    const timeElement = document.querySelector('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', mockProps.createdAt);
  });

  it('applies priority to image when priority prop is true', () => {
    const propsWithPriority = { ...mockProps, priority: true };
    render(<PostCard {...propsWithPriority} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('does not apply priority to image when priority prop is false', () => {
    render(<PostCard {...mockProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('data-priority', 'false');
  });

  it('renders as an article element with proper structure', () => {
    render(<PostCard {...mockProps} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();

    // Check that the article contains the expected child elements
    expect(article.querySelector('time')).toBeInTheDocument();
    expect(article.querySelector('h2')).toBeInTheDocument();
    expect(article.querySelector('img')).toBeInTheDocument();
  });

  it('renders with long description correctly', () => {
    const longDescription =
      'This is a very long description that should be truncated when displayed in the post card component. It contains multiple sentences and should test the line-clamp functionality.';
    const propsWithLongDescription = {
      ...mockProps,
      description: longDescription,
    };

    render(<PostCard {...propsWithLongDescription} />);

    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it('handles special characters in title and description', () => {
    const propsWithSpecialChars = {
      ...mockProps,
      title: 'Test Title with Special Characters: áàảãạ & "quotes"',
      description: 'Description with special chars: éêë, ñ, ü, ß & symbols!',
    };

    render(<PostCard {...propsWithSpecialChars} />);

    expect(screen.getByText(propsWithSpecialChars.title)).toBeInTheDocument();
    expect(
      screen.getByText(propsWithSpecialChars.description)
    ).toBeInTheDocument();
  });
});

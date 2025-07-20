import { render, screen } from '@testing-library/react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

describe('MaxWidthWrapper', () => {
  it('renders children correctly', () => {
    const testContent = 'Test content';
    render(
      <MaxWidthWrapper>
        <p>{testContent}</p>
      </MaxWidthWrapper>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('applies default CSS classes', () => {
    const { container } = render(
      <MaxWidthWrapper>
        <div>Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      'mx-auto',
      'max-w-7xl',
      'w-full',
      'my-12',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );
  });

  it('merges custom className with default classes', () => {
    const customClass = 'custom-padding bg-red-500';
    const { container } = render(
      <MaxWidthWrapper className={customClass}>
        <div>Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-padding', 'bg-red-500');
    // Should still have default classes
    expect(wrapper).toHaveClass('mx-auto', 'max-w-7xl');
  });

  it('renders as a div element', () => {
    const { container } = render(
      <MaxWidthWrapper>
        <span>Content</span>
      </MaxWidthWrapper>
    );

    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('handles multiple children', () => {
    render(
      <MaxWidthWrapper>
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </MaxWidthWrapper>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('handles empty className gracefully', () => {
    const { container } = render(
      <MaxWidthWrapper className="">
        <div>Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mx-auto', 'max-w-7xl', 'w-full');
  });

  it('handles undefined className gracefully', () => {
    const { container } = render(
      <MaxWidthWrapper className={undefined}>
        <div>Content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mx-auto', 'max-w-7xl', 'w-full');
  });
});

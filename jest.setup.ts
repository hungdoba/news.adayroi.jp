import '@testing-library/jest-dom';
import React from 'react';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock next-image-export-optimizer
jest.mock('next-image-export-optimizer', () => {
  const MockedImage = ({
    src,
    alt,
    priority,
    unoptimized,
    fill,
    sizes,
    quality,
    placeholder,
    blurDataURL,
    onLoad,
    onError,
    ...props
  }: any) => {
    // Filter out Next.js specific props that shouldn't be passed to HTML img element
    const { className, style, width, height } = props;

    const imgProps: any = {
      src,
      alt,
      ...(className && { className }),
      ...(style && { style }),
      ...(width && { width }),
      ...(height && { height }),
    };

    // Handle fill prop by setting appropriate styles
    if (fill) {
      imgProps.style = {
        ...imgProps.style,
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
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
} as any;

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveValue(value: string | number): R;
    }
  }
}

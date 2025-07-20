import { render, screen } from '@testing-library/react';
import SearchBar from '@/components/SearchBar';

// Mock the UI components since we don't have their implementations
jest.mock('@/components/ui/input', () => ({
  Input: ({ placeholder, ...props }: any) => (
    <input placeholder={placeholder} {...props} />
  ),
}));

jest.mock('@/components/ui/sort-select', () => ({
  SortSelect: () => <select data-testid="sort-select" />,
}));

jest.mock('@/components/ui/sort-ascending', () => ({
  SortAscendingToggle: () => <button data-testid="sort-ascending-toggle" />,
}));

describe('SearchBar', () => {
  it('renders all search components', () => {
    render(<SearchBar />);

    // Check if search input is rendered
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();

    // Check if sort select is rendered
    const sortSelect = screen.getByTestId('sort-select');
    expect(sortSelect).toBeInTheDocument();

    // Check if sort ascending toggle is rendered
    const sortToggle = screen.getByTestId('sort-ascending-toggle');
    expect(sortToggle).toBeInTheDocument();
  });

  it('has correct container styling', () => {
    const { container } = render(<SearchBar />);
    const searchBarContainer = container.firstChild as HTMLElement;

    expect(searchBarContainer).toHaveClass('flex', 'space-x-4');
  });

  it('renders input with correct placeholder', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import ErrorMessage from '../components/common/errorhandler/ErrorMessage';

describe('ErrorMessage', () => {
  test('renders error message', () => {
    render(
      <BrowserRouter>
        <ErrorMessage message="Test error" />
      </BrowserRouter>
    );
    expect(screen.getByText('Test error')).toBeDefined();
  });

  test('renders retry button when onRetry provided', () => {
    const mockRetry = vi.fn();
    render(
      <BrowserRouter>
        <ErrorMessage message="Error" onRetry={mockRetry} />
      </BrowserRouter>
    );
    expect(screen.getByText('Try Again')).toBeDefined();
  });

  test('calls onRetry when button clicked', () => {
    const mockRetry = vi.fn();
    render(
      <BrowserRouter>
        <ErrorMessage message="Error" onRetry={mockRetry} />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText('Try Again'));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});
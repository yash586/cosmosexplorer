import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/common/errorhandler/NotFound';

describe('NotFound', () => {
  test('renders 404', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(screen.getByText('404')).toBeDefined();
  });

  test('renders lost in space message', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(screen.getByText('Lost in space...')).toBeDefined();
  });

  test('renders back to home button', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(screen.getByText(/Back to Home/i)).toBeDefined();
  });
});
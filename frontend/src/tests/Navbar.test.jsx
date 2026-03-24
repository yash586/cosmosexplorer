import { render, screen } from '@testing-library/react';
import { BrowserRouter }  from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import Navbar from '../components/layout/navbar/Navbar';

describe('Navbar', () => {
  const renderNavbar = () => render(
    <BrowserRouter><Navbar /></BrowserRouter>
  );

  test('renders brand name', () => {
    renderNavbar();
    expect(screen.getByText('CosmosExplorer')).toBeDefined();
  });

  test('renders nav links', () => {
    renderNavbar();
    expect(screen.getByText('APOD')).toBeDefined();
    expect(screen.getByText('Near Earth')).toBeDefined();
    expect(screen.getByText('Discover')).toBeDefined();
    expect(screen.getByText('Earth Events')).toBeDefined();
  });
});
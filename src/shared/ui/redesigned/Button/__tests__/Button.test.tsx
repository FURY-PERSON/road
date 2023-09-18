import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { Button } from '../Button';

describe('Button', () => {
  test('Simple example', () => {
    renderWithProviders(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('With variant', () => {
    renderWithProviders(<Button variant='clear'>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('clear');
  });
});

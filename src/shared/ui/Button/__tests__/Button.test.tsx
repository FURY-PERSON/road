import { render, screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { Button, ThemeVariant } from '../Button';

describe('Button', () => {
  test('Simple example', () => {
    renderWithProviders(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('With variant', () => {
    renderWithProviders(<Button variant={ThemeVariant.CLEAR}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass(ThemeVariant.CLEAR);
  });
});

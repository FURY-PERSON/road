import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('Simple example', () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Test toggle', () => {
    renderWithProviders(<Sidebar />);
    const toggleButton = screen.getByTestId('sidebar-toggle');
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});

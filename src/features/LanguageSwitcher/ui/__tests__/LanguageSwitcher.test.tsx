import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { LanguageSwitcher } from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  test('Simple example', () => {
    renderWithProviders(<LanguageSwitcher />);
    expect(screen.getByTestId('LanguageSwitcher')).toBeInTheDocument();
  });
});

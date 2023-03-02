import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nforTest';

export interface RenderWithProvidersOptions {
  initialRoute?: string
}

export const renderWithProviders = (component: ReactNode, options: RenderWithProvidersOptions = {}) => {
  const { initialRoute = '/' } = options;

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <I18nextProvider i18n={i18nForTests}>
        {component}
      </I18nextProvider>
    </MemoryRouter>,
  );
};

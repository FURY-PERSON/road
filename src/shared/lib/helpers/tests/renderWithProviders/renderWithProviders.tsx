import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '@/shared/config/i18n/i18nforTest';

import { ReducersList } from '../../DynamicModuleLoader/DynamicModuleLoader';

export interface RenderWithProvidersOptions {
  initialRoute?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: ReducersList;
}

export const renderWithProviders = (
  component: ReactNode,
  options: RenderWithProvidersOptions = {}
) => {
  const { initialRoute = '/', initialState = {}, asyncReducers = {} } = options;

  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <StoreProvider asyncReducers={asyncReducers} initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

import { screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { renderWithProviders } from '@/shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { routes } from '@/shared/constant/router';
import { RoleName } from '@/entities/Role';

describe('app/router/AppRouter', () => {
  test('Should render', async () => {
    renderWithProviders(<AppRouter />, {
      initialRoute: routes.about()
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('PAge not found', async () => {
    renderWithProviders(<AppRouter />, {
      initialRoute: '/dfgvdv'
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Redirect non auth to login page', async () => {
    renderWithProviders(<AppRouter />, {
      initialRoute: routes.profile('1')
    });

    const page = await screen.findByTestId('LoginPage');
    expect(page).toBeInTheDocument();
  });

  test('Access to auth needed page', async () => {
    renderWithProviders(<AppRouter />, {
      initialRoute: routes.profile('1'),
      initialState: {
        user: { _inited: true, authData: { accessToken: '', refreshToken: '' }, userData: {} }
      }
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test('Forbidden (no permissions), redirect to login', async () => {
    renderWithProviders(<AppRouter />, {
      initialRoute: routes.users(),
      initialState: {
        user: { _inited: true, authData: { accessToken: '', refreshToken: '' } }
      }
    });

    const page = await screen.findByTestId('LoginPage');
    expect(page).toBeInTheDocument();
  });
});

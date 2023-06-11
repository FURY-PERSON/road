import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { EditableProfileCard } from './EditableProfileCard';
import { EditableUser } from '../../model/types/editableProfileCard';
import { RoleName } from 'entities/Role';
import { profileReducer } from '../../model/slice/profile.slice';
import userEvent from '@testing-library/user-event'
import { UserToStoreDto } from '../../model/dto/UserToStoreDto';
import { User } from 'entities/User';

const profile: User = {
  firstName: 'misha',
  id: '123',
  lastName: 'last',
  login: 'login',
  role: {
    name: RoleName.ADMIN,
    description: ''
  },
  permissions: [],
  email: 'email@gmail.com',
  phone: '+375443655611',
}

const options = {
  asyncReducers: {
    profile: profileReducer
  },
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: { ...new UserToStoreDto(profile) },
    },
    user: {
      userData: {
        role: {
          name: RoleName.ADMIN
        }
      }
    }
  }
}

describe('EditableProfileCard', () => {
/*   beforeEach(() => {
    renderWithProviders(<EditableProfileCard />, {
      asyncReducers: {
        profile: profileReducer
      },
      initialState: {
        profile: {
          readonly: true,
          data: profile,
          form: profile,
        },
        user: {
          userData: {
            role: {
              name: RoleName.ADMIN
            }
          }
        }
      }
    });
  }) */


  test('Edit button should be work', async () => {
    renderWithProviders(<EditableProfileCard />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCard.editButton'))
    expect(screen.getByTestId('EditableProfileCard.cancelButton')).toBeInTheDocument();
  });

  test('Cancel button should be work', async () => {
    renderWithProviders(<EditableProfileCard />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCard.editButton'))
    
    await userEvent.clear(screen.getByTestId('EditableProfileCard.firstNameInput'))
    await userEvent.clear(screen.getByTestId('EditableProfileCard.lastNameInput'))

    await userEvent.type(screen.getByTestId('EditableProfileCard.firstNameInput'), 'test first name')
    await userEvent.type(screen.getByTestId('EditableProfileCard.lastNameInput'), 'test last name')

    expect(screen.getByTestId('EditableProfileCard.firstNameInput')).toHaveValue('test first name');
    expect(screen.getByTestId('EditableProfileCard.lastNameInput')).toHaveValue('test last name');


    await userEvent.click(screen.getByTestId('EditableProfileCard.cancelButton'))

    expect(screen.getByTestId('EditableProfileCard.firstNameInput')).toHaveValue('misha');
    expect(screen.getByTestId('EditableProfileCard.lastNameInput')).toHaveValue('last');
  });

  test('Cancel button should be work', async () => {
    renderWithProviders(<EditableProfileCard />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCard.editButton'))
    
    await userEvent.clear(screen.getByTestId('EditableProfileCard.firstNameInput'))
    await userEvent.clear(screen.getByTestId('EditableProfileCard.lastNameInput'))

    await userEvent.type(screen.getByTestId('EditableProfileCard.firstNameInput'), 'test first name')
    await userEvent.type(screen.getByTestId('EditableProfileCard.lastNameInput'), 'test last name')

    expect(screen.getByTestId('EditableProfileCard.firstNameInput')).toHaveValue('test first name');
    expect(screen.getByTestId('EditableProfileCard.lastNameInput')).toHaveValue('test last name');


    await userEvent.click(screen.getByTestId('EditableProfileCard.cancelButton'))

    expect(screen.getByTestId('EditableProfileCard.firstNameInput')).toHaveValue('misha');
    expect(screen.getByTestId('EditableProfileCard.lastNameInput')).toHaveValue('last');
  });

  test('Validation error should display', async () => {
    renderWithProviders(<EditableProfileCard />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCard.editButton'))
    
    await userEvent.clear(screen.getByTestId('EditableProfileCard.firstNameInput'))

    await userEvent.click(screen.getByTestId('EditableProfileCard.saveButton'))

    expect(screen.getByTestId('EditableProfileCard.error.title')).toBeInTheDocument();
  });
});

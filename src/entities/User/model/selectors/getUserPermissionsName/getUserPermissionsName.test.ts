import { StateSchema } from '@/app/providers/StoreProvider';
import { PermissionName } from '@/entities/Permission';
import { getUserPermissionsName } from './getUserPermissionsName';

describe('getUserPermissions', () => {
  test('should return user permission', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: {
          permissions: [
            {
              description: 'admin desc',
              id: '234',
              name: PermissionName.ADMIN
            },
            {
              description: 'student desc',
              id: '2324',
              name: PermissionName.STUDENT
            }
          ]
        }
      }
    };

    expect(getUserPermissionsName(state as StateSchema)).toEqual([
      PermissionName.ADMIN,
      PermissionName.STUDENT
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {}
    };

    expect(getUserPermissionsName(state as StateSchema)).toEqual(undefined);
  });
});

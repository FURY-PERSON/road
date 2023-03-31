import { StateSchema } from "app/providers/StoreProvider";
import { PermissionName } from "entities/Permission";
import { RoleName } from "entities/Role";
import { AuthTokens, User } from "../../types/user";
import { getUserData } from "./getUserData";

const user: User = {
  login: 'admin',
  id: '23',
  firstName: 'first',
  lastName: 'last',
  permissions: [
    {
      description: 'desc',
      id: '123',
      name: PermissionName.ADMIN
    }
  ],
  role: {
    description: 'desc',
    name: RoleName.STUDENT
  },
}

describe('getUserData', () => {
  test('should return user data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: user,
      }
    };

    expect(getUserData(state as StateSchema)).toEqual(user);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {

      }
    };

    expect(getUserData(state as StateSchema)).toEqual(undefined);
  });
});
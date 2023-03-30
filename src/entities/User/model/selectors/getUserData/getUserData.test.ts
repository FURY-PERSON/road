import { StateSchema } from "app/providers/StoreProvider";
import { PermissionName } from "entities/Permission/model/types/permission";
import { Role } from "entities/Role";
import { AuthTokens, User } from "../../types/user";
import { getUserData } from "./getUserData";

const user: User = {
  firstName: 'firstName',
  id: '123',
  lastName: 'lastName',
  login: 'login',
  permissions: [PermissionName.STUDENT],
  role: Role.STUDENT, 
}

const authData: AuthTokens = {
  accessToken: 'sdaf',
  refreshToken: 'sdf'
}

describe('getUserPermissions', () => {
  test('should return user data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: user,
        authData: authData
      }
    };

    expect(getUserData(state as StateSchema)).toEqual({userData: user, authData: authData});
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {

      }
    };

    expect(getUserData(state as StateSchema)).toEqual({});
  });
});
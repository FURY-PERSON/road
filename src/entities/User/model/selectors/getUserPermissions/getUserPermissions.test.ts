import { StateSchema } from "app/providers/StoreProvider";
import { PermissionName } from "entities/Permission/model/types/permission";
import { getUserPermissions } from "./getUserPermissions";

describe('getUserPermissions', () => {
  test('should return user permission', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: {
          permissions: [PermissionName.ADMIN, PermissionName.STUDENT]
        }
      }
    };

    expect(getUserPermissions(state as StateSchema)).toEqual([PermissionName.ADMIN, PermissionName.STUDENT]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {

      }
    };

    expect(getUserPermissions(state as StateSchema)).toEqual(undefined);
  });
});
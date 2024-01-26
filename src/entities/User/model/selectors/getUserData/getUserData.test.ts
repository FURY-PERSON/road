import { StateSchema } from '@/app/providers/StoreProvider';
import { PermissionName } from '@/entities/Permission';
import { RoleName } from '@/entities/Role';
import { AuthTokens, User } from '../../types/user';
import { getUserData } from './getUserData';

const user: User = {
  login: 'admin',
  id: '23',
  firstName: 'first',
  lastName: 'last',
  block: {
    "id": "09c10e70-d095-4f1f-91b8-1d8c39b4a23d",
    "number": "415",
    "floor": 4,
    "dorm": {
      "id": "f92c9a02-b3f5-463e-9e58-7df4e0988601",
      "name": "DORM 12",
      "address": "DORM 12",
      "phone": "+375445288343",
      "email": "Dorm@gmail.com",
      "imageName": "6fd0a59a-9f6b-47ac-bf6d-6ca76a14ed64.jpg",
      "imageUrl": "http://localhost:3005/6fd0a59a-9f6b-47ac-bf6d-6ca76a14ed64.jpg"
    },
    "rooms": [],
    "tenants": [
    ]
  },
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
  }
};

describe('getUserData', () => {
  test('should return user data', () => {
    const state: DeepPartial<StateSchema> = {
      user: {
        userData: user
      }
    };

    expect(getUserData(state as StateSchema)).toEqual(user);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {
      user: {}
    };

    expect(getUserData(state as StateSchema)).toEqual(undefined);
  });
});

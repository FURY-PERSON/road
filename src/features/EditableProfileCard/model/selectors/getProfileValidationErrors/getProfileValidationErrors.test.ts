import { StateSchema } from "app/providers/StoreProvider";
import { ProfileValidationError } from "../../types/editableProfileCard";
import { getProfileValidationErrors } from "./getProfileValidationErrors";

describe('getProfileValidationErrors', () => {
  test('should return profile validation errors', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validationErrors: [
          ProfileValidationError.NO_DATA, 
          ProfileValidationError.SERVER_ERROR
        ]
      }
    };

    expect(getProfileValidationErrors(state as StateSchema)).toEqual([
      ProfileValidationError.NO_DATA, 
      ProfileValidationError.SERVER_ERROR
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {

    };

    expect(getProfileValidationErrors(state as StateSchema)).toEqual(undefined);
  });
});
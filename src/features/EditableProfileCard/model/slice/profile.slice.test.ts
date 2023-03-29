import { Profile } from "entities/Profile";
import { updateProfile } from "../services/updateProfileData/updateProfileData";
import { ProfileSchema, ProfileValidationError } from "../types/editableProfileCard";
import { profileActions, profileReducer } from "./profile.slice";

const profile: Profile = {
  firstName: 'firstName',
  lastName: 'lastName',
  login: 'login'
}


describe('profile.slice', () => {
  test('should set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {};

    expect(profileReducer(state as ProfileSchema, profileActions.setReadOnly(true))).toEqual({
      readonly: true
    })
    expect(profileReducer(state as ProfileSchema, profileActions.setReadOnly(false))).toEqual({
      readonly: false
    })
  });

  test('should cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
      data: {
        firstName: 'firstName',
        lastName: 'lastName',
        login: 'login'
      }
    };

    expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
      readonly: true,
      form: state.data,
      data: state.data,
      validationErrors: undefined,
      error: undefined,
    })
  });

  test('should update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
    };

    expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({firstName: 'firstName changed'}))).toEqual({
      form: {
        firstName: 'firstName changed'
      }
    })
  });


  test('should update profile service', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validationErrors: [ProfileValidationError.SERVER_ERROR]
    };

    expect(profileReducer(state as ProfileSchema, updateProfile.pending)).toEqual({
      isLoading: true,
      validationErrors: undefined
    })
  });

  test('should update profile fulfilled ', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(profileReducer(state as ProfileSchema, updateProfile.fulfilled(profile, ''))).toEqual({
      error: undefined,
      validationErrors: undefined,
      data: profile,
      form: profile,
      readonly: true,
      isLoading: false,
    })
  });
});
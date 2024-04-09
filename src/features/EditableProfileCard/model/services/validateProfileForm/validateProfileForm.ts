import { EditableUser, ProfileValidationError } from '../../types/editableProfileCard';

export const validateProfileForm = (profile?: Partial<EditableUser>): ProfileValidationError[] => {
  const errors = new Set<ProfileValidationError>();

  if (!profile) {
    errors.add(ProfileValidationError.NO_DATA);
    return Array.from(errors);
  }

  const { firstName, lastName, averageMark, budget, course } = profile;

  if (!firstName) {
    errors.add(ProfileValidationError.USER_DATA);
  }

  if (!lastName) {
    errors.add(ProfileValidationError.USER_DATA);
  }

  if (!averageMark || averageMark > 10) {
    errors.add(ProfileValidationError.USER_DATA);
  }

  if (budget === undefined) {
    errors.add(ProfileValidationError.USER_DATA);
  }

  if (!course || course > 6) {
    errors.add(ProfileValidationError.USER_DATA);
  }

  return Array.from(errors);
};

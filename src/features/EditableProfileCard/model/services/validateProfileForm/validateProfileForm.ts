import { Profile } from 'entities/Profile';
import { ProfileValidationError } from '../../types/editableProfileCard';

export const validateProfileForm = (profile?: Profile): ProfileValidationError[] => {
  const errors = new Set<ProfileValidationError>();
  
  if (!profile) {
    errors.add(ProfileValidationError.NO_DATA);
    return Array.from(errors);
  }

  const { firstName, lastName } = profile;

  if (!firstName) {
    errors.add(ProfileValidationError.USER_DATA); 
  }

  if (!lastName) {
    errors.add(ProfileValidationError.USER_DATA); 
  }

  return Array.from(errors);
};

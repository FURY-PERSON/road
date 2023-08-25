import { ValidationError } from '../../types/error';
import { RegisterForm } from '../../types/register.schema';

export const validateForm = (form?: RegisterForm): ValidationError[] => {
  const errors = new Set<ValidationError>();

  if (!form) {
    errors.add(ValidationError.NO_DATA);
    return Array.from(errors);
  }

  const { firstName, lastName, confirmPassword, email, login, password, phone, role } = form;

  if (!firstName) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!lastName) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!confirmPassword) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!email) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!login) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!password) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!phone) {
    errors.add(ValidationError.USER_DATA);
  }

  if (!role) {
    errors.add(ValidationError.USER_DATA);
  }

  if (password !== confirmPassword) {
    errors.add(ValidationError.PASSWORD_MATCH);
  }

  return Array.from(errors);
};

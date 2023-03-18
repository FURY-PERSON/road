export interface Profile {
  firstName: string,
  lastName: string,
  login: string;
}

export interface ProfileSchema {
  data?: Profile
  isLoading: boolean;
  error?: string;
  readonly: boolean
}
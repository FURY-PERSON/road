export interface User {
  id: string,
  login: string
}

export interface AuthTokens {
  refreshToken: string,
  accessToken: string
}

export interface UserSchema {
  authData?: AuthTokens,
  userData?: User
}

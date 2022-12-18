import { User } from './user.type'

// Success and Error
export interface SuccessResponse<Data> {
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

// Auth
export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
  user: User
}>
export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>

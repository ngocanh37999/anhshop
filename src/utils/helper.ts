import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import config from 'src/constants/config'
import { User } from 'src/types/user.type'
import userImage from 'src/assets/images/user.svg'
import { ErrorResponse } from 'src/types/response.type'

// LocalStorage
class Ls {
  localStorageEventTarget: EventTarget
  getAccessTokenFromLS: () => string
  getRefreshTokenFromLS: () => string
  constructor() {
    this.localStorageEventTarget = new EventTarget()
    this.getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
    this.getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''
  }
  public setAccessTokenToLS = (access_token: string) => {
    localStorage.setItem('access_token', access_token)
  }
  public setRefreshTokenToLS = (refresh_token: string) => {
    localStorage.setItem('refresh_token', refresh_token)
  }
  public clearLS = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('profile')
    const clearLSEvent = new Event('clearLS')
    this.localStorageEventTarget.dispatchEvent(clearLSEvent)
  }
  getProfileFromLS = () => {
    const result = localStorage.getItem('profile')
    return result ? JSON.parse(result) : null
  }
  setProfileToLS = (profile: User) => {
    localStorage.setItem('profile', JSON.stringify(profile))
  }
}

export const ls = new Ls()

// Method hỗ trợ...
class Method {
  removeSpecialCharacter: (str: string) => string
  constructor() {
    this.removeSpecialCharacter = (str: string) =>
      // eslint-disable-next-line no-useless-escape
      str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
  }
  public formatCurrency(currency: number) {
    return new Intl.NumberFormat('de-DE').format(currency)
  }
  public formatNumberToSocialStyle(value: number) {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1
    })
      .format(value)
      .replace('.', ',')
      .toLowerCase()
  }
  public rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
  public generateNameId = ({ name, id }: { name: string; id: string }) => {
    return this.removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
  }
  public getIdFromNameId = (nameId: string) => {
    const arr = nameId.split('-i-')
    return arr[arr.length - 1]
  }
  public getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)
}
export const method = new Method()

// AxiosErrorConfig
class AxiosErrorConfig {
  public isAxiosError<T>(error: unknown): error is AxiosError<T> {
    // eslint-disable-next-line import/no-named-as-default-member
    return axios.isAxiosError(error)
  }
  public isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
    return this.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
  }
  public isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return this.isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
  }
  public isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
    return (
      this.isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
      error.response?.data?.data?.name === 'EXPIRED_TOKEN'
    )
  }
}
export const axiosConfig = new AxiosErrorConfig()

import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { ls } from '../helper'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRhNjExNWZkYzVmMDM3ZTZmNjk0YiIsImVtYWlsIjoiZDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xNVQwOTo1MDo0Ny4xODhaIiwiaWF0IjoxNjcxMDk3ODQ3LCJleHAiOjE2NzExODQyNDd9.aRuh6TdD8sMlJuAA-YYg_b0xNwOK4gQzoHsqLczs9Gw'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzRhNjExNWZkYzVmMDM3ZTZmNjk0YiIsImVtYWlsIjoiZDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xMlQwODoxMjo1NS4xOTZaIiwiaWF0IjoxNjcwODMyNzc1LCJleHAiOjE2ODQ2NTY3NzV9.exhtfRyvl2Z5uAAfEQKtIyyUhP8q-K5wvHvHpWZz128'

const profile =
  '{"_id":"6374a6115fdc5f037e6f694b","roles":["User"],"email":"d7@gmail.com","createdAt":"2022-11-16T08:57:53.872Z","updatedAt":"2022-12-05T06:55:57.846Z","__v":0,"date_of_birth":"1997-01-13T17:00:00.000Z","name":"Dư Thanh Được 3","address":"Da nang, Vietnam","avatar":"44f75461-560e-42b5-a9d7-2b833a9f4d67.jpg","phone":"11111111111"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token được set vào localStorage', () => {
    ls.setAccessTokenToLS(access_token)
    expect(ls.getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token được set vào localStorage', () => {
    ls.setRefreshTokenToLS(refresh_token)
    expect(ls.getRefreshTokenFromLS()).toEqual(refresh_token)
  })
})

describe('clearLS', () => {
  it('Xóa hết access_token, refresh_token, profile', () => {
    ls.setRefreshTokenToLS(refresh_token)
    ls.setAccessTokenToLS(access_token)
    // setProfile tại đây
    // ...
    ls.clearLS()
    expect(ls.getAccessTokenFromLS()).toBe('')
    expect(ls.getRefreshTokenFromLS()).toBe('')
  })
})

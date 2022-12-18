import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'

interface RegisterAndLogin {
  confirm_password: string
  email: string
  password: string
}
type RegisterAndLoginApi = Omit<RegisterAndLogin, 'confirm_password'>

export default function useCallApiRegisterLogin() {
  // register
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterAndLoginApi, 'confirm_password'>) => authApi.registerAccount(body)
  })
  // registerAccountMutation.mutate(data, { onSuccess: (data) => { } })

  // login
  const loginMutation = useMutation({
    mutationFn: (body: Omit<RegisterAndLoginApi, 'confirm_password'>) => authApi.login(body)
  })
  // loginMutation.mutate(data, { onSuccess: (data) => { } })

  return { registerAccountMutation, loginMutation }
}

// interface PathType {
//   home?: string
//   profile?: string
//   user: string
//   changePassword: string
//   historyPurchase: string
//   register: string
//   login: string
//   logout: string
//   productDetail: string
//   cart: string
// }
// type PathTypeExtend = {
//   [key in keyof PathType]: string
// }

class Path {
  home: string
  profile: string
  user: string
  changePassword: string
  historyPurchase: string
  register: string
  login: string
  logout: string
  productDetail: string
  cart: string
  constructor() {
    this.home = '/'
    this.user = '/user'
    this.profile = this.user + '/profile'
    this.changePassword = this.user + '/password'
    this.historyPurchase = this.user + '/purchase'
    this.register = '/register'
    this.login = '/login'
    this.logout = '/logout'
    this.productDetail = ':nameId'
    this.cart = '/cart'
  }
}
const path = new Path()
export default path

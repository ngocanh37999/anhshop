import http from 'src/utils/http'
import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/response.type'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi

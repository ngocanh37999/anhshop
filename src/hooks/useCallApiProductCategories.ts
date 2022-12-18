import { useMutation, useQuery } from '@tanstack/react-query'
import categoryApi from 'src/apis/category.api'
import productApi from 'src/apis/product.api'
import purchaseApi from 'src/apis/purchase.api'
import { ProductListConfig } from 'src/types/product.type'

export default function useCallApiProductCategories({
  queryConfig,
  categoriesCheck,
  productsCheck,
  idProductDetail,
  productDetailCheck
}: {
  queryConfig?: ProductListConfig
  categoriesCheck?: boolean
  productsCheck?: boolean
  idProductDetail?: string
  productDetailCheck?: boolean
}) {
  // call api products
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(productsCheck)
  })
  // call api categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    enabled: Boolean(categoriesCheck)
  })
  // call api productDetail
  const { data: productDetailData } = useQuery({
    queryKey: ['product', idProductDetail],
    queryFn: () => productApi.getProductDetail(idProductDetail as string),
    enabled: Boolean(productDetailCheck)
  })
  //  call api addPurchase
  const addToCartMutation = useMutation({
    mutationFn: (body: { buy_count: number; product_id: string }) => purchaseApi.addToCart(body)
  })

  return { productsData, categoriesData, productDetailData, addToCartMutation }
}

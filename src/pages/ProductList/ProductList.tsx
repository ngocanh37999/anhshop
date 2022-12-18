import { Helmet } from 'react-helmet-async'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import useCallApiProductCategories from 'src/hooks/useCallApiProductCategories'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { productsData } = useCallApiProductCategories({
    queryConfig: queryConfig as ProductListConfig,
    productsCheck: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>Trang chủ | Anh Shop</title>
        <meta name='description' content='Trang chủ dự án Anh Shop' />
      </Helmet>
      <div className='container'>
        {productsData && (
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12'>
            <div className='col-span-3 hidden sm:hidden md:block'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

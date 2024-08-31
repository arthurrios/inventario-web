import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductTableRow } from './components/product-table-row'
import { api } from '@/services/api'
import { queryClient } from '@/lib/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { CreateProductButton } from '@/components/app/create-product-button'
import { ProductDTO } from '@/dtos/productDTO'

export async function getProducts() {
  const response = await api('/product', {
    method: 'GET',
  })

  const products: ProductDTO[] = await response.json()

  return products
}

export default async function ProductsPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth')
  }

  await queryClient.prefetchQuery({
    queryKey: ['product'],
    queryFn: getProducts,
  })
  const dehydratedState = dehydrate(queryClient)

  const products = queryClient.getQueryData<ProductDTO[]>(['product'])

  // Sort products by updated_at in descending order (most recent first)
  const sortedProducts =
    products?.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    ) || []

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex justify-between items-center">
        <h1 className="my-6 font-semibold text-xl">Produtos</h1>
        <CreateProductButton />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="h-16">
            <TableRow>
              <TableHead />
              <TableHead>Código</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço unitário</TableHead>
              <TableHead className="text-center">Estoque (unidades)</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProducts.map((product) => (
              <ProductTableRow key={product.product_id} product={product} />
            ))}
          </TableBody>
        </Table>
      </div>
    </HydrationBoundary>
  )
}

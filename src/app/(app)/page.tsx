import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Header } from './components/header'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProductTableRow } from './components/product-table-row'
import { ProductDTO } from '../dtos/productDTO'
import { api } from '@/services/api'
import { queryClient } from '@/lib/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export async function getProducts() {
  const response = await api('/product', {
    method: 'GET',
  })

  const products: ProductDTO[] = await response.json()

  return products
}

export default async function Home() {
  const session = await auth()
  // const products = await getProducts()

  if (!session) {
    redirect('/auth')
  }

  await queryClient.prefetchQuery({
    queryKey: ['product'],
    queryFn: getProducts,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="h-screen bg-black mx-auto max-w-7xl">
        <Header session={session} />

        <div className="flex justify-between items-center">
          <h1 className="my-6 font-semibold text-xl">Products</h1>
          <Dialog>
            <DialogTrigger className="flex items-center gap-2" asChild>
              <Button>
                Criar
                <Plus size={16} />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Code</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryClient
                .getQueryData<ProductDTO[]>(['product'])
                ?.map((product) => (
                  <ProductTableRow key={product.id} product={product} />
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </HydrationBoundary>
  )
}

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
import { OrderTableRow } from './components/order-table-row'
import { ProductDTO } from '../dtos/productDTO'
import { api } from '@/services/api'

async function getProducts() {
  const response = await api('/product', {
    method: 'GET',
  })

  const products: ProductDTO[] = await response.json()

  return products
}

export default async function Home() {
  const session = await auth()
  const products = await getProducts()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="h-screen bg-black mx-auto max-w-7xl">
      <Header session={session} />

      <div>
        <h1 className="my-6 font-semibold text-xl">Products</h1>
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
            {products.map((product) => {
              return <OrderTableRow key={product.id} product={product} />
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

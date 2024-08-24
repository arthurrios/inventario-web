import { api } from '@/services/api'
import { DialogContent } from '../ui/dialog'
import { Table, TableHeader, TableRow } from '../ui/table'
import { DetailsButtonProps } from './details-button'
import { ProductDTO } from '@/app/dtos/productDTO'

async function getProductById(productId: string) {
  const response = await api(`product/${productId}`)

  const product: ProductDTO = await response.json()

  return product
}

interface ProductDetailsProps extends DetailsButtonProps {}

export async function ProductDetails({ productId }: ProductDetailsProps) {
  const product = await getProductById(productId)

  return (
    <DialogContent>
      <h1>{product.name}</h1>

      <Table>
        <TableHeader>
          <TableRow></TableRow>
        </TableHeader>
      </Table>
    </DialogContent>
  )
}

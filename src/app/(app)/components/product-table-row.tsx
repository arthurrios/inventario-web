import { CategoryDTO } from '@/app/dtos/categoryDTO'
import { ProductDTO } from '@/app/dtos/productDTO'
import { DetailsButton } from '@/components/app/details-button'
import { TableCell, TableRow } from '@/components/ui/table'
import { api } from '@/services/api'

interface OrderTableRowProps {
  product: ProductDTO
}

async function getProductCategory(categoryId: string) {
  const response = await api(`/category/${categoryId}`, { method: 'GET' })

  const category: CategoryDTO = await response.json()

  return category
}

export async function ProductTableRow({ product }: OrderTableRowProps) {
  const category = await getProductCategory(product.categoryId)

  return (
    <TableRow>
      <TableCell className="w-3">
        <DetailsButton productId={product.id} />
      </TableCell>
      <TableCell className="w-3">{product.code}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(product.price)}
      </TableCell>
      <TableCell className="w-3 text-center">
        {product.quantity_in_stock}
      </TableCell>
    </TableRow>
  )
}

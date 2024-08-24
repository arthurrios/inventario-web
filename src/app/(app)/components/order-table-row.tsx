import { CategoryDTO } from '@/app/dtos/categoryDTO'
import { ProductDTO } from '@/app/dtos/productDTO'
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

export async function OrderTableRow({ product }: OrderTableRowProps) {
  const category = await getProductCategory(product.categoryId)

  return (
    <TableRow>
      <TableCell>Details</TableCell>
      <TableCell>{product.code}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.quantity_in_stock}</TableCell>
    </TableRow>
  )
}

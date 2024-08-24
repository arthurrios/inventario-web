import { ProductDTO } from '@/app/dtos/productDTO'
import { TableCell, TableRow } from '@/components/ui/table'

interface OrderTableRowProps {
  product: ProductDTO
}

export function OrderTableRow({ product }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>{product.code}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.categoryId}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.quantity_in_stock}</TableCell>
    </TableRow>
  )
}

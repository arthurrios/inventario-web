import { DeleteButton } from '@/components/app/delete-button'
import { DetailsButton } from '@/components/app/details-button'
import { TableCell, TableRow } from '@/components/ui/table'
import { CategoryDTO } from '@/dtos/categoryDTO'
import { ProductDTO } from '@/dtos/productDTO'
import { api } from '@/services/api'
import { formatPrice } from '@/utils/formatPrice'

interface OrderTableRowProps {
  product: ProductDTO
}

async function getProductCategory(categoryId: string) {
  const response = await api(`/category/${categoryId}`, { method: 'GET' })

  const category: CategoryDTO = await response.json()

  return category
}

export async function ProductTableRow({ product }: OrderTableRowProps) {
  const category = await getProductCategory(product.category_id)
  const productWithCategory = {
    ...product,
    category,
  }

  return (
    <TableRow>
      <TableCell className="w-3">
        <DetailsButton product={productWithCategory} />
      </TableCell>
      <TableCell className="w-3">{product.code}</TableCell>
      <TableCell>{product.product_name}</TableCell>
      <TableCell>{category.category_name}</TableCell>
      <TableCell>{formatPrice(product.unit_price)}</TableCell>
      <TableCell className="w-3 text-center">
        {product.quantity_in_stock}
      </TableCell>
      <TableCell className="w-20">
        <DeleteButton endpoint="/product" itemId={product.product_id} />
      </TableCell>
    </TableRow>
  )
}

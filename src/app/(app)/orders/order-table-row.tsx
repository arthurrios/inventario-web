import { DetailsButton } from '@/components/app/details-button'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderItemStatus, PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
import { truncateString } from '@/utils/truncateString'

interface OrderTableRowProps {
  order: PurchaseOrderDTO
}

const statusClasses: Record<string, string> = {
  Pendente: 'bg-gray-300',
  Enviado: 'bg-yellow-300',
  Entregue: 'bg-emerald-300',
  Cancelado: 'bg-red-300',
}

export async function OrderTableRow({ order }: OrderTableRowProps) {
  // const category = await getProductCategory(product.category_id)
  // const productWithCategory = {
  //   ...product,
  //   category,
  // }

  const statusClass = statusClasses[order.status] || 'bg-gray-300'

  return (
    <TableRow>
      <TableCell className="w-3">
        <DetailsButton order={order} />
      </TableCell>
      <TableCell className="w-3">
        {truncateString(order.purchase_order_id, 7)}
      </TableCell>
      <TableCell className="w-80">{order.supplier_id}</TableCell>
      <TableCell>
        {order.purchase_value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        })}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <div className={`size-2 rounded-full mr-3 ${statusClass}`} />
          {order.status}
        </div>
      </TableCell>
      <TableCell>{order.order_date.toString()}</TableCell>
    </TableRow>
  )
}

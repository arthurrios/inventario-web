import { DetailsButton } from '@/components/app/details-button'

import { TableCell, TableRow } from '@/components/ui/table'
import { ProductDTO } from '@/dtos/productDTO'
import { PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
import { truncateString } from '@/utils/truncateString'
// import { SupplierSelectStatus } from './supplier-select-status'

interface OrderTableRowProps {
  order: PurchaseOrderDTO
}

export const statusClasses: Record<string, string> = {
  Pendente: 'bg-gray-300',
  Enviado: 'bg-yellow-300',
  Entregue: 'bg-emerald-300',
  Cancelado: 'bg-red-300',
}

export async function OrderTableRow({ order }: OrderTableRowProps) {
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
      <TableCell className="justify-center">
        {/* {order.status === 'Entregue' ? ( */}
        <div className="flex items-center justify-center">
          <div className={`size-2 rounded-full mr-3 ${statusClass}`} />
          {order.status}
        </div>
        {/* ) : (
           <SupplierSelectStatus orderStatus={order.status} />
         )} */}
      </TableCell>
      <TableCell className="text-right">
        {new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(order.order_date))}
      </TableCell>
    </TableRow>
  )
}

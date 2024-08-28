import { DetailsButton } from '@/components/app/details-button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
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

const statusOptions = [
  { value: 'Pendente', label: 'Pendente', className: 'bg-gray-300' },
  { value: 'Enviado', label: 'Enviado', className: 'bg-yellow-300' },
  { value: 'Entregue', label: 'Entregue', className: 'bg-emerald-300' },
  { value: 'Cancelado', label: 'Cancelado', className: 'bg-red-300' },
]

export async function OrderTableRow({ order }: OrderTableRowProps) {
  // const category = await getProductCategory(product.category_id)
  // const productWithCategory = {
  //   ...product,
  //   category,
  // }

  const currentStatusOption =
    statusOptions.find((option) => option.value === order.status) ||
    statusOptions[0]

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
        {order.status === 'Entregue' ? (
          <div className="flex items-center justify-center">
            <div className={`size-2 rounded-full mr-3 ${statusClass}`} />
            {order.status}
          </div>
        ) : (
          <Select defaultValue={order.status}>
            <SelectTrigger className="w-32">
              <SelectValue>
                <div className="flex items-center">
                  <div
                    className={`size-2 rounded-full mr-2 ${currentStatusOption.className}`}
                  />
                  {currentStatusOption.label}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <div
                      className={`size-2 rounded-full mr-2 ${option.className}`}
                    />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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

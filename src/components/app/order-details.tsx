import { statusClasses } from '@/app/(app)/orders/order-table-row'
import { DialogContent, DialogTitle } from '../ui/dialog'
import {
  PurchaseOrderDetailDTO,
  PurchaseOrderDTO,
} from '@/dtos/purchaseOrderDTOs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { useProducts } from '@/contexts/products-context'
import { formatPrice } from '@/utils/formatPrice'

interface OrderFormProps {
  mode: 'create' | 'update'
  order: PurchaseOrderDTO
  onClose?: () => void
}

export function OrderDetails({ order, mode, onClose }: OrderFormProps) {
  const { products } = useProducts()
  const statusClass = statusClasses[order.status] || 'bg-gray-300'

  const orderItems: PurchaseOrderDetailDTO[] = order.purchaseOrderDetails.map(
    (product) => {
      return {
        ...product,
        product_id: products?.find((p) => p.product_id === product.product_id)
          ?.product_name,
      }
    },
  )

  return (
    <DialogContent>
      <DialogTitle>Detalhes do pedido</DialogTitle>

      <div className="bg-zinc-900 flex flex-col gap-4 border border-zinc-700 p-4 rounded-md">
        <span>
          <span className="font-bold">Código: </span>
          {order.purchase_order_id}
        </span>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold">Status: </span>
              {order.status}
            </p>
            <div className={`size-2 rounded-full mr-3 ${statusClass}`} />
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold">Data do pedido: </span>
              {new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(order.order_date))}
            </p>
          </div>
        </div>
      </div>
      {/* <h1 className="font-bold text-lg">Itens</h1> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Produto</TableHead>
            <TableHead className="text-center">Quant.</TableHead>
            <TableHead className="text-center">Valor un.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item) => (
            <TableRow key={item.purchase_order_detail_id}>
              <TableCell>{item.product_id}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-center">
                {formatPrice(item.unit_price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  )
}

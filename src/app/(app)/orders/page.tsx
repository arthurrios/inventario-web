import {
  OrderItemStatus,
  OrderItemStatusValues,
  PurchaseOrderDTO,
  PurchaseOrderTableData,
} from '@/dtos/purchaseOrderDTOs'
import { api } from '@/services/api'
import { SupplierDTO } from '@/dtos/supplierDTO'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
} from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'

export async function getOrders() {
  const response = await api('/purchase-order', {
    method: 'GET',
  })

  const purchaseOrders: PurchaseOrderDTO[] = await response.json()

  return purchaseOrders
}
export async function getSuppliers() {
  const response = await api('/supplier', {
    method: 'GET',
  })

  const suppliers: SupplierDTO[] = await response.json()

  return suppliers
}

export default async function OrdersPage() {
  const purchaseOrders = await getOrders()
  const suppliers = await getSuppliers()

  const ordersTableData: PurchaseOrderTableData[] = purchaseOrders.map(
    (order) => {
      const purchaseValue = order.purchaseOrderDetails.reduce((acc, curr) => {
        return acc + curr.quantity * curr.unit_price
      }, 0)

      return {
        ...order,
        supplier_id:
          suppliers.find(
            (supplier) => supplier.supplier_id === order.supplier_id,
          )?.supplier_name || '',
        status: OrderItemStatus[
          order.status as keyof typeof OrderItemStatus
        ] as OrderItemStatusValues,
        purchase_value: purchaseValue,
      }
    },
  )

  console.log(ordersTableData)

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="my-6 font-semibold text-xl">Pedidos</h1>
        {/* <CreateProductButton /> */}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader className="h-16">
            <TableRow>
              <TableHead />
              <TableHead>Código</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-40 text-center">Status</TableHead>
              <TableHead className="text-right w-48">Data do pedido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersTableData.map((order) => {
              return (
                <OrderTableRow key={order.purchase_order_id} order={order} />
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

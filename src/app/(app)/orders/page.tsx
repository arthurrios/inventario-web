import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderTableRow } from './order-table-row'
import { api } from '@/services/api'
import { queryClient } from '@/lib/queryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  PurchaseOrderDTO,
  PurchaseOrderTableData,
  OrderItemStatus,
  OrderItemStatusValues,
} from '@/dtos/purchaseOrderDTOs'
import { SupplierDTO } from '@/dtos/supplierDTO'
import { CreateOrderButton } from '@/components/app/create-order-button'

async function getOrders() {
  const response = await api('/purchase-order', {
    method: 'GET',
  })

  const purchaseOrders: PurchaseOrderDTO[] = await response.json()
  return purchaseOrders
}

async function getSuppliers() {
  const response = await api('/supplier', {
    method: 'GET',
  })

  const suppliers: SupplierDTO[] = await response.json()
  return suppliers
}

export default async function OrdersPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth')
  }

  await queryClient.prefetchQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  await queryClient.prefetchQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  })

  const dehydratedState = dehydrate(queryClient)

  const purchaseOrders = queryClient.getQueryData<PurchaseOrderDTO[]>([
    'orders',
  ])
  const suppliers = queryClient.getQueryData<SupplierDTO[]>(['suppliers'])

  const ordersTableData: PurchaseOrderTableData[] =
    purchaseOrders?.map((order) => {
      const purchaseValue = order.purchaseOrderDetails.reduce((acc, curr) => {
        return acc + curr.quantity * curr.unit_price
      }, 0)

      return {
        ...order,
        supplier_id:
          suppliers?.find(
            (supplier) => supplier.supplier_id === order.supplier_id,
          )?.supplier_name || '',
        status: OrderItemStatus[
          order.status as keyof typeof OrderItemStatus
        ] as OrderItemStatusValues,
        purchase_value: purchaseValue,
      }
    }) || []

  // Sort orders by update_date in descending order (most recent first)
  const sortedOrdersTableData = ordersTableData.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  )

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex justify-between items-center">
        <h1 className="my-6 font-semibold text-xl">Pedidos</h1>
        <CreateOrderButton />
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
            {sortedOrdersTableData.map((order) => (
              <OrderTableRow key={order.purchase_order_id} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
    </HydrationBoundary>
  )
}

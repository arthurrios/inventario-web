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
import { Controller, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

interface OrderFormProps {
  mode?: 'create' | 'update'
  order: PurchaseOrderDTO
  onClose?: () => void
}

type FormValues = {
  [key: string]: number
}

export function OrderDetails({ order, mode, onClose }: OrderFormProps) {
  const { products } = useProducts()
  const queryClient = useQueryClient()

  const statusClass = statusClasses[order.status] || 'bg-gray-300'

  const router = useRouter()

  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [localQuantities, setLocalQuantities] = useState<
    Record<string, number>
  >(
    order.purchaseOrderDetails.reduce(
      (acc, item) => {
        acc[item.purchase_order_detail_id] = item.quantity
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const { control, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: order.purchaseOrderDetails.reduce((acc, item) => {
      acc[`quantity-${item.purchase_order_detail_id}`] = item.quantity
      return acc
    }, {} as FormValues),
  })

  const orderItems: PurchaseOrderDetailDTO[] = order.purchaseOrderDetails.map(
    (product) => ({
      ...product,
      product_id: products?.find((p) => p.product_id === product.product_id)
        ?.product_name,
    }),
  )

  const onSubmit = handleSubmit((data) => {
    // Handle form submission logic, e.g., sending updated data to the server
    console.log('Updated quantities:', data)
    // Perform API request to update quantities
    // Example: api.updateOrderQuantities(order.purchase_order_id, data)
    queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    router.refresh()
  })

  const handleQuantityChange = (itemId: string, value: number) => {
    setLocalQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }))
    setValue(`quantity-${itemId}`, value)
  }

  const handleDelete = (itemId: string) => {
    setLocalQuantities((prev) => {
      const newQuantities = { ...prev }
      delete newQuantities[itemId]
      return newQuantities
    })
    setValue(`quantity-${itemId}`, 0)
  }

  const handleCancel = () => {
    queryClient.invalidateQueries({ queryKey: ['orders'] })
    queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    router.refresh()
    onClose && onClose()
  }

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Produto</TableHead>
            <TableHead className="text-center">Quant.</TableHead>
            <TableHead className="text-center">Valor un.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems
            .filter(
              (item) =>
                localQuantities[item.purchase_order_detail_id] !== undefined,
            )
            .map((item) => (
              <TableRow key={item.purchase_order_detail_id}>
                <TableCell>{item.product_id}</TableCell>
                <TableCell className="text-center">
                  {editingItemId === item.purchase_order_detail_id &&
                  mode === 'update' ? (
                    <Controller
                      name={`quantity-${item.purchase_order_detail_id}`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          className="w-16 text-center"
                          onChange={(e) => {
                            const value = parseFloat(e.currentTarget.value)
                            handleQuantityChange(
                              item.purchase_order_detail_id,
                              value,
                            )
                          }}
                          onBlur={() => {
                            setEditingItemId(null)
                          }}
                          value={
                            localQuantities[item.purchase_order_detail_id] ??
                            field.value
                          } // Ensure the value is updated
                        />
                      )}
                      rules={{ min: 1 }}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        if (mode === 'update') {
                          setEditingItemId(item.purchase_order_detail_id)
                        }
                      }}
                      className="cursor-pointer px-6 py-2"
                    >
                      {localQuantities[item.purchase_order_detail_id] ??
                        item.quantity}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatPrice(item.unit_price)}
                </TableCell>
                {mode === 'update' && (
                  <TableCell>
                    <Button
                      variant="destructive"
                      className="size-8 p-0"
                      onClick={() =>
                        handleDelete(item.purchase_order_detail_id)
                      }
                    >
                      <X size={16} />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {mode === 'update' && (
        <div className="space-y-2">
          <Button className="w-full" onClick={onSubmit}>
            Salvar
          </Button>
          <Button
            variant={'destructive'}
            className="bg-destructive w-full"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      )}
    </DialogContent>
  )
}

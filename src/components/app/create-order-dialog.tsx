import { formatPrice } from '@/utils/formatPrice'
import { DialogContent, DialogTitle } from '../ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button } from '../ui/button'
import { Plus, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useSuppliers } from '@/contexts/suppliers-context'
import { useProducts } from '@/contexts/products-context'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { useCreatePurchaseOrder } from '@/hooks/useCreateProductOrder'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { queryClient } from '@/lib/queryClient'

interface CreateOrderFormProps {
  onClose?: () => void
}

type OrderItem = {
  product_id: string
  quantity: number
  unit_price: number
}

export function CreateOrderDialog({ onClose }: CreateOrderFormProps) {
  const { suppliers } = useSuppliers()
  const { products } = useProducts()
  const { mutate: createPurchaseOrder } = useCreatePurchaseOrder()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const { handleSubmit, control, setValue, watch, reset } = useForm()

  const router = useRouter()

  const selectedProductId = watch('product_id')
  const selectedQuantity = watch('quantity') || 1
  const selectedSupplierId = watch('supplier_id')
  const selectedProduct = products?.find(
    (product) => product.product_id === selectedProductId,
  )

  const totalPrice =
    selectedProduct && selectedQuantity
      ? selectedProduct.unit_price * selectedQuantity
      : 0

  const onSubmit = () => {
    const purchaseOrder = {
      order_date: new Date(),
      supplier_id: selectedSupplierId,
      status: 'PENDENTE',
      purchaseOrderDetails: orderItems.map((item) => ({
        product_id: item.product_id,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
      })),
    }
    console.log(purchaseOrder)

    // Call the mutation function to create the purchase order
    createPurchaseOrder(purchaseOrder, {
      onSuccess: () => {
        toast.success('Pedido criado com sucesso!')
        queryClient.invalidateQueries({ queryKey: ['order'] })
        queryClient.invalidateQueries({ queryKey: ['supplier'] })
        router.refresh()
        if (onClose) onClose()
        // Optionally reset the form or show a success message
        setOrderItems([])
        reset()
      },
      onError: (err) => {
        // Handle error
        console.error('Error creating purchase order:', err)
        toast.error('Erro ao criar pedido!')

        // Optionally show an error message
      },
    })
  }

  const addItemToOrder = () => {
    if (!selectedProduct) return

    const quantity = watch('quantity') || 1
    const newItem: OrderItem = {
      product_id: selectedProduct.product_id,
      quantity,
      unit_price: selectedProduct.unit_price,
    }

    setOrderItems((prevItems) => [...prevItems, newItem])
    setValue('product_id', '')
    setValue('quantity', 1)
  }

  const handleDelete = (productId: string) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.product_id !== productId),
    )
  }

  // Clear table and reset form when the dialog closes
  useEffect(() => {
    if (!onClose) return

    return () => {
      setOrderItems([])
      reset()
    }
  }, [onClose, reset])

  // Disable the create button if no supplier is selected or if there are no products in the table
  const isCreateButtonDisabled = !selectedSupplierId || orderItems.length === 0

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <DialogTitle>Criar pedido</DialogTitle>
        <div className="flex items-center justify-between">
          <h1>Fornecedor</h1>

          <Controller
            name="supplier_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(selectedId) => {
                  field.onChange(selectedId)
                }}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Selecione o fornecedor">
                    {suppliers?.find(
                      (supplier) => supplier.supplier_id === field.value,
                    )?.supplier_name || 'Selecione um fornecedor'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {suppliers?.map((supplier) => (
                    <SelectItem
                      key={supplier.supplier_id}
                      value={supplier.supplier_id}
                    >
                      {supplier.supplier_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-3">
          <h1>Adicione um produto</h1>
          <div className="flex justify-between gap-4 items-center">
            <Controller
              name="product_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(selectedId) => field.onChange(selectedId)}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Selecione o produto">
                      {products?.find(
                        (product) => product.product_id === field.value,
                      )?.product_name || 'Selecione um produto'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem
                        key={product.product_id}
                        value={product.product_id}
                      >
                        {product.product_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              name="quantity"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Input
                  type="number"
                  min={1}
                  className="w-1/6 text-center"
                  {...field}
                />
              )}
            />

            <span className="w-1/6 text-center">
              {selectedProduct ? formatPrice(totalPrice) : '-'}
            </span>

            <Button
              className="size-8 p-0"
              onClick={addItemToOrder}
              type="button"
              disabled={!selectedProductId}
            >
              <Plus />
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Produto</TableHead>
              <TableHead className="text-center">Quant.</TableHead>
              <TableHead className="text-center">Valor</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.product_id}>
                <TableCell>
                  {
                    products?.find(
                      (product) => product.product_id === item.product_id,
                    )?.product_name
                  }
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-center">
                  {formatPrice(item.unit_price * item.quantity)}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    className="size-8 p-0"
                    onClick={() => handleDelete(item.product_id)}
                  >
                    <X size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          type="submit"
          className="w-full"
          disabled={isCreateButtonDisabled}
        >
          Criar Pedido
        </Button>
      </form>
    </DialogContent>
  )
}

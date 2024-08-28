import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OrderStatusString } from '@/dtos/purchaseOrderDTOs'

const statusOptions = [
  { value: 'Pendente', label: 'Pendente', className: 'bg-gray-300' },
  { value: 'Enviado', label: 'Enviado', className: 'bg-yellow-300' },
  { value: 'Entregue', label: 'Entregue', className: 'bg-emerald-300' },
  { value: 'Cancelado', label: 'Cancelado', className: 'bg-red-300' },
]

export function SupplierSelectStatus({
  orderStatus,
}: {
  orderStatus: OrderStatusString
}) {
  const currentStatusOption =
    statusOptions.find((option) => option.value === orderStatus) ||
    statusOptions[0]
  return (
    <Select defaultValue={orderStatus}>
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
              <div className={`size-2 rounded-full mr-2 ${option.className}`} />
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

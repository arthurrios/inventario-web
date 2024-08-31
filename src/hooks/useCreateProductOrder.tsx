import { api } from '@/services/api'
import { useMutation, UseMutationResult } from '@tanstack/react-query'

interface PurchaseOrderResponse {
  success: boolean
  message?: string
}

interface PurchaseOrderDetailDTO {
  product_id: string
  quantity: number
  unit_price: number
}

interface PurchaseOrderDTO {
  purchase_order_id: string
  date: Date
  supplier_id: string
  status: string
  items: PurchaseOrderDetailDTO[]
}

const API_ENDPOINT = '/purchase-order'

// Define the API function using Fetch API
const createPurchaseOrder = async (
  purchaseOrder: PurchaseOrderDTO,
): Promise<PurchaseOrderResponse> => {
  const response = await api(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purchaseOrder),
  })

  console.log(response)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

// Define the hook with types
export const useCreatePurchaseOrder = (): UseMutationResult<
  PurchaseOrderResponse,
  Error,
  PurchaseOrderDTO
> => {
  return useMutation({
    mutationFn: createPurchaseOrder,
  })
}

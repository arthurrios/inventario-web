import { z } from 'zod'

export const purchaseOrderDetailSchema = z.object({
  purchase_order_detail_id: z.string().uuid(),
  purchase_order_id: z.string().uuid(),
  product_id: z.string().uuid().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unit_price: z.number().min(0, 'Unit price must be a positive number'),
  status: z.string().min(1, 'Status is required'),
  created_at: z.date(),
  updated_at: z.date(),
})

export const purchaseOrderTableSchema = z.object({
  purchase_order_id: z.string().uuid(),
  order_date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: 'Invalid date format',
  }),
  supplier_id: z.string().uuid(),
  status: z.enum(['Pending', 'Completed', 'Cancelled']),
  purchase_value: z.number().min(0, 'Purchase value must be a positive number'),
  purchaseOrderDetails: z.array(purchaseOrderDetailSchema),
})

export type PurchaseOrderTableData = z.infer<typeof purchaseOrderTableSchema>
export type PurchaseOrderDetailDTO = z.infer<typeof purchaseOrderDetailSchema>

export interface PurchaseOrderDetailDTO {
  purchase_order_detail_id: string
  purchase_order_id: string
  product_id: string
  quantity: number
  unit_price: number
  status: string
  created_at: Date
  updated_at: Date
}

export enum OrderItemStatus {
  PENDENTE = 'Pendente',
  ENVIADO = 'Enviado',
  ENTREGUE = 'Entregue',
  CANCELADO = 'Cancelado',
}
export interface PurchaseOrderDTO {
  purchase_order_id: string
  order_date: Date
  supplier_id: string
  status: keyof typeof OrderItemStatus
  purchaseOrderDetails: PurchaseOrderDetailDTO[]
  purchase_value: number
}

export interface PurchaseOrderTableData {
  purchase_order_id: string
  order_date: string // Formatted date as a string
  supplier_id: string
  status: string
  purchase_value: number
  purchaseOrderDetails: PurchaseOrderDetailDTO[]
}

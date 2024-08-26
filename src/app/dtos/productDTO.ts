import { CategoryDTO } from './categoryDTO'

export interface ProductDTO {
  product_id: string
  code: string
  product_name: string
  description: string
  unit_price: number
  quantity_in_stock: number
  category_id: string
  category?: CategoryDTO
}

import { ProductFormValues } from '@/components/app/product-details'
import { api } from './api'

export async function updateProduct(
  productId: string,
  data: ProductFormValues,
) {
  console.log(data)

  const response = await api(`/product/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to update product')
  }
  return response.json()
}

export async function createProduct(data: ProductFormValues) {
  const response = await api('/product', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to create product')
  }
  return response.json()
}

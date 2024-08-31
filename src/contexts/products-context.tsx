'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProductDTO } from '@/dtos/productDTO'
import { api } from '@/services/api'

interface ProductsContextProps {
  products: ProductDTO[] | undefined
  isLoading: boolean
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const { data: products, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: getProducts,
  })

  return (
    <ProductsContext.Provider value={{ products, isLoading }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

async function getProducts() {
  const response = await api('/product', {
    method: 'GET',
  })

  const products: ProductDTO[] = await response.json()

  return products
}

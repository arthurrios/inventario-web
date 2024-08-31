'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
import { api } from '@/services/api'

interface OrdersContextProps {
  orders: PurchaseOrderDTO[] | undefined
  isLoading: boolean
}

const OrdersContext = createContext<OrdersContextProps | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['order'],
    queryFn: getOrders,
  })

  return (
    <OrdersContext.Provider value={{ orders, isLoading }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders must be used within a OrdersProvider')
  }
  return context
}

async function getOrders() {
  const response = await api('/purchase-order', {
    method: 'GET',
  })

  const purchaseOrders: PurchaseOrderDTO[] = await response.json()
  return purchaseOrders
}

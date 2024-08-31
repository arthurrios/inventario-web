'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
import { getOrders } from '@/app/(app)/orders/page'

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

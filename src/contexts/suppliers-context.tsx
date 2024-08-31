'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SupplierDTO } from '@/dtos/supplierDTO'
import { getSuppliers } from '@/app/(app)/orders/page'

interface SuppliersContextProps {
  suppliers: SupplierDTO[] | undefined
  isLoading: boolean
}

const SuppliersContext = createContext<SuppliersContextProps | undefined>(
  undefined,
)

export function SuppliersProvider({ children }: { children: ReactNode }) {
  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['supplier'],
    queryFn: getSuppliers,
  })

  return (
    <SuppliersContext.Provider value={{ suppliers, isLoading }}>
      {children}
    </SuppliersContext.Provider>
  )
}

export function useSuppliers() {
  const context = useContext(SuppliersContext)
  if (!context) {
    throw new Error('useSuppliers must be used within a SuppliersProvider')
  }
  return context
}

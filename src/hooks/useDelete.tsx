'use client'

import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useDelete(endpoint: string) {
  const router = useRouter()

  return useMutation({
    mutationFn: async (itemId: string) => {
      try {
        const response = await api(`${endpoint}/${itemId}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          // Attempt to parse the response body to get more error details
          const errorBody = await response.text()
          console.error('Error Response:', errorBody)
          throw new Error(`${response.status}`)
        }
        return response.json()
      } catch (error) {
        console.error('Request Failed:', error)
        throw error
      }
    },
    onSuccess: () => {
      router.refresh()
      toast.success('Item deletado com sucesso!')
    },
    onError: (error) => {
      console.log(error)
      if (error.message === '409') {
        toast.error('Item está associado a uma compra')
      } else {
        toast.error('Erro ao apagar item')
      }
    },
  })
}

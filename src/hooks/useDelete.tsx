'use client'

import { toast } from '@/components/ui/use-toast'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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
          throw new Error(`Erro ao apagar item: ${response.statusText}`)
        }

        // Optionally parse the response if needed
        // return await response.json()
        return null // or appropriate value based on your API response
      } catch (error) {
        console.error('Request Failed:', error)
        throw error
      }
    },
    onSuccess: () => {
      router.refresh()
      toast({
        variant: 'success',
        title: 'Item deletado com sucesso!',
      })
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao apagar item',
        description:
          error instanceof Error ? error.message : 'Erro desconhecido',
      })
    },
  })
}

'use client'

import { X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { useDelete } from '@/hooks/useDelete'

interface DeleteButtonProps {
  itemId: string
  endpoint: string
}

export function DeleteButton({ itemId, endpoint }: DeleteButtonProps) {
  const { mutate: deleteItem } = useDelete(endpoint)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="size-8 p-0">
          <X size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja apagar este item?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant={'destructive'}
            className="bg-destructive"
            onClick={() => deleteItem(itemId)}
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

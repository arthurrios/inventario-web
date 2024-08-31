'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import { CreateOrderDialog } from './create-order-dialog'

export function CreateOrderButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCloseDialog = () => setIsDialogOpen(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Button>
          Criar
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <CreateOrderDialog onClose={handleCloseDialog} />
    </Dialog>
  )
}

'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'
import { useState } from 'react'

export function CreateProductButton() {
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
      <ProductDetails mode="create" onClose={handleCloseDialog} />
    </Dialog>
  )
}

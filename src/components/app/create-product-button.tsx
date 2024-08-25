'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'

export function CreateProductButton() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2" asChild>
        <Button>
          Criar
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <ProductDetails mode="create" />
    </Dialog>
  )
}

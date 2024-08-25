'use client'

import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'
import { ProductDTO } from '@/app/dtos/productDTO'
import { useState } from 'react'

export interface DetailsButtonProps {
  product: ProductDTO
}

export function DetailsButton({ product }: DetailsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCloseDialog = () => setIsDialogOpen(false)

  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Search size={16} />
        </DialogTrigger>
        <ProductDetails product={product} onClose={handleCloseDialog} />
      </Dialog>
    </Button>
  )
}

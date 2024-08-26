'use client'

import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'
import { useState } from 'react'
import { ProductDTO } from '@/dtos/productDTO'

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
        <ProductDetails
          product={product}
          onClose={handleCloseDialog}
          mode="update"
        />
      </Dialog>
    </Button>
  )
}

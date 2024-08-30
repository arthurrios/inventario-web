'use client'

import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'
import { useState } from 'react'
import { ProductDTO } from '@/dtos/productDTO'
import { PurchaseOrderDTO } from '@/dtos/purchaseOrderDTOs'
import { OrderDetails } from './order-details'

export interface DetailsButtonProps {
  product?: ProductDTO
  order?: PurchaseOrderDTO
}

export function DetailsButton({ product, order }: DetailsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCloseDialog = () => setIsDialogOpen(false)

  const canUpdateOrder = order?.status === 'Pendente'

  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Search size={16} />
        </DialogTrigger>
        {product && (
          <ProductDetails
            product={product}
            onClose={handleCloseDialog}
            mode="update"
          />
        )}
        {order && (
          <OrderDetails
            order={order}
            onClose={handleCloseDialog}
            mode={canUpdateOrder ? 'update' : undefined}
          />
        )}
      </Dialog>
    </Button>
  )
}

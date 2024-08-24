import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'

export interface DetailsButtonProps {
  productId: string
}

export function DetailsButton({ productId }: DetailsButtonProps) {
  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Dialog>
        <DialogTrigger asChild>
          <Search size={16} />
        </DialogTrigger>
        <ProductDetails productId={productId} />
      </Dialog>
    </Button>
  )
}

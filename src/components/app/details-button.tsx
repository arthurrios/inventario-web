import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import { ProductDetails } from './product-details'
import { ProductDTO } from '@/app/dtos/productDTO'

export interface DetailsButtonProps {
  product: ProductDTO
}

export function DetailsButton({ product }: DetailsButtonProps) {
  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Dialog>
        <DialogTrigger asChild>
          <Search size={16} />
        </DialogTrigger>
        <ProductDetails product={product} />
      </Dialog>
    </Button>
  )
}

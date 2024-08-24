import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { Dialog, DialogTrigger } from '../ui/dialog'
export function DetailsButton() {
  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Dialog>
        <DialogTrigger asChild>
          <Search size={16} />
        </DialogTrigger>
      </Dialog>
    </Button>
  )
}

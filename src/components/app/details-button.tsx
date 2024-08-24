import { Button } from '../ui/button'
import { Search } from 'lucide-react'
export function DetailsButton() {
  return (
    <Button variant={'outline'} className="size-8 p-0">
      <Search size={16} />
    </Button>
  )
}

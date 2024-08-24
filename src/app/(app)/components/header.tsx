import { LogoutButton } from '@/components/app/logout-button'
import { Separator } from '@/components/ui/separator'
import { Session } from 'next-auth'

interface HeaderProps {
  session: Session
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="flex mx-auto max-w-7xl pt-8">
      <div className="bg-zinc-900 border border-zinc-300 w-full flex items-center justify-between p-4 rounded-md">
        <h1 className="text-lg font-semibold leading-3">inventory</h1>
        <div className="flex items-center h-full">
          <p className="font-medium">{session?.user?.name}</p>
          <Separator orientation="vertical" className="mx-4" />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

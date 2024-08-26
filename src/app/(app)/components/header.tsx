import { LogoutButton } from '@/components/app/logout-button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Box, ShoppingBag } from 'lucide-react'
import { Session } from 'next-auth'
import Link from 'next/link'

interface HeaderProps {
  session: Session
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="flex pt-8 mb-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full flex items-center justify-between p-4 rounded-md">
        <NavigationMenu>
          <NavigationMenuList className="space-x-8">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <h1 className="text-lg font-semibold leading-3">inventory</h1>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <div className="flex items-center gap-6">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2">
                    <h1>Produtos</h1>
                    <Box size={20} />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/orders" legacyBehavior passHref>
                  <NavigationMenuLink className="flex items-center gap-2">
                    <h1>Pedidos</h1>
                    <ShoppingBag size={20} />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center h-full">
          <p className="font-medium">{session?.user?.name}</p>
          <Separator orientation="vertical" className="mx-4" />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

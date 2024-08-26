import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { Header } from './components/header'
import { auth } from '@/lib/auth'

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/auth')
  }
  return (
    <div className="h-screen bg-black mx-auto max-w-7xl">
      <Header session={session} />
      {children}
    </div>
  )
}

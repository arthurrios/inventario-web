import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Header } from './components/header'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="h-screen bg-black">
      <Header session={session} />

      <div></div>
    </div>
  )
}

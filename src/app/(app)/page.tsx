import { LogoutButton } from '@/components/app/logout-button'
import { auth } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()

  if (!session) {
    redirect('/auth')
  }

  return (
    <div>
      <h1>Google OAuth with NestJS and Next.js</h1>

      <div>
        <p>Welcome, {session?.user?.name}</p>
        <Image src={session?.user?.avatar_url ?? ''} alt="Profile" />
        <LogoutButton />
      </div>
    </div>
  )
}

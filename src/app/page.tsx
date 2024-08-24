import { LoginButton } from '@/components/login-button'
import { LogoutButton } from '@/components/logout-button'
import { auth } from '@/lib/auth'
import Image from 'next/image'

export default async function Home() {
  const session = await auth()
  console.log(session)

  return (
    <div>
      <h1>Google OAuth with NestJS and Next.js</h1>
      {!session?.user ? (
        <LoginButton />
      ) : (
        <div>
          <p>Welcome, {session?.user?.name}</p>
          <Image src={session?.user?.avatar_url ?? ''} alt="Profile" />
          <LogoutButton />
        </div>
      )}
    </div>
  )
}

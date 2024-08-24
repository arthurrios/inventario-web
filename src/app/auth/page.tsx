import { LoginButton } from '@/components/app/login-button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Auth() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <div>
      <h1>Google OAuth with NestJS and Next.js</h1>
      <LoginButton />
    </div>
  )
}

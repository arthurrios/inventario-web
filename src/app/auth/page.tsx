import { LoginButton } from '@/components/app/login-button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Auth() {
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <main className="flex flex-col gap-10 -mt-12">
        <h1 className="text-6xl">inventory</h1>
        <LoginButton />
      </main>
    </div>
  )
}

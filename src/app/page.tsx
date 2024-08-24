'use client'

import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()
  console.log(session)

  async function handleLogin() {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLogout() {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Google OAuth with NestJS and Next.js</h1>
      {!session?.data?.user ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <p>Welcome, {session?.data?.user?.name}</p>
          <Image src={session.data.user.avatar_url} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

'use client'

import { signIn } from 'next-auth/react'

// import { useRouter } from 'next/navigation'

export function LoginButton() {
  async function handleLogin() {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleLogin}>Login with Google</button>
}

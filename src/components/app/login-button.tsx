'use client'

import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

// import { useRouter } from 'next/navigation'

export function LoginButton() {
  async function handleLogin() {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  return <Button onClick={handleLogin}>Login with Google</Button>
}

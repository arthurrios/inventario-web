'use client'

import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'
import Image from 'next/image'
import GoogleLogo from '@/assets/google-logo.svg'

export function LoginButton() {
  async function handleLogin() {
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button variant={'secondary'} className="py-8 gap-4" onClick={handleLogin}>
      <Image src={GoogleLogo} height={30} width={30} alt="Google Logo" />
      <p className="text-lg">Login with Google</p>
    </Button>
  )
}

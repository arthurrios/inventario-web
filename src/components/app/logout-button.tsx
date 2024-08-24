'use client'

import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export function LogoutButton() {
  async function handleLogout() {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button variant={'outline'} onClick={handleLogout}>
      Logout
    </Button>
  )
}

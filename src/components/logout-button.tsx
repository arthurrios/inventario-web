'use client'

import { signOut } from 'next-auth/react'

export function LogoutButton() {
  async function handleLogout() {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

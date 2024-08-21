'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    // Clear user and token
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')

    // Optionally, notify the backend to invalidate the session
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    router.push('/') // Redirect to home or login page
  }

  return <button onClick={handleLogout}>Logout</button>
}

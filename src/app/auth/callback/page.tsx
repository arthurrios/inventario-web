'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('token')

      if (token) {
        localStorage.setItem('access_token', token)

        // Fetch user details from backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        const user = await response.json()
        localStorage.setItem('user', JSON.stringify(user))

        router.push('/') // Redirect to home or main page
      }
    }

    fetchUser()
  }, [router])

  return <div>Loading...</div>
}

'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LoginButton } from '../components/login-button'
import { LogoutButton } from '../components/logout-button'

type User = {
  id: string
  name: string
  email: string
  profilePicture: string
  type: string // Include the user type
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if the user is stored in local storage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div>
      <h1>Google OAuth with NestJS and Next.js</h1>
      {!user ? (
        <LoginButton />
      ) : (
        <div>
          <p>Welcome, {user.name}</p>
          <Image src={user.profilePicture} alt="Profile" />
          <LogoutButton />
        </div>
      )}
    </div>
  )
}

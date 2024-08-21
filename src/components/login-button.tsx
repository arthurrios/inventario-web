'use client'

// import { useRouter } from 'next/navigation'

export function LoginButton() {
  // const router = useRouter()

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`
  }

  return <button onClick={handleLogin}>Login with Google</button>
}

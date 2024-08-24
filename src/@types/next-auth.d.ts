import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      avatar_url: string
    } & DefaultSession['user']
  }

  interface User {
    name: string
    avatar_url: string
  }
}

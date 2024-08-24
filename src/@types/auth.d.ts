/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module '@auth/core/types' {
  interface User {
    name: string
    avatar_url: string
  }
}

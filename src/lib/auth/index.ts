import { api } from '@/services/api'
import NextAuth, { NextAuthConfig } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export const BASE_PATH = '/api/auth'

const authOptions: NextAuthConfig = {
  basePath: BASE_PATH,

  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        const response = await api('/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
          }),
        })

        if (response.ok) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('Error syncing user with NestJS:', error)
        return false // Deny sign in if an error occurs      }
      }
    },
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          avatar_url: user.avatar_url,
        },
      }
    },
  },
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)

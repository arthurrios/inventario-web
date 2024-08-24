import '@auth/core'

declare module '@auth/core/types' {
  interface User {
    name: string
    avatar_url: string
  }
}

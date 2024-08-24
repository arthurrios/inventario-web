export function api(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}

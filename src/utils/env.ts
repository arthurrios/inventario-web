export const getBackendUrl = (): string => {
  // Use the environment variable directly
  return process.env.NEXT_PUBLIC_BACKEND_URL || ''
}

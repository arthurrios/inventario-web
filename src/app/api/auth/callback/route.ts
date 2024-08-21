import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (token) {
    // Store the token in local storage
    // Ideally, redirect to a client-side route where you handle this logic
    return NextResponse.redirect('/auth/callback?token=' + token)
  }

  return NextResponse.redirect('/')
}

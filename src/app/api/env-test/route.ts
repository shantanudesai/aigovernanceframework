import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    // Only show that the token exists, not its value
    KV_REST_API_TOKEN_EXISTS: !!process.env.KV_REST_API_TOKEN
  });
} 
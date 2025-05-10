import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // Try to set a test value
    await redis.set('test-key', 'test-value');
    
    // Try to get the test value
    const value = await redis.get('test-key');
    
    // Delete the test value
    await redis.del('test-key');
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Redis connection working',
      testValue: value 
    });
  } catch (error) {
    console.error('Redis connection test failed:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Redis connection failed',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 
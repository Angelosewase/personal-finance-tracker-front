import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // This is a placeholder. In a real app, fetch the user from a database
    // and verify the password
    if (email === 'user@example.com' && 
        await verifyPassword(password, 'hashed_password')) {
      const user = {
        id: '1',
        email,
        name: 'Test User',
      };

      const token = generateToken({ sub: user.id });

      return NextResponse.json({
        success: true,
        user,
        token,
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
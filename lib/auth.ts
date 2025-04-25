import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * Hashes a password using a secure hashing algorithm
 */
export async function hashPassword(password: string): Promise<string> {
  // This is a placeholder. In a real app, use a proper hashing library like bcrypt
  return `hashed_${password}`;
}

/**
 * Verifies a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // This is a placeholder. In a real app, use a proper verification method
  return hash === `hashed_${password}`;
}

/**
 * Generates a JWT token
 */
export function generateToken(payload: any): string {
  // This is a placeholder. In a real app, use a proper JWT library
  return `token_${JSON.stringify(payload)}`;
}

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // This is a placeholder. In a real app, fetch the user from a database
        // and verify the password
        if (credentials.email === 'user@example.com' && 
            await verifyPassword(credentials.password, 'hashed_password')) {
          return {
            id: '1',
            email: credentials.email,
            name: 'Test User',
          };
        }

        return null;
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user = { 
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        };
      }
      return session;
    },
  },
};
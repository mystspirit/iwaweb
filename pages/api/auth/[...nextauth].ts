import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with real user lookup
        if (credentials?.email === 'demo@demo.com' && credentials?.password === 'demo') {
          return { id: '1', name: 'Demo User', email: 'demo@demo.com' };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/account/login',
    signOut: '/account/logout',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

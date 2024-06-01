import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import axiosErrorFormatter from '@/lib/axiosErrorFormattor';
import { API_BASE } from '@/app/constants';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      authorize: async (credentials: any) => {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          }); 
          return {...data};         
        } catch (error) {
          let e = axiosErrorFormatter(error);
          
          throw new Error(e);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user};
    },
    async session({ session, token}) {
      if (session?.user) return {...session, user: {...session.user, ...token}};
      return session;
    },
  },
  pages: {
    signIn: "/auth/login"
  }
};

export default authOptions;
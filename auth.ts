import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { type User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt'; 
import { DefaultSession } from "next-auth";
import DefaultUser from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {

  interface User {
    id?: string;
    role: string;
    admin: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    admin: string;
  }
}

async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      // console.log("Fetched User from DB:", user.rows[0]); // Debugging
      // test

      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
            var { email, password } = parsedCredentials.data;
            email = email.toLowerCase();
            const user = await getUser(email);
            if (!user) {
              // console.log("no user");
              return null;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
              // console.log("Auth User:", user);
              return user;
            } 
            else{
              // console.log("Passwords do not match!");
            }
        } else {
          // console.log("Parsed:", parsedCredentials.error);
        }

        // console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (user.id) {
          token.id = user.id; // Ensure the token gets the user ID
        }
        // console.log("jwt user:", user);
        // console.log("jwt token before id:", token);
        // console.log("jwt token after id:", token);
        token.role = user.role;
        token.admin = user.admin;
      }
      // console.log("JWT Token:", token); // Debugging
      return token;
    },
    async session({ session, token }) {
      // console.log("token:", token);
      if (token.id) {
        session.user.id = token.id as string; // Explicitly cast token.id to string
      }
      if (token.role) {
        // console.log("token role:", token.role);
        session.user.role = token.role as string;
      }
      if (token.admin) {
        // console.log("token admin:", token.admin);
        session.user.admin = token.admin as string;
      }
      // console.log("session user:", session.user);
      // console.log("JWT Session:", session);
      return session;
    }
  }
}); 
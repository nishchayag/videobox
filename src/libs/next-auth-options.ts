import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@123.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email/password input value");
        }
        try {
          await connectDB();
          const userInDB = await userModel.findOne({
            email: credentials.email,
          });
          if (!userInDB) {
            throw new Error(
              "User does not exist! Please provide a valid email, or proceed to sign-up page"
            );
          }
          const isValid = bcrypt.compare(
            credentials.password,
            userInDB.password
          );
          if (!isValid) {
            throw new Error("Incorrect password");
          }
          return {
            id: userInDB._id.toString(),
            email: userInDB.email.toString(),
          };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: nextAuthSecret,
};

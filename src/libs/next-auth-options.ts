import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { connectDB } from "./db";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
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
};

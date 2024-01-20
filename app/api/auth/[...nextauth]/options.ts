import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { db } from "@/app/db";
import { compare, hash } from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
          name: profile.name,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // handle Auth
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          image: "",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (dbUser) {
        await db.user.update({
          where: {
            email: token.email,
          },
          data: {
            id: token.id,
            username: token.name,
            email: token.email,
          },
        });
      } else {
        const hashedPassword = await hash("dummypassword", 10);
        await db.user.create({
          data: {
            id: token.id,
            email: token.email,
            username: token.name,
            password: hashedPassword,
          },
        });
      }

      if (session?.user) {
        session.user.id = token.id;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signinregister",
  },
};

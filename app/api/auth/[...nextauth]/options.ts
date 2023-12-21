import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import { db } from "@/app/db";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      // if user exists will come
      const dbUser = await db.user.findUnique({
        where: {
          id: token.id,
        },
      });

      // if doesnot exists then will be created in the db
      if (!dbUser) {
        await db.user.create({
          data: {
            id: token.id,
            email: token.email,
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
};

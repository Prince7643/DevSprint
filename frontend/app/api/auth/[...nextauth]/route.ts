import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { axiosIntance } from "@/lib/axios"


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {
        const res = await axiosIntance.post("/auth/manual-login", credentials)
        if (!res) return null

        const data = await res.data
        return data.user
      }
    })
  ],

  // IMPORTANT → callbacks must be nested inside "callbacks"
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const idToken = account.id_token;

        const response = await axiosIntance.post(
          "/auth/google-login",
          { token: idToken },
          { withCredentials: true }
        );
        const data = await response.data

        // override NextAuth user → THIS IS IMPORTANT
        user.id = data.user._id;
        user.profile = data.user.profile;
        user.contact = data.user.contact;
        user.status = data.user.status;
        user._createdDate = data.user._createdDate;
        user._updatedDate = data.user._updatedDate;
        user.lastLoginDate=data.user.lastLoginDate;
        user.isPro=data.user.isPro;
        user.proExpirationDate=data.user.proExpirationDate;
        user.limitations=data.user.limitations;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }

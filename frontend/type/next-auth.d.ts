// --- IMPORTANT: Add this file if you don't have it ---
// types/next-auth.d.ts   (or app/types/next-auth.d.ts)

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string          // MongoDB _id
       password?: string | null | undefined,
      loginEmailVerified?: boolean
      status?:string,
      contact?: {
        firstName?:string 
        lastName?: string 
        phones?:string
      },
      profile?: {
        nickname?:string
        photo?: {
          url?: string
          height?: number
          width?: number
          offsetX?:number
          offsetY?: number
        },
        title?: string
      },
      limitations?: {
        maxSprints: number,
        maxAiTasksPerSprint: number
      },
      isPro?:boolean,
      proExpirationDate?:Date,
      _createdDate?:Date
      _updatedDate?: Date
      lastLoginDate?:Date
      [key: string]: any  // fallback
    }
  }

  interface User {
    id: string
    email: string
      name: string
      image?: string
       password?: string | null | undefined,
  loginEmailVerified?: boolean
  status?:string,
  contact?: {
    firstName?:string 
    lastName?: string 
    phones?:string
  },
  profile?: {
    nickname?:string
    photo?: {
      url?: string
      height?: number
      width?: number
      offsetX?:number
      offsetY?: number
    },
    title?: string
  },
  _createdDate?:Date
  _updatedDate?: Date
  lastLoginDate?:Date
    [key: string]: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: string
      // Put the same full user shape here
      [key: string]: any
    }
  }
}
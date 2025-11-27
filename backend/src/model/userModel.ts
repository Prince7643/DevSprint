import mongoose from "mongoose"

interface Member extends Document{
  name?: string | null | undefined,
  email?: string | null | undefined,
  password?: string | null | undefined,
  loginEmailVerified?: boolean
  status?:string,
  contact: {
    firstName: String,
    lastName: String,
    phones: String
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
  limitations: {
    maxSprints: number,
    maxAiTasksPerSprint: number
  },
  isPro:boolean,
  proExpirationDate?:Date,
  _createdDate?:Date
  _updatedDate?: Date
  lastLoginDate?:Date
}

const userSchema = new mongoose.Schema<Member>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  loginEmailVerified: Boolean,
  status: String,
  contact: {
    firstName: String,
    lastName: String,
    phones: String
  },
  profile: {
    nickname: String,
    photo: {
      url: String,
    },
    title: String
  },
  limitations: {
    maxSprints: { type: Number, default: 5 },
    maxAiTasksPerSprint: { type: Number, default: 10 }
  },
  isPro: { type: Boolean, default: false },
  proExpirationDate: Date,
  _createdDate: Date,
  _updatedDate: Date,
  lastLoginDate: Date
})

export const User = mongoose.model("User", userSchema)

import bcrypt from "bcrypt"
import Stripe from "stripe";
import { Request, Response } from "express"
import { verifyGoogleToken } from "../utils/verfyGoogleToken"
import { User } from "../model/userModel"
import { generateToken } from "../utils/gernateToken"
import dotenv from "dotenv";
dotenv.config();

export const googleLogin = async (req:Request, res:Response) => {
  try {
    const { token } = req.body
    const payload = await verifyGoogleToken(token)

    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" })
    }

    const { email, name } = payload
    const picture = (payload as any).picture
    const fullName = payload.name?.trim() || "";
    const parts = fullName.split(/\s+/);

    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name,
        email,
        status: "APPROVED",
        contact: {
          firstName,
          lastName,
          phones: ""
        },
        profile: {
          nickname: firstName,
          photo: {
            url: picture
          }
        },
        loginEmailVerified:true,
        _createdDate: new Date(),
        _updatedDate: new Date(),
        lastLoginDate: new Date(),
      })
    }else{
      user.lastLoginDate=new Date(),
      user._updatedDate=new Date()
      await user.save()
    }
    
    return res.json({ user })
  } catch (err) {
    return res.status(400).json({ message: "Invalid Google token" })
  }
}

export const manualLogin = async (req: Request, res:Response) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ message: "Missing fields" })

  const user = await User.findOne({ email })
  if (!user) return res.status(404).json({ message: "User not found" })
  if (!user.password) return res.status(400).json({ message: "Invalid user data" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: "Wrong password" })
  generateToken(user._id.toString(),res)      

  return res.json({ user })
}

export const manualSignup = async (req:Request, res:Response) => {
  const { name, email, password } = req.body

  const exist = await User.findOne({ email })
  if (exist) return res.status(400).json({ message: "Email already exists" })

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashed,
    provider: "credentials"
  })

  return res.json({ user })
}

export const checkAuth = (req: Request & { user?: any }, res: Response) => {
  try {
    const user = req.user
    if (!user) return res.status(401).json({ message: "Unauthorized" })
    return res.status(200).json({ user })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token")
  return res.json({ message: "Logged out" })
}



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const { userId, price, productName } = req.body;

    if (!userId || !price || !productName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        userId,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: productName },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
    });
    if (session.url===undefined) {
      return res.status(500).json({ error: "Payment session error" });
    }else{
      const user=await User.findByIdAndUpdate(userId,{isPro:true, proExpirationDate: new Date(Date.now() + 30*24*60*60*1000)},{new:true})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
    }
    return res.json({susses:true, url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Payment session error" });
  }
}


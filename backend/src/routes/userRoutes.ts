import express from "express"
import { googleLogin, manualLogin, manualSignup, checkAuth, createCheckoutSession } from "../controllers/userController"
import protect from "../middleware/proctect"

const userRouter = express.Router()

userRouter.post("/auth/google-login", googleLogin)
userRouter.post("/auth/manual-login", manualLogin)
userRouter.post("/auth/manual-signup", manualSignup)
userRouter.get('/auth/me',protect,checkAuth)
userRouter.post('/auth/payment/create-checkout-session',protect, createCheckoutSession)


export default userRouter

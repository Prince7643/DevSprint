'use client'
import { signOut, signIn, getSession } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/useStore"
import { axiosIntance } from "@/lib/axios"

const signInSchema=z.object({
    email:z.string().email('Invalid email address'),
    password:z.string().min(6,'Password must be at least 6 characters')
})
const signUpSchema=z.object({
    firstName:z.string().min(2, 'First name must be at least 2 characters'),
    lastName:z.string().min(2, 'Last name must be at least 2 characters'),
    email:z.string().email('Invalid email address'),
    password:z.string().min(6,'Password must be at least 6 characters')
})
type SignUptData=z.infer<typeof signUpSchema>
type SignInData=z.infer<typeof signInSchema>
export const useAuth=()=>{
    const router=useRouter()
    const [isLoading,setIsLoading]=useState(false)
    const {setIsAuthenticated,setUser}=useUserStore()
    const signInForm=useForm<SignInData>({
        resolver:zodResolver(signInSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })
    const signUpForm=useForm<SignUptData>({
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            email:"",
            password:""
        }
    })
    const handleSignIn=async (data:SignInData) => {
        setIsLoading(true)
        try {
            const result=await signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false
            })
            setIsLoading(false)
            if(!result?.ok){
                throw new Error('Invalid credentials')
            }
            const session= await getSession();
            if(session?.user){
                setUser(session.user)
                setIsAuthenticated(true)
            }
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            router.push('/auth/sign-up')
        }

    }
    const handleSignUp=async (data:SignUptData) => {
        try {
            setIsLoading(true)
            const result = await signIn('credentials',{
                email:data.email,
                password:data.password,
                redirect:false
            })
            if(!result?.ok){
                throw new Error('Invalid credentials')
            }
            setIsLoading(false)
            const session=await getSession()
            if(session?.user){
                setUser(session.user)
                setIsAuthenticated(true)
            }
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            router.push('/auth/sign-up')
        }
    }
    const handleSignOut=async () => {
        setIsLoading(true)
        await signOut()
        .finally(()=>setIsLoading(false))
        setIsAuthenticated(false)
        setUser(undefined)
    }
    const createPayment = async (userId: string, price: number) => {
        try {

            const response = await axiosIntance.post("/auth/payment/create-checkout-session", {
            userId,
            price: price, // $4.99
            productName: "Pro Access",
            });

            window.location.href = response.data.url;
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return{
        isLoading,
        signInForm,
        signUpForm,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        setIsLoading,
        createPayment
    }
}
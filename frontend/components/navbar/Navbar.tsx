'use client'
import { useUserStore } from '@/store/useStore'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useAuth } from '@/hooks/user-auth'
import { useRouter } from 'next/navigation'
import { ModeToggle } from '../ui/ModeToggle'
import { CrownIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
const Navbar = () => {
  const {
    isAuthenticated,
    user
  }=useUserStore()
  const {handleSignOut ,isLoading}=useAuth();
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-primary/10">
        <nav className="max-w-480 mx-auto px-6 lg:px-12 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href={'/'} className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-heading text-xl">DS</span>
                          </div>
                          <span className="font-heading text-xl text-primary hidden sm:inline">DevSprint</span>
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link 
                        href={'/'} 
                        className={`font-paragraph text-sm transition-colors ${
                            'text-foreground/70 hover:text-primary'
                        }`}
                          >
                            Home
                    </Link>
                    <a 
                        href="/#features" 
                        className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                          >
                        Features
                    </a>
                                        <a 
                        href="/#pricing" 
                        className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                          >
                        Pricing
                    </a>
                    {isAuthenticated && (
                        <>
                            <Link 
                                href={"/dashboard"} 
                                className={`font-paragraph text-sm transition-colors ${
                                  'text-foreground/70 hover:text-primary'
                            }`}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                href={"/dashboard/skills"} 
                                className={`font-paragraph text-sm transition-colors ${
                                  'text-foreground/70 hover:text-primary'
                             }`}
                            >
                                Skill Map
                            </Link>
                        </>
                        )}
                </div>
                {/* User Actions */}
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-3'>
                  {!user?.isPro
                    ?
                    <a href="/#pricing"><CrownIcon className='text-yellow-400'/></a>
                    :
                    <motion.div
                    
                      animate={{
                        filter: [
                          "drop-shadow(0 0 5px #fbff0d)",
                          "drop-shadow(0 0 10px #fbff0d)",
                          "drop-shadow(0 0 5px #fbff0d)",
                        ],
                        scale: [1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease:"circInOut"
                      }}
                      className="inline-block mr-2 items-center justify-center"
                    >
                      <CrownIcon onClick={()=>{toast("You are a Pro user!")}} fill='gold' className="text-yellow-500 size-8 " />
                    </motion.div>
                  }
                    <ModeToggle></ModeToggle>
                </div>
                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3 ">
                    {!isAuthenticated && !isLoading && (
                        <>
                          <Button
                            onClick={()=>router.push('/user/sign-in')} 
                            variant="ghost" 
                            className="font-paragraph text-sm hover:bg-secondary/20"
                          >
                              Log In
                          </Button>
                          <Button
                            onClick={()=>router.push('/user/sign-up')} 
                            className="font-paragraph text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                              Get Started
                          </Button>
                        </>
                        )}
                        {isAuthenticated && (
                          <>
                            <Link href={"/dashboard/profile"}>
                              <Button variant="ghost" className="font-paragraph text-sm hover:bg-secondary/20">
                                {user?.name||'Profile'}
                              </Button>
                            </Link>
                            <Button 
                              onClick={() => handleSignOut()}
                              variant="outline" 
                              className="font-paragraph text-sm hover:bg-secondary/20"
                            >
                              Sign Out
                            </Button>
                          </>
                        )}
                </div>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
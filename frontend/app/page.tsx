'use client'
import { Button } from '@/components/ui/button';
import { Code2, Target, Zap, BookOpen, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/dist/client/link';
import { useUserStore } from '@/store/useStore';
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Pricing from '@/components/ui/pricing';

export default function HomePage() {
  const {isAuthenticated , user}=useUserStore();
    const router = useRouter();
  
  return (
    <div className="bg-background">
      <Navbar></Navbar>
      {/* Hero Section - Full Bleed */}
      <section className="w-full max-w-480 mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-1">
                <Code2 className="w-4 h-4 text-black" />
                <span className="font-paragraph text-sm text-black">Developers</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-2">
                <Target className="w-4 h-4 text-black" />
                <span className="font-paragraph text-sm text-black">Goal-Oriented</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-chart-1">
                <Zap className="w-4 h-4 text-black" />
                <span className="font-paragraph text-sm text-black">Sprint-Based</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="font-paragraph text-base text-foreground/70">
              Accelerate Your Development Journey
            </p>

            {/* Main Heading */}
            <h1 className="font-extrabold text-5xl lg:text-7xl  text-primary ">
              Master Skills Through Focused Development Sprints
            </h1>

            {/* CTA */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link href={"/dashboard"}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph h-12 px-8 rounded-full">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={() => router.push('/user/sign-up')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph h-12 px-8 rounded-full"
                >
                  Start Building
                </Button>
              )}
            </div>
          </div>

          {/* Right Content - Image and Feature Cards */}
          <div className="relative">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden bg-secondary/10 aspect-4/3">
              <img
                src={"https://res.cloudinary.com/ddt9itdz7/image/upload/v1763827187/34a33fcd-5c9f-4b77-a92a-a89be0ef70ab_v7md81.png"}
                width={600}
              />
            </div>

            {/* Feature Cards Overlay */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-background rounded-xl p-4 shadow-sm border border-primary/10"
              >
                <div className="w-10 h-10 rounded-lg bg-chart-1 flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-heading text-sm text-black mb-1">Code</h3>
                <p className="font-paragraph text-xs text-foreground/70">Build real projects</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-background rounded-xl p-4 shadow-sm border border-primary/10"
              >
                <div className="w-10 h-10 bg-chart-2 rounded-lg bg-softyellowaccent flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-heading text-sm text-primary mb-1">Learn</h3>
                <p className="font-paragraph text-xs text-foreground/70">Document progress</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-background rounded-xl p-4 shadow-sm border border-primary/10"
              >
                <div className="w-10 h-10 rounded-lg bg-chart-1 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-black" />
                </div>
                <h3 className="font-heading text-sm text-primary mb-1">Showcase</h3>
                <p className="font-paragraph text-xs text-foreground/70">Share achievements</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-background py-24">
        <div className="max-w-480 mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              Everything You Need to Grow
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              A comprehensive platform designed to help developers build skills systematically through structured sprints and evidence-based learning.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-2 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">Sprint-Based Learning</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Structure your learning with time-boxed sprints. Choose from templates or create custom sprints tailored to your goals.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-1 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">Evidence Cards</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Document your work with rich evidence cards featuring code snippets, screenshots, videos, and performance metrics.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-2 flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">Skill Mapping</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Visualize your skill progression with an interactive skill map showing acquired competencies and learning paths.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-1 flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">AI-Powered Assistance</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Get AI-generated starter code, task suggestions, and guidance throughout your sprint journey.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-2 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">Public Portfolio</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Showcase completed projects with detailed reports, code repositories, and live demos to potential employers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-background rounded-2xl p-8 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-chart-1 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-black" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">Sprint Templates</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Jump-start your learning with curated sprint templates covering various technologies and difficulty levels.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-primary/5 py-24">
        <div className="max-w-480 mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
              How It Works
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto">
              Start building your developer portfolio in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 font-heading text-2xl">
                1
              </div>
              <h3 className="font-heading text-xl text-primary mb-3">Sign Up</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Create your account and set your skill goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 font-heading text-2xl">
                2
              </div>
              <h3 className="font-heading text-xl text-primary mb-3">Create Sprint</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Choose a template or design your own learning sprint
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 font-heading text-2xl">
                3
              </div>
              <h3 className="font-heading text-xl text-primary mb-3">Build & Document</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Complete tasks and create evidence cards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 font-heading text-2xl">
                4
              </div>
              <h3 className="font-heading text-xl text-primary mb-3">Showcase</h3>
              <p className="font-paragraph text-base text-foreground/70">
                Share your portfolio with the world
              </p>
            </div>
          </div>
        </div>
      </section>
       <Pricing userId={user?.id||""}></Pricing>         
      {/* CTA Section */}
      <section className="w-full py-24">
        <div className="max-w-480 mx-auto px-6 lg:px-12">
          <div className="bg-primary rounded-3xl p-12 lg:p-16 text-center">
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground mb-6">
              Ready to Level Up Your Skills?
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join developers who are building their careers through focused, evidence-based learning sprints.
            </p>
            {isAuthenticated ? (
              <Link href={"/dashboard"}>
                <Button size="lg" variant="secondary" className="h-12 px-8 rounded-full font-paragraph">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                variant="secondary"
                className="h-12 px-8 rounded-full font-paragraph"
              >
                Get Started Free
              </Button>
            )}
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

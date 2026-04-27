import { Suspense } from 'react'
import { ContactSection } from '@/components/Contact'
import { GlowingStars } from '@/components/ui/glowing-stars'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto px-4 py-24 relative">
        <GlowingStars />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
            Let's Chat!
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Got a cool idea? Want to collaborate? I'm here to help bring your vision to life. 
            Let's create something amazing together!
          </p>
        </motion.div>

        <Suspense>
          <ContactSection />
        </Suspense>

        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

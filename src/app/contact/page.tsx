import { Suspense } from 'react'
import { ContactSection } from '@/components/Contact'
import { GlowingStars } from '@/components/ui/glowing-stars'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto px-4 py-24 relative">
        <GlowingStars />
        
        <h1 className="text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h1>
        
        <p className="text-xl text-center text-purple-100 max-w-2xl mx-auto mb-16">
          Got a fun project idea? Want to brainstorm something awesome? 
          I'm all ears (and code)! Ping me below or drop an email.
        </p>

        <Suspense>
          <ContactSection />
        </Suspense>

        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

// Server Component - Chỉ render nội dung tĩnh
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroClient } from './HeroClient'
import { HeroSkeleton } from './HeroSkeleton'

// Metadata tĩnh - có thể cache tối đa
const HERO_CONTENT = {
  greeting: 'Xin chào, mình là',
  name: 'Lưu Thị Tố An',
  description: '🌟 Chào bạn! Mình là Tố An – đam mê sáng tạo và luôn tìm cách cải thiện trải nghiệm người dùng. Mình tin rằng thiết kế không chỉ phải đẹp mà còn phải dễ sử dụng. Cùng khám phá những điều mới mẻ nhé!',
  image: {
    src: '/images/toan.png',
    alt: 'Tố An',
    width: 400,
    height: 500
  }
} as const

export function HeroServer() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-white dark:from-[#0F141C] dark:via-[#161E2A] dark:to-[#0F141C]"
    >
      {/* Background Pattern - Static Server Side */}
      <div className="absolute inset-0 bg-[url('/patterns/chibi-pattern.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 min-h-screen items-center">
          
          {/* Text Content - Server Component */}
          <div className="space-y-6 lg:space-y-8">
            <Suspense fallback={<HeroSkeleton />}>
              <HeroClient content={HERO_CONTENT} />
            </Suspense>
            
            {/* Static Buttons - No JS needed initially */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cv.pdf"
                target="_blank"
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/30"
              >
                <span className="relative z-10">Xem CV</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <button className="group px-8 py-4 border-2 border-pink-500/50 dark:border-pink-400/50 text-pink-600 dark:text-pink-400 font-semibold rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all duration-300">
                Về tôi
              </button>
            </div>
          </div>

          {/* Image Section - Optimized with Next/Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
              <Image
                src={HERO_CONTENT.image.src}
                alt={HERO_CONTENT.image.alt}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-400/30 dark:bg-pink-500/20 rounded-full blur-xl opacity-60 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400/20 dark:bg-purple-500/15 rounded-full blur-xl opacity-40 animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

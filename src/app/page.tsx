
import Hero from '@/components/Hero'
import RecentWork from '@/components/RecentWork'
import TestimonialSlider from '@/components/Skill'
import AboutMeComponent from '@/components/AboutMe'
import PageTransition from '@/components/ui/page-transition'

export default function Home() {
  return (
    <>
      <Hero />
      <RecentWork />
      <TestimonialSlider />
      <AboutMeComponent />
    </>
  )
}

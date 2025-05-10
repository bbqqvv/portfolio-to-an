
import Hero from '@/components/Hero'
import RecentWork from '@/components/RecentWork'
import SocialSidebar from '@/components/SocialSidebar'
import TestimonialSlider from '@/components/TestimonialSlider'
import AboutMeComponent from '@/components/AboutMe'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <RecentWork />
      <TestimonialSlider />
      <AboutMeComponent />
      <SocialSidebar />

    </>
  )
}

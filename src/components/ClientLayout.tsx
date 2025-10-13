'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import SocialSidebar from '@/components/SocialSidebar'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Navbar />
            <CustomCursor />
            {children}
            <SocialSidebar />
            <Footer />
        </ThemeProvider>
    )
}


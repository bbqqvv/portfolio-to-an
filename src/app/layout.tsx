import { Eczar, Work_Sans } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Import Eczar font
const eczar = Eczar({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-eczar',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-work-sans',
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Tố An",
  description: "Khám phá portfolio cá nhân của Tố An – sinh viên lớp 22SE2, Trường Đại học CNTT & Truyền thông Việt – Hàn.",
  openGraph: {
    title: "Portfolio Tố An",
    description: "Tác phẩm thiết kế, dự án web, và ý tưởng sáng tạo từ Tố An – sinh viên lớp 22SE2, Đại học CNTT & Truyền thông Việt – Hàn.",
    url: "https://portfolio-to-an.vercel.app",
    siteName: "Portfolio Tố An",
    images: [
      {
        url: "https://portfolio-to-an.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Ảnh đại diện Portfolio Tố An",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Tố An",
    description: "Tác phẩm thiết kế và dự án UI/UX nổi bật của Tố An – sinh viên UIT-VKU.",
    images: ["https://portfolio-to-an.vercel.app/thumbnail.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eczar.variable} antialiased`} // Add Eczar variable here
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          {/* <Loader /> */}
          <CustomCursor />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

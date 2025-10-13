import { Eczar, Work_Sans } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", // nếu có
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Get system theme
                  const getSystemTheme = () => {
                    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  };
                  
                  // Get saved theme preference (default to 'system')
                  const savedTheme = localStorage.getItem('portfolio-theme') || 'system';
                  
                  // Determine which theme to apply
                  let themeToApply = 'light';
                  
                  if (savedTheme === 'dark') {
                    themeToApply = 'dark';
                  } else if (savedTheme === 'light') {
                    themeToApply = 'light';
                  } else if (savedTheme === 'system') {
                    themeToApply = getSystemTheme();
                  }
                  
                  // Apply theme immediately
                  if (themeToApply === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Store the resolved theme for React to pick up
                  document.documentElement.setAttribute('data-theme', savedTheme);
                  document.documentElement.setAttribute('data-resolved-theme', themeToApply);
                } catch (e) {
                  // Fallback to light theme on error
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eczar.variable} ${workSans.variable} antialiased`}
        style={{ backgroundColor: 'var(--background-1)', color: 'var(--foreground)' }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

"use client"
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist" />
            </Head>

            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="max-w-lg w-full space-y-8">
                    {/* Illustration with subtle scale animation */}
                    <div className="animate-float">
                        <Image
                            src="/images/404.png" // Recommend using SVG for crisp quality
                            alt="404 Illustration"
                            width={400}
                            height={300}
                            className="mx-auto"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                        <h1 className="text-5xl font-light text-gray-900 tracking-tight">
                            404
                        </h1>
                        <h2 className="text-2xl font-medium text-gray-700">
                            Trang không tìm thấy
                        </h2>
                        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
                            Xin lỗi mình không tìm thấy trang bạn muốn...
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                        <Link
                            href="/"
                            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-center"
                        >
                            Về nhà
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200 text-center"
                        >
                            Kết nối để hỗ trợ
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
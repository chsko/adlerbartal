import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Adler Bartals kokebok',
    description: 'En digital kokebok for familliens oppskrifter',
}

const Toaster = dynamic(
    () => import('react-hot-toast').then((c) => c.Toaster),
    {
        ssr: false,
    }
)

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={'h-full bg-white'}
        >
            <body className={inter.className + 'h-full'}>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                {children}
            </body>
        </html>
    )
}

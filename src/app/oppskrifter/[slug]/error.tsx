'use client'

import Link from 'next/link'

const Error = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => (
    <div className="flex flex-col items-center justify-center h-dvh bg-white dark:bg-gray-800">
        <h1 className="text-8xl">404</h1>
        <p>Finner ikke siden du leter etter.</p>
        <Link
            className={'mt-4 text-indigo-600 hover:text-indigo-400'}
            href={'/'}
        >
            {' '}
            Gå tilbake til oversikten
        </Link>
    </div>
)

export default Error

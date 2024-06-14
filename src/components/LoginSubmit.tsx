'use client'

import { useFormStatus } from 'react-dom'
import { Spinner } from '@/components/Spinner'

export const LoginSubmit = () => {
    const { pending } = useFormStatus()
    return <>{pending ? <LoadingButton /> : <LoginButton />}</>
}

const LoginButton = () => {
    return (
        <button
            type="submit"
            className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Logg inn
        </button>
    )
}

const LoadingButton = () => {
    return (
        <button
            disabled={true}
            className="flex w-full justify-center items-center rounded-md bg-indigo-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            <Spinner />
            Logger inn...
        </button>
    )
}

'use server'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Oppskrifter } from '@/components/Oppskrifter'
import { Suspense } from 'react'
import { Spinner } from '@/components/Spinner'

const Recipes = async () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex flex-row items-center justify-between mb-12">
                    <h1 className="text-3xl lg:text-5xl">Oppskrifter</h1>
                    <span className="sm:ml-3">
                        <Link href={'/ny-oppskrift'}>
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <ClipboardDocumentListIcon
                                    className="-ml-0.5 mr-1.5 h-5 w-5"
                                    aria-hidden="true"
                                />
                                Ny oppskrift
                            </button>
                        </Link>
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <Suspense fallback={<Spinner />}>
                        <Oppskrifter />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
export default Recipes

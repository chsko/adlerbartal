'use client'
import { Field, Legend } from '@headlessui/react'
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { NewRecipeResult } from '@/app/ny-oppskrift/actions'

export interface PhotoProps {
    formResult: NewRecipeResult | null
    value?: string
}

export const Photo = ({ formResult, value }: PhotoProps) => {
    const [image, setImage] = useState<File | string | undefined>(value)
    const imageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (formResult?.resultType === 'INSERTED') resetImage()
    }, [formResult])

    const resetImage = () => {
        imageInputRef.current && (imageInputRef.current.value = '')
        setImage(undefined)
    }

    return (
        <Field className="col-span-1">
            <Legend className="flex flex-row items-center text-sm font-medium leading-6 dark:text-gray-300 text-gray-900">
                Bilde av matretten
                {image && (
                    <TrashIcon
                        className={'ml-2 w-5 h-5 text-red-500'}
                        onClick={() => resetImage()}
                    />
                )}
            </Legend>
            <div className="mt-2 flex justify-center rounded-lg border border-solid dark:border-gray-300/25 border-gray-900/25 px-6 py-10">
                <div
                    className={`flex flex-col items-center justify-center text-center ${image !== undefined ? 'hidden' : ''} h-[250px] w-[200px] border border-dashed dark:border-gray-300/25 border-gray-900/25 rounded-lg`}
                >
                    <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                    />
                    <div className="mt-4 flex flex-col text-sm leading-6 dark:text-gray-400 text-gray-600 p-2">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Last opp et bilde</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                ref={imageInputRef}
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                capture="environment"
                                onChange={(event) =>
                                    setImage(event?.target?.files?.[0])
                                }
                            />
                        </label>
                        <p className="pl-1">eller dra og slipp</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">
                        PNG, JPG, GIF opp til 10MB
                    </p>
                </div>
                {image && (
                    <div className="w-[200px] h-[250x]">
                        <Image
                            src={
                                isFile(image)
                                    ? URL.createObjectURL(image)
                                    : image
                            }
                            alt="Photo av retten"
                            width={500}
                            height={400}
                            priority
                            className="h-[250px] w-[200px] object-cover object-center"
                        />
                    </div>
                )}
            </div>
        </Field>
    )
}

const isFile = (value: string | File): value is File => {
    return (value as File).size !== undefined
}

'use client'

import { Textarea } from '@headlessui/react'

export interface StepsProps {
    value?: string
}

export const Steps = ({ value }: StepsProps) => (
    <div className="mt-2">
        <Textarea
            id="steps"
            name="steps"
            rows={10}
            required
            onInvalid={(it) =>
                it.currentTarget.setCustomValidity('Du må oppgi en forklaring')
            }
            onInput={(it) => it.currentTarget.setCustomValidity('')}
            className="block w-full rounded-md border-0 py-1.5 dark:bg-gray-300 dark:placeholder:text-gray-500 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={value}
            placeholder={'Forklar stegene i oppskriften'}
        />
    </div>
)

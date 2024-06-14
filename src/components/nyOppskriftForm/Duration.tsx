'use client'

import { Field, Input, Label } from '@headlessui/react'

export const Duration = () => (
    <Field className="col-span-1 col-start-1 row-start-2">
        <Label
            htmlFor="duration"
            className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
        >
            Tidsbruk
        </Label>
        <div className="mt-2 flex flex-row items-center dark:text-gray-400">
            <Input
                type="number"
                name="duration"
                required
                onInvalid={(it) =>
                    it.currentTarget.setCustomValidity('Du må oppgi tidsbruk')
                }
                onInput={(it) => it.currentTarget.setCustomValidity('')}
                id="duration"
                className="dark:bg-gray-300 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
            />
            minutter
        </div>
    </Field>
)

'use client'

import { Field, Input, Label } from '@headlessui/react'

export const Price = () => (
    <Field className="col-span-1 col-start-2 row-start-2">
        <Label
            htmlFor="price"
            className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
        >
            Pris
        </Label>
        <div className="mt-2 flex flex-row items-center dark:text-gray-400">
            <Input
                type="number"
                name="price"
                id="price"
                required
                onInvalid={(it) =>
                    it.currentTarget.setCustomValidity('Du må oppgi en pris')
                }
                onInput={(it) => it.currentTarget.setCustomValidity('')}
                placeholder="0,00"
                className="dark:bg-gray-300 dark:placeholder:text-gray-500 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
            />
            kroner
        </div>
    </Field>
)

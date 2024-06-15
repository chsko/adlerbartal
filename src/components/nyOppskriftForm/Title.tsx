'use client'

import { Field, Input, Label } from '@headlessui/react'

export const Title = () => {
    return (
        <Field>
            <Label
                htmlFor="title"
                className="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900"
            >
                Overskrift
            </Label>
            <div className="mt-2 flex flex-row items-center">
                <Input
                    required
                    type="text"
                    onInvalid={(it) =>
                        it.currentTarget.setCustomValidity(
                            'Du må oppgi en overskrift'
                        )
                    }
                    onInput={(it) => it.currentTarget.setCustomValidity('')}
                    name="title"
                    id="title"
                    className="dark:bg-gray-300 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
                />
            </div>
        </Field>
    )
}

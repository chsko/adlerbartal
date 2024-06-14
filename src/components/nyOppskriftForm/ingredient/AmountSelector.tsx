import { Input } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'

export interface AmountSelectorProps {
    index: number
    selectedAmount: number | undefined
    setSelectedAmount: Dispatch<SetStateAction<number | undefined>>
    disabled: boolean
}

export const AmountSelector = ({
    index,
    selectedAmount,
    setSelectedAmount,
    disabled,
}: AmountSelectorProps) => {
    return (
        <Input
            id={`amount-${index}`}
            name={`amount-${index}`}
            disabled={disabled}
            placeholder="Mengde"
            required
            onInvalid={(it) =>
                it.currentTarget.setCustomValidity('Du må oppgi en mendge')
            }
            onInput={(it) => it.currentTarget.setCustomValidity('')}
            type="number"
            onChange={(event) =>
                setSelectedAmount(
                    event.currentTarget.value
                        ? Number.parseFloat(event.currentTarget.value)
                        : undefined
                )
            }
            className="col-span-1 py-1.5 rounded-md border-0 disabled:bg-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6"
        />
    )
}

import { Input } from '@headlessui/react'
import { Ingredient } from '@/components/nyOppskriftForm/ingredient/IngredientComponent'

export interface AmountSelectorProps {
    index: number
    selectedIngredient: Ingredient | null
    setSelectedAmount: (unit: number | null) => void
    disabled: boolean
}

export const AmountSelector = ({
    index,
    selectedIngredient,
    setSelectedAmount,
    disabled,
}: AmountSelectorProps) => {
    return (
        <Input
            id={`amount-${index}`}
            name={`amount-${index}`}
            disabled={disabled}
            defaultValue={selectedIngredient?.amount}
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
                        : null
                )
            }
            className="col-span-1 py-1.5 rounded-md border-0 disabled:bg-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6"
        />
    )
}

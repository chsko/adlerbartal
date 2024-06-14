import { useState } from 'react'
import { IngredientSelector } from '@/components/nyOppskriftForm/ingredient/IngredientSelector'
import { UnitSelector } from '@/components/nyOppskriftForm/ingredient/UnitSelector'
import { Button, Fieldset } from '@headlessui/react'
import { AmountSelector } from '@/components/nyOppskriftForm/ingredient/AmountSelector'
import { TrashIcon } from '@heroicons/react/24/outline'

export interface Ingredient {
    id: number
    name: string
}

export interface Ingredient {
    type: string
    amount: string
    unit: string
}

export interface IngredientComponentProps {
    index: number
    unmountSelf: (index: number) => void
}

export const IngredientComponent = ({
    index,
    unmountSelf,
}: IngredientComponentProps) => {
    const [selectedIngredient, setSelectedIngredient] =
        useState<Ingredient | null>(null)
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
    const [selectedAmount, setSelectedAmount] = useState<number>()
    return (
        <div className="flex flex-row items-center gap-2 mt-2">
            <Fieldset className="grid grid-cols-4 md:gap-4 gap-2">
                <IngredientSelector
                    index={index}
                    selectedIngredient={selectedIngredient}
                    setSelectedIngredient={setSelectedIngredient}
                />
                <UnitSelector
                    index={index}
                    disabled={!selectedIngredient}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                />
                <AmountSelector
                    index={index}
                    disabled={!selectedUnit}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                />
            </Fieldset>
            <Button>
                <TrashIcon
                    className="w-5 h-5 text-red-500"
                    onClick={() => unmountSelf(index)}
                />
            </Button>
        </div>
    )
}

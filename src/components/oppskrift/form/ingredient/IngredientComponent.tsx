'use client'
import { useState } from 'react'
import { IngredientSelector } from '@/components/oppskrift/form/ingredient/IngredientSelector'
import { UnitSelector } from '@/components/oppskrift/form/ingredient/UnitSelector'
import { Button, Fieldset } from '@headlessui/react'
import { AmountSelector } from '@/components/oppskrift/form/ingredient/AmountSelector'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Ingredient } from '@/types/domain'

export interface IngredientComponentProps {
    index: number
    unmountSelf: (ingredient: Ingredient) => void
    ingredient?: Ingredient
    units: string[]
    ingredientTypes: string[]
}

export const IngredientComponent = ({
    index,
    unmountSelf,
    ingredient,
    units,
    ingredientTypes,
}: IngredientComponentProps) => {
    const [selectedIngredient, setSelectedIngredient] =
        useState<Ingredient | null>(ingredient ?? null)

    const setSelectedType = (type: string | null) => {
        setSelectedIngredient({
            ...selectedIngredient,
            ingredient: type ?? undefined,
        })
    }

    const setSelectedUnit = (unit: string | null) => {
        setSelectedIngredient({
            ...selectedIngredient,
            unit: unit ?? undefined,
        })
    }

    const setSelectedAmount = (amount: number | null) => {
        setSelectedIngredient({
            ...selectedIngredient,
            amount: amount ?? undefined,
        })
    }

    return (
        <div className="flex flex-row items-center gap-2 mt-2">
            <Fieldset className="grid grid-cols-4 md:gap-4 gap-2">
                <IngredientSelector
                    index={index}
                    selectedIngredient={selectedIngredient}
                    setSelectedType={setSelectedType}
                    ingredientTypes={ingredientTypes}
                />
                <UnitSelector
                    index={index}
                    disabled={!selectedIngredient}
                    selectedIngredient={selectedIngredient}
                    setSelectedUnit={setSelectedUnit}
                    units={units}
                />
                <AmountSelector
                    index={index}
                    disabled={!selectedIngredient?.unit}
                    selectedIngredient={selectedIngredient}
                    setSelectedAmount={setSelectedAmount}
                />
            </Fieldset>
            <Button>
                <TrashIcon
                    className="w-5 h-5 text-red-500"
                    onClick={() => ingredient && unmountSelf(ingredient)}
                />
            </Button>
        </div>
    )
}

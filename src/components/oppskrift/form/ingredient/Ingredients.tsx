import { Button, Fieldset } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { IngredientComponent } from '@/components/oppskrift/form/ingredient/IngredientComponent'
import { nanoid } from 'nanoid'
import { Ingredient } from '@/types/domain'

export interface IngredientsProps {
    ingredients: Ingredient[]
    addIngredient: (ingredient: Ingredient) => void
    removeIngredient: (ingredient: Ingredient) => void
    units: string[]
    types: string[]
}
export const Ingredients = ({
    ingredients,
    addIngredient,
    removeIngredient,
    units,
    types,
}: IngredientsProps) => {
    return (
        <Fieldset className="mt-4">
            <Button
                onClick={() => addIngredient({ id: nanoid() })}
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                />
                Legg til
            </Button>
            <ul className="mt-2">
                {ingredients.map((it, idx) => {
                    return (
                        <IngredientComponent
                            key={it.id}
                            index={idx}
                            unmountSelf={removeIngredient}
                            ingredient={it}
                            units={units}
                            ingredientTypes={types}
                        />
                    )
                })}
            </ul>
        </Fieldset>
    )
}

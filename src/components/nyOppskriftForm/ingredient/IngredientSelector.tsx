import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Ingredient } from '@/components/nyOppskriftForm/ingredient/IngredientComponent'
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { createClient } from '@/utils/supabase/client'

export interface IngredientSelectorProps {
    index: number
    selectedIngredient: Ingredient | null
    setSelectedIngredient: Dispatch<SetStateAction<Ingredient | null>>
}

export const IngredientSelector = ({
    index,
    selectedIngredient,
    setSelectedIngredient,
}: IngredientSelectorProps) => {
    const [query, setQuery] = useState('')
    const [ingredients, setIngredients] = useState<string[]>([])

    const supabase = createClient()

    const getIngredients = useCallback(async () => {
        const { data: ingredients, error } = await supabase.rpc(
            'get_unique_types',
            {
                table_name: 'recipe',
                column_name: 'ingredients',
                field_name: 'ingredient',
            }
        )

        if (error) return
        setIngredients(ingredients)
    }, [supabase])

    useEffect(() => {
        getIngredients().then()
    })

    const filteredIngredients =
        query === ''
            ? ingredients
            : ingredients.filter((ingredient) => {
                  return ingredient.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox
            value={selectedIngredient}
            onChange={setSelectedIngredient}
            onClose={() => setQuery('')}
        >
            <div className="relative col-span-2">
                <ComboboxInput
                    id={`ingredient-${index}`}
                    name={`ingredient-${index}`}
                    required
                    onInvalid={(it) =>
                        it.currentTarget.setCustomValidity(
                            'Du må velge en ingrediens'
                        )
                    }
                    onInput={(it) => it.currentTarget.setCustomValidity('')}
                    aria-label="Ingrediens"
                    placeholder="Ingrediens"
                    autoComplete={undefined}
                    displayValue={(ingredient: string) => ingredient}
                    onChange={(event) => setQuery(event.target.value)}
                    className="block w-full dark:placeholder:text-gray-500 dark:bg-gray-300 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400 dark:text-gray-500"
                            aria-hidden="true"
                        />
                    </span>
                </ComboboxButton>
            </div>
            <ComboboxOptions
                anchor="bottom"
                className="empty:hidden w-[var(--input-width)] rounded-md border bg-white py-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:15rem] overflow-auto text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                {query.length > 0 && filteredIngredients.length === 0 && (
                    <ComboboxOption
                        value={query}
                        className={({ focus }) =>
                            classNames(
                                focus
                                    ? 'bg-indigo-600 text-white dark:text-gray-900'
                                    : '',
                                !focus
                                    ? 'text-gray-900 dark:text-gray-300'
                                    : '',
                                'cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                    >
                        Opprett{' '}
                        <span className="font-bold">&quot;{query}&quot;</span>
                    </ComboboxOption>
                )}
                {filteredIngredients.map((ingredient) => (
                    <ComboboxOption
                        key={ingredient}
                        value={ingredient}
                        className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                    >
                        {ingredient}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    )
}

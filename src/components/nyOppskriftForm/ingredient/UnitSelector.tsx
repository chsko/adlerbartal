import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react'
import { useCallback, useEffect, useState } from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { createClient } from '@/utils/supabase/client'
import { Ingredient } from '@/components/nyOppskriftForm/ingredient/IngredientComponent'

export interface UnitSelectorProps {
    index: number
    selectedIngredient: Ingredient | null
    setSelectedUnit: (unit: string | null) => void
    disabled: boolean
}

export const UnitSelector = ({
    index,
    selectedIngredient,
    setSelectedUnit,
    disabled,
}: UnitSelectorProps) => {
    const [query, setQuery] = useState('')
    const [units, setUnits] = useState<string[]>([])

    const supabase = createClient()

    const getUnits = useCallback(async () => {
        const { data: units, error } = await supabase.rpc('get_unique_types', {
            table_name: 'recipe',
            column_name: 'ingredients',
            field_name: 'unit',
        })

        if (error) return
        setUnits(units)
    }, [supabase])

    useEffect(() => {
        getUnits().then()
    }, [])

    const filteredUnits =
        query === ''
            ? units
            : units.filter((unit) => {
                  return unit.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox
            disabled={disabled}
            value={selectedIngredient?.unit ?? ''}
            defaultValue={selectedIngredient?.unit}
            onChange={setSelectedUnit}
            onClose={() => setQuery('')}
        >
            <div className="relative col-span-1">
                <ComboboxInput
                    id={`unit-${index}`}
                    name={`unit-${index}`}
                    aria-label="Assignee"
                    autoComplete={undefined}
                    required
                    onInvalid={(it) =>
                        it.currentTarget.setCustomValidity(
                            'Du må velge en enhet'
                        )
                    }
                    defaultValue={selectedIngredient?.unit}
                    onInput={(it) => it.currentTarget.setCustomValidity('')}
                    placeholder="Enhet"
                    displayValue={(unit: string) => unit}
                    onChange={(event) => setQuery(event.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 disabled:bg-gray-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 text-sm focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </ComboboxButton>
            </div>
            <ComboboxOptions
                anchor="bottom"
                className="empty:hidden w-[var(--input-width)] rounded-md border bg-white py-1 [--anchor-gap:var(--spacing-1)] [--anchor-max-height:15rem] overflow-auto text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
                {query.length > 0 && filteredUnits.length === 0 && (
                    <ComboboxOption
                        value={query}
                        className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                    >
                        Opprett{' '}
                        <span className="font-bold">&quot;{query}&quot;</span>
                    </ComboboxOption>
                )}
                {filteredUnits.map((unit) => (
                    <ComboboxOption
                        key={unit}
                        value={unit}
                        className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                    >
                        {unit}
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    )
}

import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { createClient } from '@/lib/utils/supabase/client'
import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { RemovableTag } from '@/components/nyOppskriftForm/tag/RemovableTag'

export interface TagSelectorProps {
    selectedTags: string[]
    setSelectedTags: Dispatch<SetStateAction<string[]>>
}

export const TagSelector = ({
    selectedTags,
    setSelectedTags,
}: TagSelectorProps) => {
    const [query, setQuery] = useState('')
    const [existingTags, setExistingTags] = useState<string[]>([])

    const supabase = createClient()

    const getTags = useCallback(async () => {
        const { data: tags, error } = await supabase.rpc('get_unique_tags')

        if (error) return
        setExistingTags(tags)
    }, [supabase])

    useEffect(() => {
        getTags()
    }, [])

    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((it) => it !== tag))
        setExistingTags(existingTags.filter((it) => it !== tag))
    }

    const selectTag = (tag: string | null) => {
        if (tag) {
            const alreadyExists =
                selectedTags.find(
                    (it) => it.toLowerCase() === tag.toLowerCase()
                ) !== undefined

            if (!alreadyExists) {
                setSelectedTags([...selectedTags, tag])
                setExistingTags([...existingTags, tag])
            }
        }
    }

    const filteredTags =
        query === ''
            ? existingTags
            : existingTags.filter((tag) => {
                  return tag.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <>
            <div className="w-fit">
                <Combobox
                    onClose={() => setQuery('')}
                    value={query}
                    onChange={selectTag}
                >
                    <div className="relative">
                        <ComboboxInput
                            id="foo"
                            name="foo"
                            aria-label="Nøkkelord"
                            placeholder="Nøkkelord"
                            autoComplete={undefined}
                            displayValue={(tag: string) => tag}
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
                        {query && !filteredTags.includes(query) && (
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
                                <span className="font-bold">
                                    &quot;{query}&quot;
                                </span>
                            </ComboboxOption>
                        )}
                        {filteredTags.map((tag, idx) => (
                            <ComboboxOption
                                key={idx}
                                value={tag}
                                className={({ focus }) =>
                                    classNames(
                                        focus ? 'bg-indigo-600 text-white' : '',
                                        !focus ? 'text-gray-900' : '',
                                        'cursor-default select-none py-2 pl-3 pr-9'
                                    )
                                }
                            >
                                {tag}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
            {selectedTags.length > 0 && (
                <div className="flex flex-row gap-2 w-full sm:w-fit flex-wrap">
                    {selectedTags.map((it, idx) => (
                        <RemovableTag
                            onRemove={removeTag}
                            tag={it}
                            key={`tag-${it}-${idx}`}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

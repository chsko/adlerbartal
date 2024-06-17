'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { newRecipe } from '@/app/ny-oppskrift/actions'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { Title } from '@/components/nyOppskriftForm/Title'
import { Duration } from '@/components/nyOppskriftForm/Duration'
import { Price } from '@/components/nyOppskriftForm/Price'
import { TagSelector } from '@/components/nyOppskriftForm/tag/TagSelector'
import { Photo } from '@/components/nyOppskriftForm/Photo'
import { Description, Field, Label, Legend } from '@headlessui/react'
import { Steps } from '@/components/nyOppskriftForm/Steps'
import { Ingredients } from '@/components/nyOppskriftForm/ingredient/Ingredients'
import { Spinner } from '@/components/Spinner'
import { Ingredient } from '@/components/nyOppskriftForm/ingredient/IngredientComponent'
import { nanoid } from 'nanoid'

export interface OppskriftProps {
    heading: string
    description: string
    recipe?: RecipeWithUser
    image?: string
}
const Oppskrift = ({ heading, description, recipe, image }: OppskriftProps) => {
    const [result, formAction] = useFormState(newRecipe, null)
    const formRef = useRef<HTMLFormElement>(null)

    const [selectedTags, setSelectedTags] = useState(recipe?.tags ?? [])

    const ingredientsWithIds =
        (recipe?.ingredients as unknown as Ingredient[])?.map((it) => ({
            ...it,
            id: nanoid(),
        })) ?? []

    const [ingredients, setIngredients] =
        useState<Ingredient[]>(ingredientsWithIds)

    const addIngredient = (ingredient: Ingredient) =>
        setIngredients([...ingredients, ingredient])

    const removeIngredient = (ingredient: Ingredient) =>
        setIngredients(ingredients.filter((it) => it.id !== ingredient.id))

    useEffect(() => {
        if (result?.resultType === 'INSERTED') {
            formRef.current?.reset()
            setSelectedTags([])
            setIngredients([])
            toast.success('Oppskrift lagret!')
        } else if (result?.resultType === 'UPDATED') {
            formRef.current?.reset()
            toast.success('Oppskrift oppdatert!')
        }
    }, [result])

    const handleSubmit = (formData: FormData) => {
        const existingDataToBeAppended = Array.from(formData.entries())
        const finalFormData = new FormData()
        existingDataToBeAppended.forEach(([key, value]) =>
            finalFormData.append(key, value)
        )
        selectedTags.forEach((it) => finalFormData.append('tags', it))
        if (recipe?.id) finalFormData.append('id', recipe.id.toString())
        formAction(finalFormData)
    }

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Link
                    className={
                        'flex flex-row items-center gap-2 hover:text-gray-500'
                    }
                    href={'/'}
                >
                    <ArrowLongLeftIcon className={'w-6 h-6'} /> Tilbake
                </Link>
                <h1 className="mt-4 text-3xl lg:text-5xl dark:text-gray-300">
                    {heading}
                </h1>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <form
                    ref={formRef}
                    action={handleSubmit}
                >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="mt-10 text-base font-semibold leading-7 dark:text-gray-300 text-gray-900">
                                Innledende informasjon
                            </h2>
                            <div className="mt-4 flex flex-col sm:grid sm:grid-cols-2 gap-x-6 gap-y-8">
                                <div className="flex flex-col gap-10 col-span-1 h-fit">
                                    <Title value={recipe?.title} />
                                    <div className="flex flex-row gap-6">
                                        <Duration value={recipe?.duration} />
                                        <Price value={recipe?.price} />
                                    </div>
                                    <TagSelector
                                        selectedTags={selectedTags}
                                        setSelectedTags={setSelectedTags}
                                    />
                                </div>
                                <Photo
                                    formResult={result}
                                    value={image}
                                />
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <Field>
                                <Label
                                    className="text-base font-semibold leading-7 dark:text-gray-300 text-gray-900"
                                    htmlFor="steps"
                                >
                                    Fremgangsmåte
                                </Label>
                                <Description className="mt-1 text-sm leading-6 dark:text-gray-400 text-gray-600">
                                    Forklaring, ingredienser, tips og triks
                                </Description>
                                <Steps value={recipe?.content} />
                            </Field>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <Field>
                                <Legend
                                    className="text-base font-semibold leading-7 dark:text-gray-300 text-gray-900"
                                    htmlFor="ingredients"
                                >
                                    Ingredienser
                                </Legend>
                                <Ingredients
                                    ingredients={ingredients}
                                    addIngredient={addIngredient}
                                    removeIngredient={removeIngredient}
                                />
                            </Field>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Buttons />
                    </div>
                    <div className="flex justify-end mt-2">
                        {result?.error && (
                            <p className="text-red-500">{result.error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
const Buttons = () => {
    const { pending } = useFormStatus()

    return (
        <div className="mt-6 flex items-center justify-end gap-x-6">
            {pending && <Spinner />}
            <button
                disabled={pending}
                type="button"
                className="text-sm font-semibold leading-6 dark:text-gray-300 text-gray-900 disabled:text-gray-400"
            >
                Avbryt
            </button>
            <button
                disabled={pending}
                type="submit"
                className="rounded-md disabled:bg-indigo-300 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Lagre
            </button>
        </div>
    )
}
export default Oppskrift

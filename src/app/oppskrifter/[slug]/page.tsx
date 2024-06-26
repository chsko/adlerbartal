import Link from 'next/link'
import {
    ArrowLongLeftIcon,
    BanknotesIcon,
    ClockIcon,
} from '@heroicons/react/24/outline'
import { toNorwegianDateTimeString } from '@/lib/utils/utils'
import Image from 'next/image'
import { ReadOnlyTag } from '@/components/oppskrift/form/tag/RemovableTag'
import { getPublicUrl, getRecipe, getUser } from '@/lib/data'

interface Ingredient {
    ingredient: string
    unit: string
    amount: number
}

const Oppskrift = async ({ params }: { params: { slug: string } }) => {
    const [recipe, user] = await Promise.all([
        getRecipe(params.slug),
        getUser(),
    ])
    const ingredients: Ingredient[] =
        recipe.ingredients as unknown as Ingredient[]

    const publicUrl = recipe.image ? await getPublicUrl(recipe.image) : ''

    const ownedByUser = recipe.user_id === user.user.id

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <Link
                    className="flex flex-row items-center gap-2 hover:text-gray-500"
                    href="/"
                >
                    <ArrowLongLeftIcon className="w-6 h-6" /> Tilbake
                </Link>
                <h1 className="mt-4 text-3xl lg:text-5xl dark:text-gray-300">
                    {recipe.title}
                </h1>
                <div className="mt-2 flex sm:flex-row flex-col">
                    <p className="text-md text-gray-500">
                        {recipe.profile!.first_name}{' '}
                        {recipe.profile!.middle_name &&
                            recipe.profile!.middle_name + ' '}
                        {recipe.profile!.last_name}
                    </p>
                    <p className="hidden sm:block">&nbsp;-&nbsp;</p>
                    <p className="text-md text-gray-500 capitalize sm:normal-case">
                        {recipe.updated_at
                            ? `sist oppdatert ${toNorwegianDateTimeString(recipe.updated_at)}`
                            : `opprettet ${toNorwegianDateTimeString(recipe.created_at)}`}
                    </p>
                </div>
                {ownedByUser && (
                    <div className="mt-2 underline text-indigo-600 hover:text-indigo-400">
                        <Link href={`/endre-oppskrift/${params.slug}`}>
                            Rediger
                        </Link>
                    </div>
                )}
                <div className="mt-10 grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-1 grid-cols-1 gap-y-2">
                    <div className="col-start-1">
                        <p className="flex flex-row items-center gap-2 text-md ">
                            <ClockIcon className="w-7 h-7" />
                            {recipe.duration} minutter
                        </p>
                        <p className="flex flex-row items-center gap-2 text-md mt-4">
                            <BanknotesIcon className="h-7 w-7" />
                            {recipe.price} kr
                        </p>
                        <div className="mt-4 flex flex-row gap-2 w-full sm:w-fit flex-wrap">
                            {recipe.tags.map((it, idx) => (
                                <ReadOnlyTag
                                    tag={it}
                                    key={idx}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 mt-10">
                            <p className="text-2xl">Forklaring</p>
                            <p className="whitespace-pre-wrap">
                                {recipe.content}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center overflow-hidden row-start-1 sm:col-start-2 row-span-1 rounded-lg">
                        {publicUrl ? (
                            <Image
                                src={publicUrl}
                                alt={recipe.title}
                                className="h-[500px] w-[400px] object-cover object-center"
                                width={400}
                                height={500}
                                priority
                            />
                        ) : (
                            <p className="p-4 italic text-gray-500">
                                Bilde mangler
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-2 text-md">
                    <p className="text-2xl">Ingredienser</p>
                    <ul className="list-disc list ml-5">
                        {ingredients.map((it, idx) => (
                            <IngredientComponent
                                key={idx}
                                ingredient={it}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

interface IngredientComponentProps {
    ingredient: Ingredient
}

const IngredientComponent = ({ ingredient }: IngredientComponentProps) => {
    return (
        <li>
            {ingredient.ingredient} - {ingredient.amount} {ingredient.unit}
        </li>
    )
}

export default Oppskrift

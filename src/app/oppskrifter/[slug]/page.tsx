import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import {
    ArrowLongLeftIcon,
    BanknotesIcon,
    ClockIcon,
} from '@heroicons/react/24/outline'
import { toNorwegianDateTimeString } from '@/utils/utils'
import Image from 'next/image'

interface Ingredient {
    ingredient: string
    unit: string
    amount: number
}

const Oppskrift = async ({ params }: { params: { slug: string } }) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
        .eq('slug', params.slug)
        .single()
    if (error) throw Error(`Finner ikke ${params.slug}`)

    const recipe: RecipeWithUser = data
    const ingredients: Ingredient[] =
        recipe.ingredients as unknown as Ingredient[]

    const { data: imageUrl } = supabase.storage
        .from('images')
        .getPublicUrl(recipe.image ?? '')

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
                    {recipe.title}
                </h1>
                <div className="mt-2 flex flex-row">
                    <p className={'text-md text-gray-500'}>
                        {recipe.profile!.first_name}{' '}
                        {recipe.profile!.middle_name &&
                            recipe.profile!.middle_name + ' '}
                        {recipe.profile!.last_name}&nbsp;
                    </p>
                    <p className={'text-md text-gray-500'}>
                        {recipe.updated_at
                            ? ` - sist oppdatert ${toNorwegianDateTimeString(recipe.updated_at)}`
                            : ` - opprettet ${toNorwegianDateTimeString(recipe.created_at)}`}
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-2 grid-rows-1 gap-y-2">
                    <div className="col-start-1">
                        <p className="flex flex-row items-center gap-2 text-md ">
                            <ClockIcon className="w-7 h-7" />
                            {recipe.duration} minutter
                        </p>
                        <p className="flex flex-row items-center gap-2 text-md">
                            <BanknotesIcon className="h-7 w-7" />
                            {recipe.price} kr
                        </p>
                        <div className="flex flex-col gap-2 mt-10">
                            <p className="text-2xl">Forklaring</p>
                            <p className="whitespace-pre-wrap">
                                {recipe.content}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center overflow-hidden rounded-lg row-start-1 col-start-2 row-span-1">
                        <Image
                            src={imageUrl.publicUrl}
                            alt={recipe.title}
                            className="h-[500px] w-[400px] object-cover object-center group-hover:opacity-75"
                            width={400}
                            height={500}
                        />
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

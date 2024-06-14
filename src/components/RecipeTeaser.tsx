import { BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline'
import { toNorwegianDateTimeString } from '@/utils/utils'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

export const RecipeTeaser = (props: { recipe: RecipeWithUser }) => {
    const supabase = createClient()
    const { data: imageUrl } = supabase.storage
        .from('images')
        .getPublicUrl(props.recipe.image ?? '')

    return (
        <a
            href={props.recipe.title}
            className="group"
        >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                    src={imageUrl.publicUrl}
                    alt={props.recipe.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    width={400}
                    height={500}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="mt-4 text-lg text-gray-700">
                    {props.recipe.title}
                </h3>
                <p className="flex flex-row gap-1 text-sm text-gray-700 items-center">
                    <ClockIcon className="h-6 w-6" />
                    {props.recipe.duration} minutter
                </p>
                <p className="flex flex-row gap-1 text-sm text-gray-700">
                    <BanknotesIcon className="h-6 w-6" />
                    {props.recipe.price} kr
                </p>
                <div>
                    <p className={'text-xs italic'}>
                        {props.recipe.profile!.first_name}{' '}
                        {props.recipe.profile!.middle_name &&
                            props.recipe.profile!.middle_name + ' '}
                        {props.recipe.profile!.last_name}
                    </p>
                    <p className={'text-xs italic'}>
                        {props.recipe.updated_at
                            ? `Siste oppdatert ${toNorwegianDateTimeString(props.recipe.updated_at)}`
                            : `Opprettet ${toNorwegianDateTimeString(props.recipe.created_at)}`}
                    </p>
                </div>
            </div>
        </a>
    )
}

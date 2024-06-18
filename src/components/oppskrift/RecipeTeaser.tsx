'use server'

import { BanknotesIcon, ClockIcon } from '@heroicons/react/24/outline'
import { toNorwegianDateTimeString } from '@/lib/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { RecipeWithUser } from '@/types/domain'
import { getPublicUrl } from '@/lib/data'

export const RecipeTeaser = async (props: { recipe: RecipeWithUser }) => {
    const publicUrl = props.recipe.image
        ? await getPublicUrl(props.recipe.image)
        : ''

    return (
        <Link
            href={`/oppskrifter/${props.recipe.slug}`}
            className="group"
        >
            <div className="flex flex-col items-center justify-center aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                {publicUrl ? (
                    <Image
                        src={publicUrl}
                        alt={props.recipe.title}
                        className="h-full w-full object-cover object-center sm:group-hover:opacity-75"
                        width={400}
                        height={500}
                    />
                ) : (
                    <p className="p-4 italic text-gray-500">Bilde mangler</p>
                )}
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
        </Link>
    )
}

'use server'
import Oppskrift from '@/components/oppskrift/form/Oppskrift'
import { createClient } from '@/lib/utils/supabase/client'
import {
    getIngredientTypes,
    getIngredientUnits,
    getRecipe,
    getTags,
} from '@/lib/data'

const Page = async ({ params }: { params: { slug: string } }) => {
    const supabase = createClient()

    const [units, types, tags, recipe] = await Promise.all([
        getIngredientUnits(),
        getIngredientTypes(),
        getTags(),
        getRecipe(params.slug),
    ])

    const { data: imageUrl } = recipe.image
        ? supabase.storage.from('images').getPublicUrl(recipe.image)
        : { data: { publicUrl: undefined } }

    return (
        <Oppskrift
            recipe={recipe}
            image={imageUrl.publicUrl}
            description="Endre oppskrift. Når du klikker lagre vil endringene være synlige for andre."
            heading="Endre oppskrift"
            units={units}
            types={types}
            tags={tags}
        />
    )
}

export default Page

import Oppskrift from '@/components/nyOppskriftForm/Oppskrift'
import { createClient } from '@/utils/supabase/client'

const Page = async ({ params }: { params: { slug: string } }) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
        .eq('slug', params.slug)
        .single()
    if (error) throw Error(`Finner ikke ${params.slug}`)

    const recipe: RecipeWithUser = data

    const { data: imageUrl } = supabase.storage
        .from('images')
        .getPublicUrl(recipe.image ?? '')

    return (
        <Oppskrift
            recipe={recipe}
            image={imageUrl.publicUrl}
            description="Endre oppskrift. Når du klikker lagre vil endringene være synlige for andre."
            heading="Endre oppskrift"
        />
    )
}

export default Page

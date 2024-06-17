import { createClient } from '@/utils/supabase/client'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
        .eq('slug', params.slug)
        .single()
    if (error) throw Error(`Finner ikke ${params.slug}`)

    const recipe: RecipeWithUser = data
    return recipe
}

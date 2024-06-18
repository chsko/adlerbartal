import { createClient } from '@/lib/utils/supabase/server'
import { RecipeWithUser } from '@/types/domain'

export const getRecipes = async (): Promise<RecipeWithUser[]> => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
    if (error) throw error
    return data
}

export const getRecipe = async (slug: string): Promise<RecipeWithUser> => {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
        .eq('slug', slug)
        .single()
    if (error) throw Error(`Finner ikke ${slug}`)

    return data
}

export const getPublicUrl = async (url: string) => {
    const supabase = createClient()

    const { data: imageUrl } = supabase.storage.from('images').getPublicUrl(url)
    return imageUrl.publicUrl
}

export const getIngredientTypes = async (): Promise<string[]> => {
    const supabase = createClient()
    const { data: ingredients, error } = await supabase.rpc(
        'get_unique_types',
        {
            table_name: 'recipe',
            column_name: 'ingredients',
            field_name: 'ingredient',
        }
    )

    if (error) throw Error('Forventer å kunne finne ingredienstyper')
    return ingredients
}

export const getIngredientUnits = async (): Promise<string[]> => {
    const supabase = createClient()
    const { data: units, error } = await supabase.rpc('get_unique_types', {
        table_name: 'recipe',
        column_name: 'ingredients',
        field_name: 'unit',
    })

    if (error) throw Error('Forventer å kunne finne enheter')
    return units
}

export const getTags = async (): Promise<string[]> => {
    const supabase = createClient()
    const { data: tags, error } = await supabase.rpc('get_unique_tags')

    if (error) throw Error('Forventer å kunne finne nøkkelord')
    return tags
}

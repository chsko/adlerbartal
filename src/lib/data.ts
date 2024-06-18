import { createClient } from '@/lib/utils/supabase/server'
import { RecipeWithUser } from '@/types/domain'
import { User } from '@supabase/auth-js'
import slugify from 'slugify'
import { IngredientFormData, NewRecipeResult } from '@/app/ny-oppskrift/actions'
import { SupabaseClient } from '@supabase/supabase-js'

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

export const getUser = async (): Promise<{ user: User }> => {
    const supabase = createClient()
    const { data: userData, error } = await supabase.auth.getUser()
    if (error || !userData) throw Error('Forventer innlogget bruker')
    return userData
}

export const createOrUpdateRecipe = async (
    data: IngredientFormData,
    user: User
): Promise<NewRecipeResult> => {
    const supabase = createClient()

    const filePath: string | undefined = data.image?.size
        ? `${user.id}-${Math.random()}.${data.image.name.split('.').pop()}`
        : undefined

    const [{ error: imageError }, { data: recipeResult, error: recipeError }] =
        await Promise.all([
            insertOrUpdateImage(supabase, data.image, filePath),
            insertOrUpdateRecipe(supabase, user.id, data, filePath),
        ])

    if (imageError) {
        recipeResult?.id && (await deleteRecipe(supabase, recipeResult.id))
        return {
            resultType: 'ERROR',
            error: 'Kunne ikke laste opp fil. Prøv igjen.',
        }
    }

    if (recipeError) {
        filePath && (await removeImage(supabase, filePath))
        return {
            resultType: 'ERROR',
            error: 'Kunne ikke lagre oppskrift. Prøv igjen.',
        }
    }

    return {
        resultType: data.id ? 'UPDATED' : 'INSERTED',
    }
}

const removeImage = async (client: SupabaseClient, filePath: string) =>
    await client.storage.from('images').remove([filePath])

const insertOrUpdateImage = async (
    client: SupabaseClient,
    image: File | undefined,
    path: string | undefined
) =>
    path && image
        ? await client.storage.from('images').upload(path, image)
        : { error: null }

const deleteRecipe = async (client: SupabaseClient, id: number) =>
    await client.from('recipe').delete().eq('id', id)

const insertOrUpdateRecipe = async (
    client: SupabaseClient,
    userId: string,
    data: IngredientFormData,
    filePath: string | undefined
) =>
    await client
        .from('recipe')
        .upsert(
            {
                id: data.id,
                title: data.title,
                price: data.price,
                duration: data.duration,
                image: filePath,
                content: data.steps,
                ingredients: data.ingredients.map((it) => ({
                    ingredient: it.ingredient,
                    unit: it.unit,
                    amount: it.amount,
                })),
                user_id: userId,
                slug: slugify(data.title, { lower: true }),
                tags: data.tags,
            },
            { onConflict: 'id' }
        )
        .select('id')
        .maybeSingle()

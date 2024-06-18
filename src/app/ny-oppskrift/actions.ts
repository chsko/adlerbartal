'use server'

import { createClient } from '@/lib/utils/supabase/server'
import slugify from 'slugify'

interface IngredientFormData {
    id: number | undefined
    title: string
    duration: number
    price: number
    image?: File
    steps: string
    ingredients: Ingredient[]
    tags: string[]
}

interface Ingredient {
    ingredient: string
    unit: string
    amount: number
}

export interface NewRecipeResult {
    resultType: 'ERROR' | 'INSERTED' | 'UPDATED'
    error?: string
}

export async function newRecipe(
    _: NewRecipeResult | null,
    formdata: FormData
): Promise<NewRecipeResult> {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user)
        throw Error('Forventer at bruker er satt. Kontakt Christian')

    let ingredients: Map<string, Ingredient> = new Map()

    formdata.forEach((value, key) => {
        if (!startsWithOneOf(key, ['ingredient', 'unit', 'amount'])) return
        const [field, id] = key.split('-')
        if (!ingredients.get(id)) {
            ingredients.set(id, { ingredient: '', unit: '', amount: 0 })
        }
        switch (field) {
            case 'ingredient':
                ingredients.get(id)!.ingredient = value as string
                return
            case 'unit':
                ingredients.get(id)!.unit = value as string
                return
            case 'amount':
                ingredients.get(id)!.amount = Number.parseFloat(value as string)
                return
        }
    })

    const id = formdata?.get('id') as string | undefined
    const data: IngredientFormData = {
        id: id ? Number.parseInt(id) : undefined,
        title: formdata.get('title') as string,
        price: Number.parseFloat(formdata.get('price') as string),
        duration: Number.parseInt(formdata.get('duration') as string),
        image: formdata?.get('file-upload') as File | undefined,
        steps: formdata.get('steps') as string,
        ingredients: Array.from(ingredients.values()),
        tags: formdata.getAll('tags') as string[],
    }

    let filePath: string | undefined

    if (data.image?.size) {
        const fileExt = data.image.name.split('.').pop()
        filePath = `${userData.user.id}-${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('images')
            .upload(filePath, data.image)

        if (uploadError) {
            return {
                resultType: 'ERROR',
                error: 'Kunne ikke laste opp fil. Prøv igjen.',
            }
        }
    }

    const { error: insertError } = await supabase.from('recipe').upsert(
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
            user_id: userData.user.id,
            slug: slugify(data.title, { lower: true }),
            tags: data.tags,
        },
        { onConflict: 'id' }
    )

    if (filePath && insertError) {
        await supabase.storage.from('images').remove([filePath])
        return {
            resultType: 'ERROR',
            error: 'Kunne ikke lagre oppskrift. Prøv igjen.',
        }
    }

    return {
        resultType: data.id ? 'UPDATED' : 'INSERTED',
    }
}

const startsWithOneOf = (str: string, prefixes: string[]): boolean => {
    return prefixes.some((prefix) => str.startsWith(prefix))
}

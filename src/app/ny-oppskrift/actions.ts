'use server'

import { createOrUpdateRecipe, getUser } from '@/lib/data'

export interface IngredientFormData {
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
    const userData = await getUser()

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

    return await createOrUpdateRecipe(data, userData.user)
}

const startsWithOneOf = (str: string, prefixes: string[]): boolean => {
    return prefixes.some((prefix) => str.startsWith(prefix))
}

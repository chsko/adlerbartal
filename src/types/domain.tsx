import { Database as DB } from '@/types/supabase'

export type Database = DB
export type User = DB['public']['Tables']['profile']['Row']
export type RecipeWithUser = DB['public']['Tables']['recipe']['Row'] & {
    profile: User | null
}

export interface Ingredient {
    id?: string
    ingredient?: string
    amount?: number
    unit?: string
}

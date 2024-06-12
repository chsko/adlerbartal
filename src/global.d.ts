import {Database as DB} from '@/types/supabase.ts'

declare global {
    type Database = DB
    type User = DB['public']['Tables']['profile']['Row']
    type RecipeWithUser = DB['public']['Tables']['recipe']['Row'] & {
        profile: User | null
    }
}

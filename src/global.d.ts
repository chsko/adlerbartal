import {Database as DB} from '@/types/supabase.ts'

declare global {
    type Database = DB
    type Recipe = DB['public']['Tables']['recipe']['Row']
}

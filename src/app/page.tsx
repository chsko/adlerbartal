import {createClient} from '@/utils/supabase/server'
import {RecipeTeaser} from '@/app/components/RecipeTeaser'

const Recipes = async () => {
    const supabase = createClient()
    const {data, error} = await supabase
        .from('recipe')
        .select(`*, profile (id, first_name, middle_name, last_name)`)
    if (error) throw error
    const recipes: RecipeWithUser[] = data
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl lg:text-5xl mb-12">Oppskrifter</h1>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {recipes?.map((recipe) => (
                        <RecipeTeaser key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Recipes

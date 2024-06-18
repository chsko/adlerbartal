import { RecipeTeaser } from '@/components/oppskrift/RecipeTeaser'
import { getRecipes } from '@/lib/data'

export const Oppskrifter = async () => {
    const recipes = await getRecipes()

    return (
        <>
            {recipes?.map((recipe) => (
                <RecipeTeaser
                    key={recipe.id}
                    recipe={recipe}
                />
            ))}
        </>
    )
}

import {createClient} from '@/utils/supabase/server'
import {QueryData} from '@supabase/supabase-js'
import {BanknotesIcon, ClockIcon} from '@heroicons/react/24/outline'

const supabase = createClient()
const recipesWithUsersQuery = supabase
    .from('recipe')
    .select(`*, profile (first_name, middle_name, last_name)`)

type RecipesWithUser = QueryData<typeof recipesWithUsersQuery>
type RecipeWithUser = RecipesWithUser[0]

const RecipeTeaser = (props: {recipe: RecipeWithUser}) => (
    <a href={props.recipe.title} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
                src={`https://fakeimg.pl/400x500`}
                alt={props.recipe.title}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>
        <div className="flex flex-col gap-2">
            <h3 className="mt-4 text-lg text-gray-700">{props.recipe.title}</h3>
            <p className="flex flex-row gap-1 text-sm text-gray-700 items-center">
                <ClockIcon className="h-6 w-6" />
                {props.recipe.duration} minutter
            </p>
            <p className="flex flex-row gap-1 text-sm text-gray-700">
                <BanknotesIcon className="h-6 w-6" />
                {props.recipe.price} kr
            </p>
            <div>
                <p className={'text-xs italic'}>
                    {props.recipe.profile!.first_name}{' '}
                    {props.recipe.profile!.middle_name &&
                        props.recipe.profile!.middle_name + ' '}
                    {props.recipe.profile!.last_name}
                </p>
                <p className={'text-xs italic'}>
                    {props.recipe.updated_at
                        ? `Siste oppdatert ${toNorwegianDateTimeString(props.recipe.updated_at)}`
                        : `Opprettet ${toNorwegianDateTimeString(props.recipe.created_at)}`}
                </p>
            </div>
        </div>
    </a>
)

const Recipes = async () => {
    const {data, error} = await recipesWithUsersQuery
    if (error) throw error
    const recipes: RecipesWithUser = data
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

const toNorwegianDateTimeString = (timestampString: string) => {
    const date = new Date(timestampString)

    // Format the date object to a human-readable string in Norwegian locale
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        timeZoneName: undefined,
    }

    return date.toLocaleString('nb-NO', options)
}

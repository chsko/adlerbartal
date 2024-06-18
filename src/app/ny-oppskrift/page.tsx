'use server'

import Oppskrift from '@/components/oppskrift/form/Oppskrift'
import { getIngredientTypes, getIngredientUnits, getTags } from '@/lib/data'

const Page = async () => {
    const [types, units, tags] = await Promise.all([
        getIngredientTypes(),
        getIngredientUnits(),
        getTags(),
    ])
    return (
        <Oppskrift
            heading="Ny oppskrift"
            description="Legg til en ny oppskrift. Når du klikker lagre vil oppskriften være synlig for andre."
            units={units}
            types={types}
            tags={tags}
        />
    )
}

export default Page

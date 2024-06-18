'use server'

import { createClient } from '@/lib/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(
    _: {
        message: string
    } | null,
    formdata: FormData
) {
    const supabase = createClient()

    const data = {
        email: formdata.get('email') as string,
        password: formdata.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        switch (error.message) {
            case 'Invalid login credentials':
                return {
                    message:
                        'Ugyldig innloggingsinformasjon. Vennligst prøv igjen.',
                }
            default:
                return {
                    message:
                        'En uventet feil har oppstått. Kontakt Christian :D',
                }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

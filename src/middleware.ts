import {NextRequest, NextResponse} from 'next/server'
import {updateSession} from '@/utils/supabase/middleware'
import {createClient} from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
    const supabase = createClient()

    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user) {
        console.log('Var ikke logget inn', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - login
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|login|error|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { SignJWT } from "jose"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    pages: {
        signIn: "/login"
    },
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL!,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnHome = nextUrl.pathname === '/';

            if (isOnDashboard) {
                return isLoggedIn; // only allow dashboard if logged in
            }

            if (isLoggedIn && isOnHome) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
        async session({ session, user }) {
            const secret = process.env.SUPABASE_JWT_SECRET;
            if (secret) {
                const jwtSecret = new TextEncoder().encode(secret)
                const payload = {
                    aud: "authenticated",
                    exp: Math.floor(new Date(session.expires).getTime() / 1000),
                    sub: user.id,
                    email: user.email,
                    role: "authenticated",
                }
                const alg = 'HS256'
                const jwt = await new SignJWT(payload)
                    .setProtectedHeader({ alg })
                    .sign(jwtSecret)
                session.supabaseAccessToken = jwt;
            }
            return session
        }
    }
})
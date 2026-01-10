import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    // Appel au backend externe
                    // L'URL est définie dans .env.local (NEXT_PUBLIC_API_URL)
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                    if (!apiUrl) {
                        console.error("NEXT_PUBLIC_API_URL n'est pas défini");
                        throw new Error("Configuration API manquante");
                    }

                    // On suppose que le endpoint est /login sur votre backend lié à 'etat_civil'
                    const response = await fetch(`${apiUrl}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    });

                    if (!response.ok) {
                        console.log("Réponse backend non OK:", response.status);
                        return null;
                    }

                    const data = await response.json();
                    const user = data.user || data; // Adaptez selon la structure de retour de votre API

                    if (user && user.id) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            // Vous pouvez ajouter le token JWT du backend ici si nécessaire
                        };
                    }

                    return null;
                } catch (error) {
                    console.error(
                        "Erreur lors de la tentative de connexion:",
                        error,
                    );
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub && session.user) {
                // @ts-ignore - Ajout de l'ID à la session
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
});

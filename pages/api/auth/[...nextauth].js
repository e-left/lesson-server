import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '../../../utils/db';

export default NextAuth({
    secret: process.env.JWT_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _) {
                // search db for user
                // problem here
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });


                // if not user return null
                if (!user) {
                    return null;
                }

                // compare passwords
                const correctPassword = await bcrypt.compare(credentials.password, user.password);

                // if wrong password return null
                if (!correctPassword) {
                    return null;
                }

                // return user
                return { name: user.name, email: user.email, permissions: user.permissions };
            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
                token.permissions = user.permissions;
            }
            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = token;
            return session;
        }
    }
});

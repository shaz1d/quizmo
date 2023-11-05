import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"
import GitHubProvider from "next-auth/providers/github"

declare module 'next-auth' {
    interface Session extends DefaultSession{
        user:{
            id:string;
        } & DefaultSession['user']
    }
}
declare module 'next-auth'{
    interface JWT{
        id:string
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    callbacks:{
        jwt:async ({token}) =>{
            const db_user = await prisma.user.findFirst({
                where:{
                    email: token?.email
                }
            })
            if(db_user){
                token.id = db_user.id
            }
            return token
        },
        session: ({session,token})=>{
            if(token){
                session.user.name = token.name
                session.user.email = token.email
                session.user.image= token.picture
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
          })
    ],
    adapter:PrismaAdapter(prisma)
}

export const getAuthSession = ()=>{
    return getServerSession(authOptions)
}
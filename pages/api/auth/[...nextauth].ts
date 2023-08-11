import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { useMutation } from "react-query";
import { login } from "../../../api/ApiUser";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text"},
              password: { label: "Password", type: "text" }
            },
            async authorize(credentials, req) {
                const {username, password} = credentials as {
                    username: string,
                    password: string
                };
                const loginMutation = useMutation( 
                    async (payload: any) => await login(payload), {
                    onSuccess: async (data: any) => {
                      return data
                    },
                    onError: () => {
                        return null
                    },
                  });

                await loginMutation.mutate({username, password})
                const res = loginMutation.isSuccess
                if (username) {
                    throw new Error("res")
                  } else {
                    throw new Error("sai roi")
                    
                  }
                // const res = await fetch("https://chippisoft.com/API/API.php", {
                //     method: "POST",
                //     headers: {
                //         "Content-type" : "application/json",
                //     },
                //     body: JSON.stringify({
                //         username,
                //         password
                //     })

                // })
                // const user = await res.json()
                // if(res.ok && user) {
                //     return user
                // } else return null
            //    if(username) {
            //     throw new Error(password)
            //    } else return null;
                
            }
          })
    ],

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: "/auth/login"
    }
}

export default NextAuth(authOptions)
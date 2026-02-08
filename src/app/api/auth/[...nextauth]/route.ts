/* route handler --- ب call فيه ال api عشا السيؤفؤ يكلمه على طول */

import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

/* its Api so i will use it as a get and set */
export { handler as GET, handler as POST };

/* 
      // its mean that the user just login and we have the user data and token
      // so we will add the user data and token to the jwt token
      // so we can access it in the session callback
      // and we will return the token with the user data and token
      // so we can access it in the session callback
      //token is the jwt token that we will return to the client and we will store it in the cookie(token ==> next-auth.session-token)
      //user is the user data that we will return from the authorize function (user ==> {id, user, token})
      jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token; //token {user: {name, email, role}, token: "the token that we will use to authenticate the user in the api"}
    },
            //رجع لي اليوزر عشان اقدر استخدمه
      session.user = token.user;
 */

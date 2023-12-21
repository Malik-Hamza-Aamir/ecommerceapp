import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            image: string;
            id: string;
        } & DefaultSession
    }

    interface User extends DefaultUser {
        image: string;
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        name: string;
        email: string;
        image: string;
        id: string;
    }
}
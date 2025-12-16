import { User } from "./auth_user.entity";

export const authProviders = [
    {
        provide: "AUTH_USERS_REPOSITORY",
        useValue: User
    }
]
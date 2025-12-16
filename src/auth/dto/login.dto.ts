import { IsNotEmpty, IsStrongPassword, IsEmail } from "class-validator";


export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string
}

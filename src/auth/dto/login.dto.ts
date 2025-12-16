import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { IsEmail } from "sequelize-typescript";


export class LoginDto {
    @IsNotEmpty()
    @IsEmail
    email: string

    @IsStrongPassword()
    password: string
}
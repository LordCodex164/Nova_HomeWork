import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth_user.entity';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import * as bcrypt from "bcrypt"
import { IResponse } from 'src/types/response';
import handleError from 'src/utils/handle_error';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_USERS_REPOSITORY")
        private readonly authUsersRepository: typeof User,
        private jwtService: JwtService
    ) { }
    async signIn(
        loginDto: LoginDto,
        res: Response
    ): Promise<IResponse<{
        user: Omit<User, "password">,
        access_token: string
    }>> {
        try {
            const user = await this.authUsersRepository.findOne({
                where: {
                    email: loginDto.email
                }
            })

            if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
                res.statusCode = HttpStatus.BAD_REQUEST
                    throw new BadRequestException("Invalid Credientials")
            }

            const payload = { id: user.id, email: user.email };

            const access_token = await this.jwtService.signAsync(payload)

            const returnUser = {
                ...user.dataValues,
            }

            delete returnUser.password

            return {
                status: "success",
                message: "Login Successful",
                data: {
                    user: returnUser,
                    access_token
                }
            }


        } catch (error) {
            handleError(error, res)
        }
    }

    async register(
        registerDto: RegisterDto,
        res: Response
    ): Promise<IResponse<{
        user: Omit<User, "password">
    }>> {
        try {
            const existingUser = await this.authUsersRepository.findOne({
                where: {
                    email: registerDto.email
                }
            })
            if (existingUser) {
                res.statusCode = HttpStatus.BAD_REQUEST
                throw new BadRequestException("User already exists")
            }
            const newUser = await this.authUsersRepository.create({
                ...registerDto
            }
            )

            const returnUser = {
                ...newUser.dataValues,
            }

            delete returnUser.password


            return {
                status: "success",
                message: "Registration Successful",
                data: {
                    user: returnUser
                }
            }
        } catch (error) {
            return handleError(error, res)
        }
    }
}

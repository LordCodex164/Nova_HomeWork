import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth_user.entity';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @Inject("AUTH_USERS_REPOSITORY")
        private readonly authUsersRepository: typeof User,
        private jwtService: JwtService
    ){}
    async signIn(
        loginDto: LoginDto,
        res: Response
    ) {
        try {
            const user = await this.authUsersRepository.findOne({
                where: {
                    email: loginDto.email
                }
            })
            
        } catch (error) {
            
        }
    }
}

import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(
    @Body()
    loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(loginDto, res);
  }

  @Post("/register")
  register(
    @Body()
    registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.register(registerDto, res);
  }
}

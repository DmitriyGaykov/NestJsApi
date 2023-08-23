import {Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {SignUpDto} from "./dto/signUp.dto";
import {AuthService} from "./auth.service";
import {FormDataRequest} from "nestjs-form-data";
import {AuthPipe} from "./pipes/auth.pipe";
import {SignInDto} from "./dto/signIn.dto";
import {User} from "../users/interfaces/user.interface";
import {Request} from "express";
import {JwtAuthGuard} from "../guards/jwt-auth-guard/jwt-auth.guard";

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {
    }
    @Post('reg')
    @FormDataRequest()
    @UsePipes(new AuthPipe())
    async signUp(@Body() dto : SignUpDto) : Promise<string> {
        return await this.authService.signUp(dto)
    }

    @Post('login')
    @FormDataRequest()
    @UsePipes(new ValidationPipe())
    async signIn(@Body() dto : SignInDto) : Promise<string> {
        return await this.authService.signIn(dto)
    }

    @Post('token-login')
    @UseGuards(JwtAuthGuard)
    async signInWithToken(@Req() req : Request) : Promise<User> {
        const user = req['user'];
        return this.authService.signInWithToken(user)
    }
}

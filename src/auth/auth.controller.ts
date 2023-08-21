import {Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {SignUpDto} from "./dto/signUp.dto";
import {AuthService} from "./auth.service";
import {FormDataRequest} from "nestjs-form-data";
import {AuthPipe} from "./pipes/auth.pipe";
import {SignInDto} from "./dto/signIn.dto";
import {User} from "../users/interfaces/user.interface";
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import {AuthGuard} from "@nestjs/passport";
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
import {Request} from "express";
import {JwtAuthGuard} from "../guards/jwt-auth-guard/jwt-auth.guard";

@Controller('api/auth')
export class AuthController {
    constructor(
<<<<<<< HEAD
        private readonly authService : AuthService
=======
<<<<<<< HEAD
        private readonly authService : AuthService
=======
        private readonly authService : AuthService,
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
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
        return this.authService.signInWithToken(req['user'])
    }
}

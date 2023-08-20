import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
<<<<<<< HEAD
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import {NestjsFormDataModule} from "nestjs-form-data";

export const _JwtModule = JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService : ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get('JWT_EXPIRES')
        }
    }),
    inject: [ConfigService]
})

@Module({
    imports: [
        _JwtModule,
        UsersModule,
        NestjsFormDataModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [UsersModule, _JwtModule]
=======
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {UsersModule} from "../users/users.module";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
    imports: [JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService : ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: configService.get('JWT_EXPIRES')
            }
        }),
        inject: [ConfigService]
    }),
    UsersModule,
    NestjsFormDataModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: []
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
})
export class AuthModule {}

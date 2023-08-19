import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
})
export class AuthModule {}

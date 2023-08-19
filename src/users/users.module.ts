import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./model/user.model";
import { CryptorModule } from './cryptor/cryptor.module';
import {CryptorService} from "./cryptor/cryptor.service";

@Module({
    imports: [MongooseModule.forFeature(
        [
            {
                name: 'User',
                schema: UserSchema
            }
        ]
    ), CryptorModule],
    providers: [UsersService, CryptorService],
    exports: [UsersService]
})
export class UsersModule {}

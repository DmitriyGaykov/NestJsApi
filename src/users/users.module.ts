import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
import {InjectModel, MongooseModule} from "@nestjs/mongoose";
=======
import {MongooseModule} from "@nestjs/mongoose";
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
import {UserSchema} from "./model/user.model";
import { CryptorModule } from './cryptor/cryptor.module';
import {CryptorService} from "./cryptor/cryptor.service";

@Module({
<<<<<<< HEAD
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'User',
                    schema: UserSchema
                }
            ]
        ),
        CryptorModule],
    providers: [UsersService],
=======
    imports: [MongooseModule.forFeature(
        [
            {
                name: 'User',
                schema: UserSchema
            }
        ]
    ), CryptorModule],
    providers: [UsersService, CryptorService],
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
    exports: [UsersService]
})
export class UsersModule {}

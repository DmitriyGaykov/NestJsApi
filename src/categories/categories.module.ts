import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesDbService } from './categories-db.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CategorySchema} from "./model/category.model";
import {NestjsFormDataModule} from "nestjs-form-data";
<<<<<<< HEAD
import {_JwtModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {ConfigService} from "../config/config.service";
import {MaterialsModule} from "./materials/materials.module";
import {FilesService} from "../files/files.service";
=======
import {_JwtModule, AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {ConfigService} from "../config/config.service";
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54


@Module({
  imports: [
      MongooseModule.forFeature([
        {
            name: 'Category',
            schema: CategorySchema
        }
      ]),
      UsersModule,
<<<<<<< HEAD
      MaterialsModule,
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
      _JwtModule,
      NestjsFormDataModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDbService, ConfigService]
})
export class CategoriesModule {}

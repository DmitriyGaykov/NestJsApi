import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesDbService } from './categories-db.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CategorySchema} from "./model/category.model";
import {NestjsFormDataModule} from "nestjs-form-data";
import {_JwtModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {ConfigService} from "../config/config.service";
import {MaterialsModule} from "./materials/materials.module";
import {FilesService} from "../files/files.service";


@Module({
  imports: [
      MongooseModule.forFeature([
        {
            name: 'Category',
            schema: CategorySchema
        }
      ]),
      UsersModule,
      MaterialsModule,
      _JwtModule,
      NestjsFormDataModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDbService, ConfigService]
})
export class CategoriesModule {}

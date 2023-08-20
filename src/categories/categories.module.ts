import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesDbService } from './categories-db.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CategorySchema} from "./model/category.model";
import {NestjsFormDataModule} from "nestjs-form-data";
import {_JwtModule, AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {ConfigService} from "../config/config.service";


@Module({
  imports: [
      MongooseModule.forFeature([
        {
            name: 'Category',
            schema: CategorySchema
        }
      ]),
      UsersModule,
      _JwtModule,
      NestjsFormDataModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesDbService, ConfigService]
})
export class CategoriesModule {}

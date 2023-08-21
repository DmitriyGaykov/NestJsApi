import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MaterialSchema} from "./model/material.model";
import { MaterialsController } from './materials.controller';
import {NestjsFormDataModule} from "nestjs-form-data";
import {MaterialsDbService} from "./materials-db.service";
import {FilesService} from "../../files/files.service";
import {UsersModule} from "../../users/users.module";
import {_JwtModule} from "../../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{
        name: 'Material',
        schema: MaterialSchema
      }]),
      NestjsFormDataModule,
      UsersModule,
      _JwtModule
  ],
  providers: [MaterialsService, MaterialsDbService, FilesService],
  controllers: [MaterialsController],
  exports: [MaterialsService]
})
export class MaterialsModule {}

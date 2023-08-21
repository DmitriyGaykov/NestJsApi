import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {QuestionSchema} from "./model/question.model";
import { QuestionsDbService } from './questions-db.service';
import {_JwtModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {NestjsFormDataModule} from "nestjs-form-data";

@Module({
  imports: [
      MongooseModule.forFeature([
        {
          name: 'Question',
          schema: QuestionSchema
        }
      ]),
      _JwtModule,
      UsersModule,
      NestjsFormDataModule
  ],
  providers: [QuestionsService, QuestionsDbService],
  controllers: [QuestionsController]
})
export class QuestionsModule {}

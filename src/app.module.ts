import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "./config/config.module";
import {ConfigService} from "./config/config.service";
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
<<<<<<< HEAD
import { CategoriesModule } from './categories/categories.module';
import {NestjsFormDataModule} from "nestjs-form-data";
import {AuthService} from "./auth/auth.service";
import {JwtService} from "@nestjs/jwt";
=======
import { ErrorsModule } from './errors/errors.module';
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499

@Module({
  imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configModule : ConfigService) => ({
            uri: configModule.get('STRINGCONNECTION')
        }),
        inject: [ConfigService]
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public')
      }),
<<<<<<< HEAD
      AuthModule,
      CategoriesModule,
=======
      AuthModule
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


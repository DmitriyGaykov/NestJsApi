import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "./config/config.module";
import {ConfigService} from "./config/config.service";
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import { ErrorsModule } from './errors/errors.module';

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
      AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


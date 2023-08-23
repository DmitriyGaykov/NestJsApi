import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {NestjsFormDataModule} from "nestjs-form-data";
import {_JwtModule} from "./auth.module";
import {request, Request} from "express";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {User} from "../users/interfaces/user.interface";
import {JwtAuthGuard} from "../guards/jwt-auth-guard/jwt-auth.guard";

describe('AuthController', () => {
  let controller: AuthController;
  let configService : ConfigService
  let jwtAuthGuard : JwtAuthGuard
  const context = {
    switchToHttp() {
      return {
        getRequest(): Request {
          return request
        }
      }
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          _JwtModule,
          UsersModule,
          NestjsFormDataModule,
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
          ConfigModule
      ],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get(AuthController);
    configService = module.get(ConfigService)
    jwtAuthGuard = module.get(JwtAuthGuard)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(configService).toBeDefined()
  })

  const name = 'Olga'
  const password = '123123123'

  let signUpToken: string
  let signInToken: string

  let signInUser : User,
      signUpUser : User

  it('Getting token after sign up', async () => {
    const signUpResponse = await controller.signUp({
      name,
      password
    })

    expect(signUpResponse).toBeDefined()

    signUpToken = signUpResponse
  })
  it('Getting token after sign in', async () => {
    const signInResponse = await controller.signIn({
      name,
      password
    })

    expect(signInResponse).toBeDefined()

    signInToken = signInResponse
  })
  it('Sign in with signIn token', async () => {
    expect(signInToken).toBeDefined()

    request.cookies = {
      [configService.get('JWT_COOKIE_NAME')]: signInToken
    }

    await jwtAuthGuard.canActivate(context as any)

    const userSignIn : User = await controller.signInWithToken(request)

    expect(userSignIn?._id).toBeDefined()
    expect(userSignIn?.name).toEqual(name)

    signInUser = userSignIn
  })
  it('Sign in with signUp token', async () => {
    expect(signInToken).toBeDefined()

    request.cookies = {
      [configService.get('JWT_COOKIE_NAME')]: signUpToken
    }

    await jwtAuthGuard.canActivate(context as any)

    const userSignUp : User = await controller.signInWithToken(request)

    expect(userSignUp?._id).toBeDefined()
    expect(userSignUp?.name).toEqual(name)

    signUpUser = userSignUp
  })
  it('Users should be similar', () => {
    expect(signUpUser?._id).toEqual(signInUser?._id)
  })
});

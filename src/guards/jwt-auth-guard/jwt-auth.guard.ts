import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "../../config/config.service";
import {LoggingByTokenUser} from "../../users/interfaces/user.interface";
import {ErrorsService} from "../../errors/errors.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
      private readonly jwtService : JwtService,
      private readonly configService : ConfigService
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()

    const token = req.cookies[this.configService.get('JWT_COOKIE_NAME')]

    if(!token)
      throw ErrorsService.getNotAuthorizedError()

    try {
      const user = await this.jwtService.verifyAsync<LoggingByTokenUser>(token)

      if(!user)
<<<<<<< HEAD
        throw ''
=======
        throw ErrorsService.getNotAuthorizedError()
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499

      req['user'] = user

    } catch {
      throw ErrorsService.getNotAuthorizedError()
    }

    return true;
  }
}

import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {LoggingByTokenUser} from "../../users/interfaces/user.interface";
import {ErrorsService} from "../../errors/errors.service";
import {UsersService} from "../../users/users.service";
import {Roles} from "../../users/interfaces/roles.enum";
import {Reflector} from "@nestjs/core";

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
      private readonly usersService : UsersService,
      private readonly reflector : Reflector
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest()
    const user = request['user'] as LoggingByTokenUser

    if(!user) {
      throw ErrorsService.getNotAuthorizedError()
    }

    const role : Roles = this.reflector.get<Roles>('auth-as', context.getHandler())

    try {
      const __user = await this.usersService.get(user)

      if(!__user || __user.role !== role) {
        throw new Error()
      }

      request['user'] = user
    } catch {
      throw ErrorsService.getNotAuthorizedError()
    }

    return true
  }
}

import {BadRequestException, CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from "express";
import { differenceInSeconds } from 'date-fns';

@Injectable()
export class CanDoGuard implements CanActivate {
  private static readonly WAITTIME : number = 60

  private readonly blockedIp = new Map<string, Date>()

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request : Request = context.switchToHttp().getRequest()
    const ip : string = request.ip
    const lastDate: Date | undefined = this.blockedIp.get(ip)

    if(lastDate) {
      const diff: number = differenceInSeconds(new Date(), lastDate)

      if(diff > CanDoGuard.WAITTIME) {
        this.blockedIp.delete(ip)
        return true
      }

      throw new BadRequestException(`Ошибка. Функция заблокирована. До разблокировки осталось ${CanDoGuard.WAITTIME - diff} сек.`)
    }

    this.blockedIp.set(ip, new Date())

    return true;
  }
}

import {ArgumentMetadata, BadRequestException, Injectable, ValidationPipe} from '@nestjs/common';
import {ErrorsService} from "../../errors/errors.service";

@Injectable()
export class AuthPipe extends ValidationPipe {
  constructor() {
    super();
  }

  async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
    try {
      return await super.transform(value, metadata)
    } catch(e) {
      throw ErrorsService.generateError(e as BadRequestException)
    }
  }
}

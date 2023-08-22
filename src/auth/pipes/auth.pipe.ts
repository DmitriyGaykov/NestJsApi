import {ArgumentMetadata, BadRequestException, Injectable, ValidationPipe, ValidationPipeOptions} from '@nestjs/common';
import {ErrorsService} from "../../errors/errors.service";

@Injectable()
export class AuthPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
    try {
      return await super.transform(value, metadata)
    } catch(e) {
      throw ErrorsService.generateError(e as BadRequestException)
    }
  }
}

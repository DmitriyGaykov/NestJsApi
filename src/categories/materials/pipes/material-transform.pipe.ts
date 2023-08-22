import {ArgumentMetadata, Injectable, PipeTransform, ValidationPipeOptions} from '@nestjs/common';
import {AuthPipe} from "../../../auth/pipes/auth.pipe";
import {MaterialDto} from "../interfaces/material.interface";

@Injectable()
export class MaterialTransformPipe extends AuthPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options)
  }
  async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
    const materialDto : MaterialDto = value

    try {
      const price : number | undefined = materialDto['price']

      if(price)
        materialDto['price'] = Number(price)
    } catch {}

    return await super.transform(value, metadata);
  }
}

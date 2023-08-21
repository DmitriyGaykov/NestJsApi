import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {AuthPipe} from "../../../auth/pipes/auth.pipe";
import {MaterialDto} from "../interfaces/material.interface";

@Injectable()
export class MaterialTransformPipe extends AuthPipe {
  constructor() {
    super()
  }
  async transform(value: any, metadata: ArgumentMetadata) : Promise<any> {
    const materialDto : MaterialDto = value

    try {
      materialDto['price'] = Number(materialDto['price'])
    } catch (e) {}

    return await super.transform(value, metadata);
  }
}

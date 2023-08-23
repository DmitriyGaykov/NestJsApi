import {ArgumentMetadata, Injectable, ParseIntPipe} from '@nestjs/common';

@Injectable()
export class ParseIntNullablePipe extends ParseIntPipe {
  constructor() {
    super()
  }

  async transform(value: any, metadata: ArgumentMetadata) : Promise<number | undefined> {
    if(value) {
      return super.transform(value, metadata)
    }
    return value
  }
}

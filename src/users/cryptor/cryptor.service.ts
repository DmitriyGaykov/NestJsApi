import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class CryptorService {
    public static readonly SALTS : number = 10;

    async toHash(password : string) : Promise<string> {
        return bcrypt.hash(password, CryptorService.SALTS)
    }

    async compareHash(password: string, hash: string) : Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}

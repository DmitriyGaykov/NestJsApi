import { Injectable } from '@nestjs/common';
import {config} from "dotenv";
import {ConfigData} from "./interfaces/config-data.interface";

@Injectable()
export class ConfigService {
    private readonly envConfig : ConfigData
    constructor() {
        config()
        this.envConfig = process.env
    }

    get(key : string) : string | undefined {
        return this.envConfig[key]
    }
}

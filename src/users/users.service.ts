import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose'
import {INullableUser, LoggingByTokenUser, LoggingUser, User as IUser, Users} from './interfaces/user.interface'
import {CryptorService} from "./cryptor/cryptor.service";
import {ValidationError} from "../errors/interfaces/validationError.interface";
import {ErrorsService} from "../errors/errors.service";
@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly User : Model<Users>,
        private readonly cryptorService : CryptorService
    ) {}

    async create(user : LoggingUser) : Promise<IUser> {
        try {
            return await this.User.create({
                ...user,
                password: await this.cryptorService.toHash(user.password)
            })
        } catch (e) {
            const errors = e as ValidationError
            throw ErrorsService.generateBadRequestFromValidError(errors)
        }
    }

    async getByFilter(user : INullableUser) : Promise<IUser> {
        return this.User.findOne(user)
    }

    async has(user : LoggingUser) : Promise<IUser> | undefined {
        const _user = await this.User.findOne({
            name: user.name
        })

        if(!_user)
            return undefined;

        if(await this.cryptorService.compareHash(user.password, _user.password))
            return _user

        return undefined
    }

    async get({_id, name} : LoggingByTokenUser) : Promise<IUser> {
        return this.User.findOne({
            _id,
            name
        });
    }
}
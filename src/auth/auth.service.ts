import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {LoggingByTokenUser, LoggingUser, User} from "../users/interfaces/user.interface";
import {UsersService} from "../users/users.service";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly usersService : UsersService
    ) {
    }

    async signUp(user : LoggingUser) : Promise<string> {
        const new_user = await this.usersService.create(user)
        return this.generateToken(new_user)
    }

    async signIn(user : LoggingUser) : Promise<string> {
        const _user = await this.usersService.has(user)

        if(_user) {
            return this.generateToken(_user)
        } else {
            throw ErrorsService.getNotAuthorizedError()
        }
    }

    async signInWithToken(user : LoggingByTokenUser) : Promise<User> {
        const _user = await this.usersService.get(user)

        if(_user)
            return _user

        throw ErrorsService.getNotAuthorizedError()
    }

    private async generateToken(user : LoggingByTokenUser) : Promise<string> {
        return this.jwtService.signAsync({
            _id: user._id,
            name: user.name
        })
    }
}

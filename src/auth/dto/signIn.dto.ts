import {LoggingUser} from "../../users/interfaces/user.interface";
import {MinLength} from "class-validator";

export class SignInDto implements LoggingUser {
    @MinLength(2)
    name: string;
    @MinLength(8)
    password: string
}
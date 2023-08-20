import { LoggingUser } from "../../users/interfaces/user.interface";
import {MaxLength, MinLength} from "class-validator";

export class SignUpDto implements LoggingUser {
    @MinLength(2, { message: 'name|Минимальная длина имени — 2 символа' })
    @MaxLength(20, { message: 'name|Максимальная длина имени — 20 символов' })
    name: string;

    @MinLength(8, { message: 'password|Пароль должен состоять как минимум из 8 символов' })
    @MaxLength(64, { message: 'password|Максимальная длина пароля 64 символа' })
    password: string;
}
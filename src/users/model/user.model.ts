import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {LoggingUser} from '../interfaces/user.interface'
import {Roles} from "../interfaces/roles.enum";
import * as mongooseUniqueValidator from "mongoose-unique-validator";

@Schema()
class User implements LoggingUser {
    @Prop({
        required: true,
        unique: true
    })
    name: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        required: true,
        default: Roles.user
    })
    role : Roles
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.plugin(mongooseUniqueValidator)


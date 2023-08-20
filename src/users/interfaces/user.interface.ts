import {Document} from 'mongoose'
import {Roles} from "./roles.enum";
export interface User {
    _id: string,
    name: string,
    password: string
    role: Roles
}

export interface INullableUser {
    _id?: string,
    name?: string,
    password?: string,
    role: Roles
}

export type LoggingUser = Omit<User, '_id' | 'role'>

export type LoggingByTokenUser = Omit<User, 'password' | 'role'>

export type Users = User & LoggingUser & LoggingByTokenUser
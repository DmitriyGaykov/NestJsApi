import {Document} from 'mongoose'
<<<<<<< HEAD
import {Roles} from "./roles.enum";
=======
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
export interface User {
    _id: string,
    name: string,
    password: string
<<<<<<< HEAD
    role: Roles
=======
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
}

export interface INullableUser {
    _id?: string,
    name?: string,
<<<<<<< HEAD
    password?: string,
    role: Roles
}

export type LoggingUser = Omit<User, '_id' | 'role'>

export type LoggingByTokenUser = Omit<User, 'password' | 'role'>
=======
    password?: string
}

export type LoggingUser = Omit<User, '_id'>

export type LoggingByTokenUser = Omit<User, 'password'>
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499

export type Users = User & LoggingUser & LoggingByTokenUser
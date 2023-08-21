import {Document} from 'mongoose'
<<<<<<< HEAD
import {Roles} from "./roles.enum";
=======
<<<<<<< HEAD
import {Roles} from "./roles.enum";
=======
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
export interface User {
    _id: string,
    name: string,
    password: string
<<<<<<< HEAD
    role: Roles
=======
<<<<<<< HEAD
    role: Roles
=======
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
}

export interface INullableUser {
    _id?: string,
    name?: string,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
    password?: string,
    role: Roles
}

export type LoggingUser = Omit<User, '_id' | 'role'>

export type LoggingByTokenUser = Omit<User, 'password' | 'role'>
<<<<<<< HEAD
=======
=======
    password?: string
}

export type LoggingUser = Omit<User, '_id'>

export type LoggingByTokenUser = Omit<User, 'password'>
>>>>>>> dd7cfa9b24ea7ee0764739a917ebb3e3c4e35499
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54

export type Users = User & LoggingUser & LoggingByTokenUser
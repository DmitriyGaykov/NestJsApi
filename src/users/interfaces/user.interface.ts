import {Document} from 'mongoose'
export interface User {
    _id: string,
    name: string,
    password: string
}

export interface INullableUser {
    _id?: string,
    name?: string,
    password?: string
}

export type LoggingUser = Omit<User, '_id'>

export type LoggingByTokenUser = Omit<User, 'password'>

export type Users = User & LoggingUser & LoggingByTokenUser
import { MaterialWithoutId} from "../interfaces/material.interface";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongooseUniqueValidator from "mongoose-unique-validator";
import {UserSchema} from "../../../users/model/user.model";
import {User} from "../../../users/interfaces/user.interface";
import {ICategory} from "../../interfaces/category.interface";
import {CategorySchema} from "../../model/category.model";
import {Schema as MongooseSchema} from 'mongoose'
@Schema()
class Material implements MaterialWithoutId {
    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: 'Category'
    })
    category: ICategory

    @Prop({
        required: true,
        default: new Date()
    })
    datePublish: Date;

    @Prop({
        required: true
    })
    description: string;

    @Prop({
        required: true
    })
    img: string;

    @Prop({
        type: String,
        required: true,
        unique: true
    })
    name: string;

    @Prop({
        required: true
    })
    price: number;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref:'User'
    })
    user: User;
}

export const MaterialSchema = SchemaFactory.createForClass(Material)

MaterialSchema.plugin(mongooseUniqueValidator)
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {CategoryWithoutId} from "../interfaces/category.interface";
import * as mongooseUniqueValidator from "mongoose-unique-validator";

@Schema()
class Category implements CategoryWithoutId {
    @Prop({
        required: true,
        unique: true
    })
    name : string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.plugin(mongooseUniqueValidator)
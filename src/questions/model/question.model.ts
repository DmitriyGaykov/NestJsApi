import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {QuestionDto} from "../interfaces/question.interface";
import * as mongooseUniqueValidator from "mongoose-unique-validator";

@Schema()
class Question implements QuestionDto {
    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true
    })
    comment: string;

    @Prop({
        required: true
    })
    phone: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question)
QuestionSchema.plugin(mongooseUniqueValidator)
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IQuestion, QuestionDto} from "./interfaces/question.interface";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class QuestionsDbService {
    constructor(
       @InjectModel('Question') private readonly Question : Model<IQuestion>
    ) {}

    async add({ name, phone, comment } : QuestionDto) : Promise<IQuestion> {
        try {
            return await this.Question.create({
                name,
                phone,
                comment
            })
        } catch (e) {
            throw ErrorsService.generateBadRequestFromValidError(e)
        }
    }

    async getAll(take?: number, skip?: number) : Promise<IQuestion[]> {
        return this.Question.find()
            .skip(skip)
            .limit(take)
    }

    async get(_id: string) : Promise<IQuestion> {
        try {
            const question : IQuestion = await this.Question.findById(_id)

            if(!question) {
                throw '';
            }

            return question
        } catch {
            throw ErrorsService.generateNoContentException()
        }
    }

    async deleteQuestion(_id : string) : Promise<IQuestion> {
        try {
            const question = await this.Question.findByIdAndRemove(_id)

            if(!question)
                throw ''

            return question
        } catch {
            throw ErrorsService.generateNoContentException()
        }
    }
}

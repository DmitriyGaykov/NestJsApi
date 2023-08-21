import { Injectable } from '@nestjs/common';
import {IQuestion, QuestionDto} from "./interfaces/question.interface";
import {QuestionsDbService} from "./questions-db.service";

@Injectable()
export class QuestionsService {

    constructor(
        private readonly questionDbService : QuestionsDbService
    ) {}

    async add(question : QuestionDto) : Promise<IQuestion> {
        return this.questionDbService.add(question)
    }

    async getAll() : Promise<IQuestion[]> {
        return this.questionDbService.getAll()
    }

    async get(_id : string) : Promise<IQuestion> {
        return this.questionDbService.get(_id)
    }

    async deleteQuestion(_id: string) : Promise<IQuestion> {
        return this.questionDbService.deleteQuestion(_id)
    }
}

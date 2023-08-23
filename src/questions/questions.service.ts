import { Injectable } from '@nestjs/common';
import {IQuestion, QuestionDto} from "./interfaces/question.interface";
import {QuestionsDbService} from "./questions-db.service";

@Injectable()
export class QuestionsService {
    private readonly countElementInPage: number = 5

    constructor(
        private readonly questionDbService : QuestionsDbService
    ) {}

    async add(question : QuestionDto) : Promise<IQuestion> {
        return this.questionDbService.add(question)
    }

    async getAll(page?: number) : Promise<IQuestion[]> {
        let take : number | undefined
        let skip : number | undefined

        if(page !== undefined) {
            take = this.countElementInPage
            skip = this.countElementInPage * page
        }

        return this.questionDbService.getAll(take, skip)
    }

    async get(_id : string) : Promise<IQuestion> {
        return this.questionDbService.get(_id)
    }

    async deleteQuestion(_id: string) : Promise<IQuestion> {
        return this.questionDbService.deleteQuestion(_id)
    }
}

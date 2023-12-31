import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes} from '@nestjs/common';
import {IQuestion} from "./interfaces/question.interface";
import {AuthPipe} from "../auth/pipes/auth.pipe";
import {QuestionDto} from "./dto/add.dto";
import {QuestionsService} from "./questions.service";
import {Roles} from "../users/interfaces/roles.enum";
import {AuthAs} from "../decorators/auth-as/auth-as.decorator";
import {CanDoGuard} from "../guards/can-do/can-do.guard";
import {FormDataRequest} from "nestjs-form-data";
import {ParseIntNullablePipe} from "../pipes/parse-int-nullable/parse-int-nullable.pipe";

@Controller('/api/questions')
export class QuestionsController {
    constructor(
        private readonly questionService : QuestionsService
    ) {}

    @Post()
    @UsePipes(new AuthPipe())
    @UseGuards(CanDoGuard)
    @FormDataRequest()
    async add(@Body() dto : QuestionDto) : Promise<IQuestion> {
        return await this.questionService.add(dto)
    }

    @Get()
    @AuthAs(Roles.admin)
    async getAll(@Query('page', ParseIntNullablePipe) page?: number) : Promise<IQuestion[]> {
        return await this.questionService.getAll(page)
    }

    @Get(':id')
    @AuthAs(Roles.admin)
    async get(@Param('id') id: string) : Promise<IQuestion> {
        return await this.questionService.get(id)
    }

    @Delete(':id')
    @AuthAs(Roles.admin)
    async deleteQuestion(@Param('id') id: string) : Promise<IQuestion> {
        return await this.questionService.deleteQuestion(id)
    }
}

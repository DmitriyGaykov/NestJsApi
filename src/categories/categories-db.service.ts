import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {CategoryWithoutId, ICategory} from "./interfaces/category.interface";
import {Model} from "mongoose";
import {ValidationError} from "../errors/interfaces/validationError.interface";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class CategoriesDbService {
    constructor(
        @InjectModel('Category') private readonly Category : Model<ICategory>
    ) {}

    async add({ name } : CategoryWithoutId) : Promise<ICategory> {
        try {
            return await this.Category.create({ name })
        } catch (e) {
            const errors : ValidationError = e
            throw ErrorsService.generateBadRequestFromValidError(errors)
        }
    }

    async getAll() : Promise<ICategory[]> {
        return this.Category.find({})
    }
}

import { Injectable } from '@nestjs/common';
import {CategoriesDbService} from "./categories-db.service";
import {CategoryWithoutId, ICategory} from "./interfaces/category.interface";
import {ErrorsService} from "../errors/errors.service";

@Injectable()
export class CategoriesService {
    constructor(
       private readonly categoriesDbService : CategoriesDbService
    ) {}

    async add(category : CategoryWithoutId) : Promise<ICategory> {
        return this.categoriesDbService.add(category)
    }

    async getAll() : Promise<ICategory[]> {
        return this.categoriesDbService.getAll()
    }
}

import { Injectable } from '@nestjs/common';
import {CategoriesDbService} from "./categories-db.service";
import {CategoryWithoutId, ICategory} from "./interfaces/category.interface";
import {ErrorsService} from "../errors/errors.service";
import {MaterialsService} from "./materials/materials.service";
import {IEditDto, IMaterial} from "./materials/interfaces/material.interface";

@Injectable()
export class CategoriesService {
    constructor(
       private readonly categoriesDbService : CategoriesDbService,
       private readonly materialsService : MaterialsService
    ) {}

    async add(category : CategoryWithoutId) : Promise<ICategory> {
        return this.categoriesDbService.add(category)
    }

    async getAll() : Promise<ICategory[]> {
        return this.categoriesDbService.getAll()
    }

    async getMaterialsByCategory(_id: string, page?: number) : Promise<IMaterial[]> {
        try {
            return await this.materialsService.getAllByCategory(_id, page)
        } catch {
            throw ErrorsService.generateNoContentException("Такой категории не существует")
        }
    }
}

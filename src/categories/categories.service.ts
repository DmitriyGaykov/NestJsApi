import { Injectable } from '@nestjs/common';
import {CategoriesDbService} from "./categories-db.service";
import {CategoryWithoutId, ICategory} from "./interfaces/category.interface";
import {ErrorsService} from "../errors/errors.service";
<<<<<<< HEAD
import {MaterialsService} from "./materials/materials.service";
import {IMaterial} from "./materials/interfaces/material.interface";
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54

@Injectable()
export class CategoriesService {
    constructor(
<<<<<<< HEAD
       private readonly categoriesDbService : CategoriesDbService,
       private readonly materialsService : MaterialsService
=======
       private readonly categoriesDbService : CategoriesDbService
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
    ) {}

    async add(category : CategoryWithoutId) : Promise<ICategory> {
        return this.categoriesDbService.add(category)
    }

    async getAll() : Promise<ICategory[]> {
        return this.categoriesDbService.getAll()
    }
<<<<<<< HEAD

    async getAllMaterialsByCategory(_id: string) : Promise<IMaterial[]> {
        try {
            return await this.materialsService.getAllByCategory(_id)
        } catch {
            throw ErrorsService.generateNoContentException("Такой категории не существует")
        }
    }
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
}

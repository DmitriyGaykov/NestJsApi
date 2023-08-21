<<<<<<< HEAD
import {Body, Controller, Get, Param, Post} from '@nestjs/common';
=======
import {Body, Controller, Get, Post} from '@nestjs/common';
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
import {CategoriesService} from "./categories.service";
import {AddDto} from "./dto/add.dto";
import {ICategory} from "./interfaces/category.interface";
import {AuthAs} from "../decorators/auth-as/auth-as.decorator";
import {Roles} from "../users/interfaces/roles.enum";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {FormDataRequest} from "nestjs-form-data";
<<<<<<< HEAD
import {IMaterial} from "./materials/interfaces/material.interface";
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54

@Controller('api/categories')
export class CategoriesController {
    constructor(
        private readonly categoryService : CategoriesService
    ) {}

    @Post('add')
    @AuthAs(Roles.admin)
    @FormDataRequest()
    async add(@Body() dto : AddDto) : Promise<ICategory> {
        return await this.categoryService.add(dto)
    }

    @Get()
    async getAll() : Promise<ICategory[]> {
        return await this.categoryService.getAll()
    }
<<<<<<< HEAD

    @Get(':id/materials')
    async getMaterialsByCategory(@Param('id') id : string) : Promise<IMaterial[]> {
        return await this.categoryService.getAllMaterialsByCategory(id)
    }
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
}

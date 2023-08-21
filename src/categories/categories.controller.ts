import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {AddDto} from "./dto/add.dto";
import {ICategory} from "./interfaces/category.interface";
import {AuthAs} from "../decorators/auth-as/auth-as.decorator";
import {Roles} from "../users/interfaces/roles.enum";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {FormDataRequest} from "nestjs-form-data";
import {IMaterial} from "./materials/interfaces/material.interface";

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

    @Get(':id/materials')
    async getMaterialsByCategory(@Param('id') id : string) : Promise<IMaterial[]> {
        return await this.categoryService.getAllMaterialsByCategory(id)
    }
}

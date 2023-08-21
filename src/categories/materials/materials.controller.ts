import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post,
    Req,
    UsePipes
} from '@nestjs/common';
import {IMaterial} from "./interfaces/material.interface";
import {FormDataRequest, MemoryStoredFile} from "nestjs-form-data";
import {AuthAs} from "../../decorators/auth-as/auth-as.decorator";
import {Roles} from "../../users/interfaces/roles.enum";
import {MaterialsService} from "./materials.service";
import {AddDto} from "./dto/add.dto";
import {MaterialTransformPipe} from "./pipes/material-transform.pipe";
import {Request} from "express";

@Controller('api/materials')
export class MaterialsController {
    constructor(
        private readonly materialService : MaterialsService
    ) {}

    @Post()
    @AuthAs(Roles.admin)
    @UsePipes(new MaterialTransformPipe())
    @FormDataRequest()
    async add(@Body() dto : AddDto, @Req() req : Request) : Promise<IMaterial> {
        const userId = req['user']?._id as string;
        const img = dto['img'] as MemoryStoredFile;
        return await this.materialService.add(dto, userId, img, req)
    }

    @Get(':id')
    async get(@Param('id') id : string, @Req() req : Request) : Promise<IMaterial> {
        return await this.materialService.get(id, req)
    }

    @Delete(':id')
    @AuthAs(Roles.admin)
    async deleteMaterial(@Param('id') id : string) : Promise<IMaterial> {
        return await this.materialService.deleteMaterial(id)
    }
}

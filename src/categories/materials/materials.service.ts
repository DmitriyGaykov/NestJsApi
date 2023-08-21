import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MaterialsDbService} from "./materials-db.service";
import {
    IMaterial,
    MaterialDto,
    MaterialWithoutId
} from "./interfaces/material.interface";
import {FilesService} from "../../files/files.service";
import {MemoryStoredFile} from "nestjs-form-data";
import {Request} from "express";
import {ErrorsService} from "../../errors/errors.service";

@Injectable()
export class MaterialsService {
    constructor(
        private readonly materialDbService : MaterialsDbService,
        private readonly filesService : FilesService
    ) {}

    async add(material : MaterialDto, userId : string, img : MemoryStoredFile, req : Request) : Promise<IMaterial> {
        const mat : IMaterial = await this.materialDbService.add({
            name: material.name,
            description: material.description,
            price: material.price,
            user: {_id: userId},
            category: {_id: material.categoryId},
            img: img?.originalName
        } as MaterialWithoutId);

        this.filesService.rename(img, mat._id)

        await this.filesService.saveMaterialFile(img)

        mat.img = this.filesService.getNameForMaterialImg(img.originalName, req)

        await this.materialDbService.edit({ _id: mat._id, img: img.originalName } as IMaterial)

        return mat
    }

    async get(_id: string, req : Request) : Promise<IMaterial> {
        try {
            const material: IMaterial = await this.materialDbService.get(_id)

            if (material) {
                material.img = this.filesService.getNameForMaterialImg(material.img, req)
            }

            return material
        } catch {
            throw ErrorsService.generateNoContentException()
        }
    }

    async deleteMaterial(_id : string) : Promise<IMaterial> {
        const material = await this.materialDbService.dell(_id)

        if(material) {
            const { img } = material;
            await this.filesService.deleteMaterialFile(img)
            return material
        } else {
            throw ErrorsService.generateNoContentException('Данного материала нет')
        }
    }

    async getAllByCategory(categoryId : string) : Promise<IMaterial[]> {
        return this.materialDbService.getAllByCategory(categoryId)
    }
}

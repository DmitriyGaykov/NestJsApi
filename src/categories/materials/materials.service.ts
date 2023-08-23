import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MaterialsDbService} from "./materials-db.service";
import {
    IEditDto,
    IMaterial,
    MaterialDto,
    MaterialWithoutId
} from "./interfaces/material.interface";
import {FilesService} from "../../files/files.service";
import {MemoryStoredFile} from "nestjs-form-data";
import {Request} from "express";
import {ErrorsService} from "../../errors/errors.service";
import {extname} from "path";

@Injectable()
export class MaterialsService {
    private readonly countMaterialsInPage = 5

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

    async getAllByCategory(categoryId : string, page?: number) : Promise<IMaterial[]> {
        let take: number | undefined
        let skip: number | undefined

        if(page !== undefined) {
            take = this.countMaterialsInPage
            skip = page * this.countMaterialsInPage
        }

        return this.materialDbService.getAllByCategory(categoryId, take, skip)
    }

    async edit(material : IEditDto, img : MemoryStoredFile) : Promise<IMaterial> {
        const _material : IMaterial = await this.materialDbService.edit({
            ...material,
            img: undefined
        })

        if(!img)
            return _material

        const _img = _material.img
        const _ext = this.filesService.getExt(_img)

        const ext = this.filesService.getExt(img.originalName)

        await this.filesService.deleteMaterialFile(_img)
        this.filesService.rename(img, material._id)
        await this.filesService.saveMaterialFile(img)

        if(ext && ext === _ext) {
            return _material
        }

        await this.filesService.saveMaterialFile(img)

        return this.materialDbService.edit({
            _id: material._id,
            img: img.originalName
        })
    }
}

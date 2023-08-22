import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {IEditDto, IMaterial, MaterialWithoutId} from "./interfaces/material.interface";
import {Document, Model} from "mongoose";
import {ErrorsService} from "../../errors/errors.service";

@Injectable()
export class MaterialsDbService {
    constructor(
       @InjectModel('Material') private readonly Material : Model<IMaterial>
    ) {}

    async add(mat : MaterialWithoutId) : Promise<IMaterial> {
        try {
            return this.populate(await this.Material.create({...mat}))
        } catch (e) {
            throw ErrorsService.generateBadRequestFromValidError(e)
        }
    }

    async get(_id : string) : Promise<IMaterial> {
        return this.populate(await this.Material.findById(_id))
    }

    async getAllByCategory(categoryId : string) : Promise<IMaterial[]> {
        return this.Material.find({category : categoryId}).populate('user').populate('category');
    }

    async edit({_id, name, description, price, img } : IMaterial | IEditDto) {
        try {
            const material = await this.Material.findByIdAndUpdate(_id, {
                name,
                description,
                price,
                img
            })

            return this.populate(material)
        } catch (e) {
            throw ErrorsService.generateBadRequestFromValidError(e)
        }
    }

    async dell(_id : string) : Promise<IMaterial> {
        return this.Material.findByIdAndRemove(_id)
    }

    private async populate(material : Document) : Promise<IMaterial> {
        return (await material.populate('user')).populate('category')
    }
}

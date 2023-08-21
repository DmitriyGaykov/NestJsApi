import {Injectable} from '@nestjs/common';
import * as fs from "fs";
import * as path from "path";
import {extname} from "path";
import {Request} from "express";
import {MemoryStoredFile} from "nestjs-form-data";
@Injectable()
export class FilesService {
    static readonly materialsPath : string = path.resolve(__dirname, '../../public/img/materials')
    async saveMaterialFile(file : MemoryStoredFile) : Promise<void> {
        return fs.promises.writeFile(path.resolve(FilesService.materialsPath, file.originalName), file.buffer)
    }

    rename(file : MemoryStoredFile, newName : string) : void {
        file.originalName = newName + '.' + file.originalName.split('.')?.at(-1)
    }

    async deleteMaterialFile(name : string) : Promise<void> {
        return fs.promises.unlink(path.resolve(FilesService.materialsPath, name))
    }

    getNameForMaterialImg(name : string, req : Request) : string {
        return `http://${req.hostname}:3001/img/materials/${name}`
    }
}

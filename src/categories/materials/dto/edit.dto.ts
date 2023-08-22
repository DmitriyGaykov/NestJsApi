import {IEditDto} from "../interfaces/material.interface";
import {IsMongoId, IsOptional, Max, MaxLength, Min, MinLength} from "class-validator";

export class EditDto implements IEditDto {
    @IsMongoId({ message: '_id|Поле _id не предоставлено' })
    _id: string;

    @IsOptional()
    @MinLength(2, { message: 'name|Минимальная длина названия материала 2 символа' })
    @MaxLength(50, { message: 'name|Максимальная длина названия материала 50 символа' })
    name?: string;

    @IsOptional()
    @MinLength(10, { message: 'description|Минимальная длина описания материала 10 символа' })
    @MaxLength(300, { message: 'description|Максимальная длина описания материала 300 символа' })
    description?: string;

    @IsOptional()
    @Min(10, { message: "price|Минимальная цена 10 руб" })
    @Max(100_000, { message: "price|Максимальная цена 100.000 руб" })
    price?: number;
}
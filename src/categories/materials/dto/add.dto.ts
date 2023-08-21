import {MaterialDto, MaterialWithoutId} from "../interfaces/material.interface";
import {Max, MaxLength, Min, MinLength} from "class-validator";

export class AddDto implements MaterialDto {
    @MinLength(2, { message: 'name|Минимальная длина названия материала 2 символа' })
    @MaxLength(50, { message: 'name|Максимальная длина названия материала 50 символа' })
    name : string;

    @MinLength(10, { message: 'description|Минимальная длина описания материала 10 символа' })
    @MaxLength(300, { message: 'description|Максимальная длина описания материала 300 символа' })
    description: string;

    @Min(10, { message: "price|Минимальная цена 10 руб" })
    @Max(100_000, { message: "price|Максимальная цена 100.000 руб" })
    price: number;

    categoryId: string;
}
import {CategoryWithoutId} from "../interfaces/category.interface";
import {MaxLength, MinLength} from "class-validator";

export class AddDto implements CategoryWithoutId {
    @MinLength(2, { message: 'name|Название категории должно состоять как минимум из 2 символов' })
    @MaxLength(100, { message: 'name|Название категории должно состоять менее чем из 100 символов' })
    name: string;
}
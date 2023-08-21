import {ICategory} from "../../interfaces/category.interface";
import {User} from "../../../users/interfaces/user.interface";

export interface IMaterial {
    _id: string;
    name: string;
    description: string;
    price: number;
    img: string;
    category: ICategory;
    datePublish: Date;
    user: User;
}

export type MaterialWithoutId = Omit<IMaterial, '_id'>

export type MaterialDto = Pick<IMaterial, 'name' | 'description' | 'price'> & { categoryId: string }
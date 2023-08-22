import { QuestionDto as IQuestionDto } from "../interfaces/question.interface";
import {IsPhoneNumber, MaxLength, MinLength} from "class-validator";

export class QuestionDto implements IQuestionDto {
    @MinLength(2, { message: 'name|Минимальный размер имени 2 символа' })
    @MaxLength(20, { message: 'name|Максимальный размер имени 20 символа' })
    name: string;

    @IsPhoneNumber('BY', { message: 'phone|Номер телефона не совпадает с форматом'})
    phone: string;

    @MinLength(10, { message: 'comment|Минимальный размер комментария 10 символов' })
    @MaxLength(300, { message: 'comment|Максимальный размер комментария 300 символов' })
    comment: string;
}
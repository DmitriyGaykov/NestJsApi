<<<<<<< HEAD
import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
=======
import {BadRequestException, Injectable} from '@nestjs/common';
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
import {IError} from "./interfaces/ierror.interface";
import {ValidationError} from "./interfaces/validationError.interface";

@Injectable()
export class ErrorsService {
    static generateError(error : BadRequestException) : BadRequestException {
        const messages = error.getResponse()['message'] as string[]

        const errors : IError[] = messages.map(m => {
            const [key, msg] = m.split('|')
            return {
                [key] : {
                    message: msg
                }
            } as IError
        })

        return new BadRequestException(Object.assign({}, ...errors))
    }

    static getNotAuthorizedError() {
        return new BadRequestException('User is not authorized')
    }

    static generateBadRequestFromValidError({ errors } : ValidationError) {
        const errs = Object.keys(errors).map(key => ({
            [key] : {
                message: errors[key].message as string
            }
        } as IError))

        return new BadRequestException(Object.assign({}, ...errs))
    }
<<<<<<< HEAD

    static generateNoContentException(msg : string = 'No content') {
        return new HttpException(msg, HttpStatus.NO_CONTENT)
    }
=======
>>>>>>> 0ccde8d9973eac2443d2f6ea5dc43d9937cb4e54
}

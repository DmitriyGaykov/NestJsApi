import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    static generateNoContentException(msg : string = 'No content') {
        return new HttpException(msg, HttpStatus.NO_CONTENT)
    }
}

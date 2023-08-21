export interface IQuestion {
    _id: string;
    name: string;
    phone: string;
    comment: string;
}

export type QuestionDto = Omit<IQuestion, '_id'>

export interface INullableQuestion {
    _id?: string;
    name?: string;
    phone?: string;
    comment?: string;
}
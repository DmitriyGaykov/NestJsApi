export interface ICategory {
    _id: string
    name: string
}

export type CategoryWithoutId = Omit<ICategory, '_id'>
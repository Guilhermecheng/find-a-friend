import { Dog, Prisma } from "@prisma/client";

export interface searchManyByAttributesParams {
    breed?: string;
    age?: number;
    size?: string;
    energy?: string;
    dependency?: string;
}

export interface DogsRepository {
    create(data: Prisma.DogCreateInput): Promise<Dog>
    findManyByCity(city: string): Promise<Dog[]>
    searchManyByAttributes(params: searchManyByAttributesParams): Promise<Dog[]>
}
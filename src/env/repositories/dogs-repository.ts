import { Dog, Prisma } from "@prisma/client";

export interface DogsRepository {
    create(data: Prisma.DogCreateInput): Promise<Dog>
    findManyByCity(city: string): Promise<Dog[]>
}
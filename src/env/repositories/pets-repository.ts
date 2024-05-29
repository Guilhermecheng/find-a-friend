import { Pet, Prisma } from "@prisma/client";

export interface searchManyByAttributesParams {
    animalType: string;
    breed?: string;
    age?: number;
    size?: string;
    energy?: string;
    dependency?: string;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyByCity(city: string, page: number): Promise<Pet[]>
}
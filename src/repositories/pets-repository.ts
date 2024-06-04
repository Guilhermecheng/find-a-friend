import { Pet, Prisma } from "@prisma/client";

export interface searchManyByAttributesParams {
    city: string;
    animalType?: string;
    breed?: string;
    age?: number;
    size?: string;
    energy?: string;
    dependency?: string;
    spaceSize?: string;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | null>
    searchManyByAttributes(data: searchManyByAttributesParams): Promise<Pet[] | null>
}
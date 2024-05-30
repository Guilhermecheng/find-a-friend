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
    listManyByCity(city: string, page: number): Promise<Pet[]>
    findById(id: string): Promise<Pet | null>
}
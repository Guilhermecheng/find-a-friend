import { Pet, Prisma } from "@prisma/client";

export interface searchManyByAttributesParams {
    city: string;
    animalType: string | null;
    breed: string | null;
    age: number | null;
    size: string | null;
    energy: string | null;
    dependency: string | null;
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | null>
    searchManyByAttributes(data: searchManyByAttributesParams): Promise<Pet[] | null>
}
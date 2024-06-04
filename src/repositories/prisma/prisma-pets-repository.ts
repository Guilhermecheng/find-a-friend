import { Prisma } from "@prisma/client";
import { PetsRepository, searchManyByAttributesParams } from "../pets-repository";
import { prisma } from "@/lib/prisma";


export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            }
        })

        return pet
    }

    async searchManyByAttributes(data: searchManyByAttributesParams) {
        const pets = await prisma.pet.findMany({
            where: {
                city: data.city,
                breed: {
                    contains: data.breed ?? "",
                },
                size: {
                    contains: data.size ?? "",
                },
                energy: {
                    contains: data.energy ?? "",
                },
                dependency: {
                    contains: data.dependency ?? "",
                },
                animal_type: {
                    contains: data.animalType ?? "",
                },
                space_size: {
                    contains: data.spaceSize ?? "",
                },
            }
        })

        return pets
    }
}

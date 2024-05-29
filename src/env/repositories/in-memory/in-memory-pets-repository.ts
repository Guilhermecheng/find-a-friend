import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";


export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            registered_at: new Date(),
            name: data.name,
            animal_type: data.animal_type,
            breed: data.breed,
            age: data.age,
            about: data.about,
            size: data.size,
            energy: data.energy,
            dependency: data.dependency,
            space_size: data.space_size,
            city: data.city,
            state: data.state,
            organization_id: data.organization_id
        }

        this.items.push(pet);
        return pet
    }

    async findManyByCity(city: string, page: number) {
        return this.items.filter(item => item.city === city).slice((page - 1) * 20, page * 20)
    }
}
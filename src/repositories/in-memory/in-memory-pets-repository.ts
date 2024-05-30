import { Pet, Prisma } from "@prisma/client";
import { PetsRepository, searchManyByAttributesParams } from "../pets-repository";
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
    
    async findById(id: string) {
        const pet = this.items.find(item => item.id === id)
        
        if(!pet) return null;
        
        return pet
    }

    async searchManyByAttributes(data: searchManyByAttributesParams) {
        const pets = this.items.filter(item => {
            for (let key in data) {
                if(data[key as keyof typeof data]) {
                    if (item[key as keyof typeof item] != data[key as keyof typeof data]) {
                        return false;
                    }
                }
                return true;
            }
        })

        if(!pets) return null;

        return pets
    }
}
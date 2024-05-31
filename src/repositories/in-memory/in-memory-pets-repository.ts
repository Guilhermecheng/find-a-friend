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
        
        // var filterKeys = Object.keys(data)
        var filterKeys = Object.keys(data).map(key => {
            if(key === 'animalType') {
                return 'animal_type'
            }

            if(key === 'spaceSize') {
                return 'space_size'
            }
            
            return key
        });
        console.log(filterKeys)

        return this.items.filter(function (eachObj) {
            return filterKeys.every(function (eachKey) {
                
                if (!data[eachKey as keyof typeof data]) {
                    return true; 
                }
                
                if(typeof data[eachKey as keyof typeof data] === 'number') {
                    return data[eachKey as keyof typeof data] === eachObj[eachKey as keyof typeof eachObj]
                }

                //@ts-ignore
                return data[eachKey as keyof typeof data].includes(eachObj[eachKey as keyof typeof eachObj]) || data[eachKey as keyof typeof data] === eachObj[eachKey as keyof typeof eachObj];
           });
       });
    }
}
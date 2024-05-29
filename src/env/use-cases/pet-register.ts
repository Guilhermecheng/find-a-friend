import { Pet } from "@prisma/client"
import { PetsRepository } from "../repositories/pets-repository"
import { OrgsRepository } from "../repositories/orgs-repository";

interface PetRegisterUseCaseRequest {
    name: string;
    animalType: string;
    breed: string;
    age: number;
    size: string;
    energy: string;
    dependency: string;
    space_size: string;
    city: string;
    state: string;
    organizationId: string;
    about?: string;
}

interface PetRegisterUseCaseResponse {
    pet: Pet
}

export class PetRegisterUseCase {
    constructor(
        private petsRepository: PetsRepository,
        private orgsRepository: OrgsRepository
    ) {}

    async execute({
        name,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        space_size,
        city,
        state,
        organizationId,
        about,
    }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
        const organization = await this.orgsRepository.findById(organizationId)

        if(!organization) {
            throw new Error()
        }

        const pet = await this.petsRepository.create({
            name,
            animal_type: animalType,
            breed,
            age,
            size,
            energy,
            dependency,
            space_size,
            city,
            state,
            organization_id: organizationId,
            about: about ? about : "",
        })

        
        return {
            pet
        }
    }
}
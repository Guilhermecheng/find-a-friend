import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./errors/pet-not-found-error";
import { InvalidSearchError } from "./errors/invalid-search-error";

interface SearchPetsUseCaseRequest {
    city: string;
    animalType?: string;
    breed?: string;
    age?: number;
    size?: string;
    energy?: string;
    dependency?: string;
    spaceSize?: string;
}

interface SearchPetsUseCaseResponse {
    pets: Pet[]
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        city,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        spaceSize,
    }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
        if(!city || city === "") {
            throw new InvalidSearchError()
        }

        const pets = await this.petsRepository.searchManyByAttributes({
            city,
            animalType,
            breed,
            age,
            size,
            energy,
            dependency,
            spaceSize
        })

        if(!pets) {
            throw new PetNotFoundError()
        }

        return {
            pets,
        }
    }
}
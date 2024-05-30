import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { PetNotFoundError } from "./errors/pet-not-found-error";
import { InvalidSearchError } from "./errors/invalid-search-error";

interface SearchPetsUseCaseRequest {
    city: string;
    animalType?: string | null;
    breed?: string | null;
    age?: number | null;
    size?: string | null;
    energy?: string | null;
    dependency?: string | null;
}

interface SearchPetsUseCaseResponse {
    pets: Pet[]
}

export class SearchPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        city,
        animalType = null,
        breed = null,
        age = null,
        size = null,
        energy = null,
        dependency = null,
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
        })

        if(!pets) {
            throw new PetNotFoundError()
        }

        return {
            pets,
        }
    }
}
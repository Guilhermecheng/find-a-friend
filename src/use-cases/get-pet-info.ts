import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/pets-repository";
import { PetNotFoundError } from "./errors/pet-not-found-error";

interface GetPetInfoUseCaseRequest {
    petId: string;
}

interface GetPetInfoUseCaseResponse {
    pet: Pet
}

export class GetPetInfoUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute({
        petId
    }: GetPetInfoUseCaseRequest): Promise<GetPetInfoUseCaseResponse> {
        const pet = await this.petsRepository.findById(petId)

        if(!pet) {
            throw new PetNotFoundError()
        }

        return {
            pet
        }
    }
}
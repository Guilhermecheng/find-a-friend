import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetPetInfoUseCase } from "../get-pet-info"

export function makeSearchPetsUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const useCase = new GetPetInfoUseCase(petsRepository)

    return useCase
}
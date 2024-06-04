import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { PetRegisterUseCase } from "../pet-register"
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"

export function makePetRegisterUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const orgsRepository = new PrismaOrgsRepository()

    const useCase = new PetRegisterUseCase(petsRepository, orgsRepository)

    return useCase
}
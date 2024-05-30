

import { describe, expect, test, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetInfoUseCase } from './get-pet-info'
import { PetNotFoundError } from './errors/pet-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetInfoUseCase

describe('Get Pet Info Use Case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        sut = new GetPetInfoUseCase(petsRepository)
    })

    it('should be able to get pet details by id', async () => {
        const createdPet = await petsRepository.create({
            name: "Binho",
            animal_type: "dog",
            breed: "linguiça",
            age: 3,
            about: "Beautiful linguiça dog",
            size: "small",
            energy: "low",
            dependency: "low",
            space_size: "medium",
            city: "São Paulo",
            state: "SP",
            organization_id: "org-id",
        })

        const { pet } = await sut.execute({
            petId: createdPet.id
        })

        expect(pet.id).toEqual(expect.any(String))
        expect(pet.name).toEqual("Binho")
    })

    it('should not be able to get pet info from a wrong id', async () => { 
        await expect(async () => {
            await sut.execute({
                petId: 'non-existing-id'
            })
        }).rejects.toBeInstanceOf(PetNotFoundError)
    })
})
import { describe, expect, test, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { PetRegisterUseCase } from './pet-register'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: PetRegisterUseCase

describe('Pet Register Use Case', () => {
    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository();
        orgsRepository = new InMemoryOrgsRepository();
        sut = new PetRegisterUseCase(petsRepository, orgsRepository)

        await orgsRepository.create({
            responsible_name: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email: "doguinhos@gmail.com",
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password_hash: await hash("123456", 6)
        })
    })

    it('should be able to register a pet', async () => {
        const orgId = orgsRepository.items[0].id

       const { pet } = await sut.execute({
            name: "Binho",
            animalType: "dog",
            breed: "linguiça",
            age: 3,
            about: "Beautiful linguiça dog",
            size: "small",
            energy: "low",
            dependency: "low",
            space_size: "medium",
            city: "São Paulo",
            state: "SP",
            organizationId: orgId,
       })

        expect(pet.id).toEqual(expect.any(String))
    })

    it('shoud not be able to register a pet to a non-existent organization', async () => {
        await expect(async () => {
            await sut.execute({
                name: "Binho",
                animalType: "dog",
                breed: "linguiça",
                age: 3,
                about: "Beautiful linguiça dog",
                size: "small",
                energy: "low",
                dependency: "low",
                space_size: "medium",
                city: "São Paulo",
                state: "SP",
                organizationId: "non-existent-org-id",
            })
        }).rejects.toBeInstanceOf(OrganizationNotFoundError)
    })
})
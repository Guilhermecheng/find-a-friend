import { describe, expect, test, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { PetRegisterUseCase } from './pet-register'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: PetRegisterUseCase

describe('Pet Register Use Case', () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository();
        orgsRepository = new InMemoryOrgsRepository();
        sut = new PetRegisterUseCase(petsRepository, orgsRepository)
    })

    it('should be able to register a pet', async () => {
       
    })
})




import { describe, expect, test, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InvalidSearchError } from './errors/invalid-search-error'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
    beforeEach(async () => {
        petsRepository = new InMemoryPetsRepository();
        sut = new SearchPetsUseCase(petsRepository)

        for(var i = 0; i < 30; i++) {
            await petsRepository.create({
                name: `Animalzinho ${i}`,
                animal_type: "dog",
                breed: "linguiça",
                age: 3,
                about: "Beautiful linguiça dog",
                size: "small",
                energy: "low",
                dependency: "low",
                space_size: "medium",
                city: i % 2 ? "São Paulo" : "Belo Horizonte",
                state: i % 2 ? "SP" : "MG",
                organization_id: `animal-id-${i}`,
            })
        }
    })

    it('should be able to find all pets in a specific city', async () => {
        const { pets } = await sut.execute({
            city: 'São Paulo',
        })

        expect(pets.length).toEqual(15)
    })

    it('should not be able to search without providing a city', async () => { 
        await expect(async () => {
            await sut.execute({
                city: '',
            })
        }).rejects.toBeInstanceOf(InvalidSearchError)
    })
})
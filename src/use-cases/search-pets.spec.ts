



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

        for(var y = 0; y < 4; y++) {
            await petsRepository.create({
                name: `Animalzinho ${y + 30}`,
                animal_type: "cat",
                breed: "siamese",
                age: 5,
                about: "Beatiful siamese cat",
                size:  y % 2 ? "medium" : "large",
                energy: y === 3 ? "high" : "low",
                dependency: "medium",
                space_size: "large",
                city: "Florianópolis",
                state: "SC",
                organization_id: `animal-id-${y + 30}`,
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

    it('should be able to search pets by animal type', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            animalType: 'cat'
        })

        expect(pets.length).toEqual(4)
        expect(pets[0].animal_type).toEqual('cat')
    })

    it('should be able to search pets by breed', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            animalType: 'cat',
            breed: 'siamese',
        })

        expect(pets.length).toEqual(4)
        expect(pets[0].breed).toEqual('siamese')
    })

    it('should be able to search pets by age', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            age: 5,
        })

        expect(pets.length).toEqual(4)
    })

    it('should be able to search pets by size', async () => {
        const smallPets = await sut.execute({
            city: 'São Paulo',
            size: 'small'
        })

        const mediumPets = await sut.execute({
            city: 'Florianópolis',
            size: 'medium'
        })

        expect(smallPets.pets.length).toEqual(15)
        expect(mediumPets.pets.length).toEqual(2)
    })

    it('should be able to search pets by energy', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            energy: "high",
        })

        expect(pets.length).toEqual(1)
    })

    it('should be able to search pets by dependency', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            dependency: "medium",
        })

        expect(pets.length).toEqual(4)
    })

    it('should be able to search pets by space size', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            spaceSize: 'medium',
        })

        expect(pets.length).toEqual(4)
    })

    it('should be able to search pets by multiple attributes', async () => {
        const { pets } = await sut.execute({
            city: 'Florianópolis',
            animalType: 'cat',
            size: "medium",
            energy: "high",
        })

        console.log(pets)

        expect(pets.length).toEqual(1)
    })
})
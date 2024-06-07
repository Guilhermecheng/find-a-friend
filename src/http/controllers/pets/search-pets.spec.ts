import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-org'

describe('Search pets (e2e)', () => {
    beforeAll(async () => {
        await app.ready()

        const { organization_id } = await createAndAuthenticateOrganization(app)

        let animals = []
        const quantity = 30

        for(var i = 0; i < quantity; i++) {
            animals.push({
                name: `Animalzinho ${i}`,
                animal_type:  i % 3 ? "Dog" : "Cat",
                breed:  i % 3 ? "Chow chow" : "Siamese",
                age: 3,
                about: `Beautiful ${i % 3 ? "Chow chow dog" : "Siamese Cat"}`,
                size: "small",
                energy: "low",
                dependency: "low",
                space_size: "medium",
                city: i % 2 ? "São Paulo" : "Belo Horizonte",
                state: i % 2 ? "SP" : "MG",
                organization_id: organization_id,
            })
        }

        await prisma.pet.createMany({
            data: animals
        })
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get all pets from a city', async () => {
        
        const response = await request(app.server)
            .get(`/pets`)
            .query({
                city: 'São Paulo'
            })

        const { pets } = response.body

        expect(response.status).toBe(200)
        expect(pets.length).toEqual(15)
        expect(pets).toEqual(
            expect.arrayContaining([     
                expect.objectContaining({
                    id: expect.any(String),
                    city: 'São Paulo'
                })
            ])
        )
    })
})
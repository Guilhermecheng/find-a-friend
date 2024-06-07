import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a pet', async () => {
        const { token, organization_id } = await createAndAuthenticateOrganization(app)

        const response = await request(app.server)
            .post('/pet/register')
            .set('Authorization', `Bearer ${token}`)
            .send({
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
                organizationId: organization_id,
            })

            expect(response.statusCode).toEqual(201)
            expect(response.body).toEqual({
                pet: expect.objectContaining({
                    name: expect.any(String),
                    id: expect.any(String),
                })
            })

    })

    it('should not be able to register a pet when unauthenticated', async () => {
        const response = await request(app.server)
            .post('/pet/register')
            .send({
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
                organizationId: "123",
            })

        expect(response.statusCode).toBe(401)
    })
})
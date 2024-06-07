import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-org'
import { createPetAndReturnId } from '@/utils/test/create-pet-and-return-id'

describe('Get Pet Info (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get pet info with its id', async () => {
        const { token, organization_id } = await createAndAuthenticateOrganization(app)
        const { id } = await createPetAndReturnId(token, organization_id)

        const response = await request(app.server)
            .get(`/pet/${id}`)
            .send()
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            pet: expect.objectContaining({
                name: expect.any(String),
                animal_type: expect.any(String),
                breed: expect.any(String),
                size: expect.any(String),
                energy: expect.any(String),
                dependency: expect.any(String),
                space_size: expect.any(String),
                city: expect.any(String),
                state: expect.any(String),
                organization_id: expect.any(String),
            })
        })
    })
})
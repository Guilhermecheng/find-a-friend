import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'

describe('Authenticate Organization (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate an organization', async () => {
        await request(app.server)
            .post('/organization')
            .send({
                responsibleName: "Responsável 1",
                title: "Organização Teste",
                email: "org_teste@teste.com",
                cep: "05040000",
                city: "São Paulo",
                state: "SP",
                address: "Rua Américo Paulino 123",
                whatsapp: "(11) 9 1234 1234",
                password: "123456"
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: "org_teste@teste.com",
                password: "123456"
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String),
            organization_id: expect.any(String),
        })
    })

        it('should not be albe to authenticate a non-existent email', async () => {
            const response = await request(app.server)
            .post('/sessions')
            .send({
                email: "email_teste_123@teste.com",
                password: "123456"
            })

            expect(response.statusCode).toEqual(400)
            expect(response.body).toEqual({
                message: expect.any(String),
            })
        })

})
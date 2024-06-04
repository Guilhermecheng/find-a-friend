import request from 'supertest'
import { app } from '@/app'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'

describe('Register Organization (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register an organization', async () => {
        const response = await request(app.server)
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

        expect(response.statusCode).toEqual(201)
        expect(response.body.message).toEqual("Organização cadastrada com sucesso!")
    })

    it('should not be able to register an organization with an existent email address', async () => {
        await request(app.server)
            .post('/organization')
            .send({
                responsibleName: "Responsável 2",
                title: "Organização Teste 2",
                email: "org_teste2@teste.com",
                cep: "05040000",
                city: "São Paulo",
                state: "SP",
                address: "Rua Américo Paulino 123",
                whatsapp: "(11) 9 1234 1234",
                password: "123456"
            })

        
            const response = await request(app.server)
                .post('/organization')
                .send({
                    responsibleName: "Responsável 3",
                    title: "Organização Teste 3",
                    email: "org_teste2@teste.com",
                    cep: "05040000",
                    city: "Florianópolis",
                    state: "SC",
                    address: "Rua Américo Paulino 123",
                    whatsapp: "(11) 9 1234 1234",
                    password: "123456"
                })

        expect(response.statusCode).toEqual(409)
    })
})
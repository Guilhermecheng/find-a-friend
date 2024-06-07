import { FastifyInstance } from "fastify";
import request from "supertest"

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
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

    const { token, organization_id } = response.body
    return {
        token,
        organization_id,
    }
}
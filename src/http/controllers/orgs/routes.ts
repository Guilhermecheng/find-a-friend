import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";

export async function orgsRoutes(app: FastifyInstance) {
    app.post('/organization', register)
    app.post('/sessions', authenticate)
}
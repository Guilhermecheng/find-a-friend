import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getPetInfo } from "./pet-info";
import { searchPets } from "./search-pets";

export async function petsRoutes(app: FastifyInstance) {

    app.get('/pet/:id', getPetInfo)
    app.get('/pets', searchPets)
    app.post('/pet/register', { onRequest: [verifyJWT] }, register)
}
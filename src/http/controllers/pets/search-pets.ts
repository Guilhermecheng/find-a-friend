import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
    const searchPetsBodySchema = z.object({
        city: z.string(),
        animalType: z.string().nullable(),
        breed: z.string().nullable(),
        age: z.number(),
        size: z.string().nullable(),
        energy: z.string().nullable(),
        dependency: z.string().nullable(),
        spaceSize: z.string().nullable(),
    })

    const {
        city,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        spaceSize,
    } = searchPetsBodySchema.parse(request.body);
    
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
        city,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        spaceSize,
    })

    return reply.status(200).send({
        pets
    })
}
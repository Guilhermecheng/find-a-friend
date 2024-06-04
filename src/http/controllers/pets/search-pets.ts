import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
    const searchPetsBodySchema = z.object({
        city: z.string(),
        animalType: z.string().optional(),
        breed: z.string().optional(),
        age: z.number().optional(),
        size: z.string().optional(),
        energy: z.string().optional(),
        dependency: z.string().optional(),
        spaceSize: z.string().optional(),
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
    } = searchPetsBodySchema.parse(request.query);

    try {
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
    } catch(err) {
        console.log(err)
        return reply.status(500).send({ message: 'Internal server error' })
    }
    
}
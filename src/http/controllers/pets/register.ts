import { makePetRegisterUseCase } from "@/use-cases/factories/make-pet-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgBodySchema = z.object({
        name: z.string(),
        animalType: z.string(),
        breed: z.string(),
        age: z.number(),
        size: z.string(),
        energy: z.string(),
        dependency: z.string(),
        space_size: z.string(),
        city: z.string(),
        state: z.string(),
        organizationId: z.string(),
        about: z.string().nullable(),
    })

    const {
        name,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        space_size,
        city,
        state,
        organizationId,
        about,
    } = registerOrgBodySchema.parse(request.body)

    const createOrgUseCase = makePetRegisterUseCase()

    const { pet } = await createOrgUseCase.execute({
        name,
        animalType,
        breed,
        age,
        size,
        energy,
        dependency,
        space_size,
        city,
        state,
        organizationId,
        about: about ?? "",
    })

    return reply.status(201).send({ pet })
}
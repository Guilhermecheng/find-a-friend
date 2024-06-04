import { makeGetPetInfoUseCase } from "@/use-cases/factories/make-get-pet-info-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetInfo(request: FastifyRequest, reply: FastifyReply) {
    const getPetInfoParams = z.object({
        id: z.string().uuid(),
    })

    const { id } = getPetInfoParams.parse(request.params)

    const getPetInfoUseCase = makeGetPetInfoUseCase()

    const { pet } = await getPetInfoUseCase.execute({
        petId: id
    })

    return reply.status(200).send({
        pet
    })
}

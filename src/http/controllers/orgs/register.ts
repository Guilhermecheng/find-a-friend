import { AccountAlreadyExistsError } from "@/use-cases/errors/account-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerOrgBodySchema = z.object({
        responsibleName: z.string(),
        title: z.string(),
        email: z.string().email(),
        cep: z.string(),
        city: z.string(),
        state: z.string(),
        address: z.string(),
        whatsapp: z.string(),
        password: z.string(),
    })

    const {
        responsibleName,
        title,
        email,
        cep,
        city,
        state,
        address,
        whatsapp,
        password 
    } = registerOrgBodySchema.parse(request.body)

    try {
        const createOrgUseCase = makeRegisterUseCase()
    
        await createOrgUseCase.execute({
            responsibleName,
            title,
            email,
            cep,
            city,
            state,
            address,
            whatsapp,
            password
        })
        
    } catch(err) {
        if(err instanceof AccountAlreadyExistsError) {
            return reply.status(409).send({
                message: err.message,
            })
        }
        
        throw err
    }
    
    return reply.status(201).send({
        message: "Organização cadastrada com sucesso!"
    })
}
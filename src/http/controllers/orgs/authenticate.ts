import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const authUseCase = makeAuthenticateUseCase()

        const { organization } = await authUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {}, 
            {
            sign: {
                sub: organization.id
            }
        })

        const refreshToken = await reply.jwtSign(
            {}, 
            {
            sign: {
                sub: organization.id,
                expiresIn: '3d'
            }
        })

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true, // HTTPS
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                token,
                organization_id: organization.id,
            })

    } catch(err) {
        if(err instanceof InvalidCredentialsError) {
            return reply.status(400).send({
                message: err.message,
            })
        }

        throw err
    }
}

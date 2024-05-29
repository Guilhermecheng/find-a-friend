import { Organization } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    organization: Organization
}


export class AuthenticateUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const organization = await this.orgsRepository.findByEmail(email)

        if(!organization) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, organization.password_hash)
        
        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            organization
        }
    }
}
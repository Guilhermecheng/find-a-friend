import { Organization } from "@prisma/client";
import { hash } from "bcryptjs"
import { OrgsRepository } from "../repositories/orgs-repository";
import { AccountAlreadyExistsError } from "./errors/account-already-exists-error";

interface RegisterUseCaseRequest {
    responsibleName: string;
    title: string;
    email: string;
    cep: string;
    city: string;
    state: string;
    address: string;
    whatsapp: string;
    password: string;
}

interface RegisterUseCaseResponse {
    organization: Organization
}

export class RegisterUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({
        responsibleName,
        title,
        email,
        cep,
        city,
        state,
        address,
        whatsapp,
        password
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const accountWithSameEmail = await this.orgsRepository.findByEmail(email)

        if(accountWithSameEmail) {
            throw new AccountAlreadyExistsError()
        }

        const organization = await this.orgsRepository.create({
            responsible_name: responsibleName,
            email,
            title,
            city,
            state,
            cep,
            address,
            whatsapp,
            password_hash
        })

        return {
            organization
        }

    }
}
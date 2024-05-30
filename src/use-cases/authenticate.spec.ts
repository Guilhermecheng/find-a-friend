import { describe, expect, test, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new AuthenticateUseCase(orgsRepository)
    })

    it('should be able to authenticate an organization', async () => {
        await orgsRepository.create({
            responsible_name: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email: "doguinhos@gmail.com",
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password_hash: await hash("123456", 6)
        })

        const { organization } = await sut.execute({
            email: "doguinhos@gmail.com",
            password: "123456"
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(async () => {
            await sut.execute({
                email: 'johndoe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await orgsRepository.create({
            responsible_name: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email: "doguinhos@gmail.com",
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password_hash: await hash("123456", 6)
        })

        await expect(() => 
            sut.execute({
                email: "doguinhos@gmail.com",
                password: "123"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
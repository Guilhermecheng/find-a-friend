import { describe, expect, test, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository();
        sut = new RegisterUseCase(orgsRepository)
    })

    it('should be able to register an organization', async () => {
        const { organization } = await sut.execute({
            responsibleName: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email: "doguinhos@gmail.com",
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password: "123456"
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { organization } = await sut.execute({
            responsibleName: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email: "doguinhos@gmail.com",
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare('123456', organization.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const email = "doguinhos@gmail.com"

        await sut.execute({
            responsibleName: "Ronaldo",
            title: "Organização nacional dos doguinhos",
            email,
            cep: "050400-0",
            city: "São Paulo",
            state: "SP",
            address: "Rua virando à esquina 123",
            whatsapp: "(11) 91234-1234",
            password: "123456"
        })

        await expect(() => 
             sut.execute({
                responsibleName: "Ronaldo",
                title: "Organização nacional dos doguinhos",
                email,
                cep: "050400-0",
                city: "São Paulo",
                state: "SP",
                address: "Rua virando à esquina 123",
                whatsapp: "(11) 91234-1234",
                password: "123456"
            })
        ).rejects.toBeInstanceOf(AccountAlreadyExistsError)
    })
})
import { Organization, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Organization[] = []

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = {
            id: randomUUID(),
            responsible_name: data.responsible_name,
            title: data.title,
            email: data.email,
            cep: data.cep,
            address: data.address,
            city: data.city,
            state: data.state,
            whatsapp: data.whatsapp,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(organization);

        return organization
    }

    async findById(id: string) {
        const organization = this.items.find(organization => organization.id === id);
        
        if(!organization) return null;

        return organization
    }

    async findByEmail(email: string) {
        const organization = this.items.find(organization => organization.email === email);
        
        if(!organization) return null;

        return organization
    }

}
import { Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {

    async create(data: Prisma.OrganizationCreateInput) {
        const organization = await prisma.organization.create({
            data,
        })

        return organization
    }

    async findById(id: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                id,
            }
        })

        return organization
    }

    async findByEmail(email: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                email,
            }
        })

        return organization
    }
}

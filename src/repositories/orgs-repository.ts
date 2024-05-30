import { Organization, Prisma } from "@prisma/client"

export interface OrgsRepository {
    findById(id: String): Promise<Organization | null>
    findByEmail(email: String): Promise<Organization | null>
    create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
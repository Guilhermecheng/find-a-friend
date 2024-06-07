import { app } from "@/app"
import request from "supertest"

export async function createPetAndReturnId(token: string, orgId: string) {
    const response = await request(app.server)
        .post('/pet/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Binho",
            animalType: "dog",
            breed: "linguiça",
            age: 3,
            about: "Beautiful linguiça dog",
            size: "small",
            energy: "low",
            dependency: "low",
            space_size: "medium",
            city: "São Paulo",
            state: "SP",
            organizationId: orgId,
        })
        
        const { id } = response.body.pet;

    return {
        id,
    }
}
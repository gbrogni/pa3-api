import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/hotel/enterprise/entities/user';
import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaUserMapper {

    static toDomain(raw: PrismaUser): User {
        return User.create(
            {
                name: raw.name ?? '',
                email: raw.email,
                phone: raw.phone,
                password: raw.password
            }, new UniqueEntityID(raw.id)
        );
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password
        };
    }

}
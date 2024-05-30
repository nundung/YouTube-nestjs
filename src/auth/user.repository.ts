import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { PrismaClient } from '@prisma/client';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

const prisma = new PrismaClient();

// @Injectable()
// export class UserRepository extends Repository<User> {
//     constructor(private dataSource: DataSource) {
//         super(User, dataSource.createEntityManager());
//     }
//     async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
//         const { name, pw } = authCredentialDto;

//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(pw, salt);
//         const user = this.create({ name, pw: hashedPassword });

//         try {
//             await this.save(user);
//         } catch (error) {
//             if (error.code === '23505') {
//                 throw new ConflictException('Existing username');
//             } else {
//                 throw new InternalServerErrorException();
//             }
//         }
//         await this.save(user);
//         return;
//     }
// }

@Injectable()
export class UserRepository {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { name, pw } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pw, salt);

        try {
            await prisma.user.create({
                data: {
                    name,
                    pw: hashedPassword,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}

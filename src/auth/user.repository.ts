import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credential.dto';

import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { name, pw } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pw, salt);
        const user = this.create({ name, pw: hashedPassword });

        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
        await this.save(user);
        return;
    }
}

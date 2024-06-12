import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
    async compare(s: string, hash: string): Promise<boolean> {
        return bcrypt.compare(s, hash);
    }
}

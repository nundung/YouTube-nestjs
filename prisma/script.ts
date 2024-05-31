import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';

const prisma = new PrismaClient();

async function main() {
    // 데이터베이스 초기화 작업
    const user = await prisma.user.create({
        data: {
            name: 'nundung',
            pw: '1234',
        },
    });
    console.log(user);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

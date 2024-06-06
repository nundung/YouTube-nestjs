import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { UserEntity } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authcredentialsDto: AuthCredentialDto,
    ): Promise<void> {
        return this.authService.signUp(authcredentialsDto);
    }

    @Post('signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Get('/info')
    @UseGuards(AuthGuard())
    getMyInfo(@GetUser() user: UserEntity) {
        return user;
    }

    @Put('/info')
    @UseGuards(AuthGuard())
    updateMyInfo(@GetUser() user: UserEntity) {
        return user;
    }
}

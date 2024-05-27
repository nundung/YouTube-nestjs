import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthCredentialsDto } from './auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto,
    ): Promise<void> {
        return this.authService.signUp(authcredentialsDto);
    }

    @Post('signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}

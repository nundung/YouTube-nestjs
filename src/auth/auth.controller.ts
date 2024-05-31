import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { SubscriptionDto } from './dto/subscription.dto';

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
    getMyInfo(@GetUser() user: User) {
        return user;
    }

    @Put('/info')
    @UseGuards(AuthGuard())
    updateMyInfo(@GetUser() user: User) {
        return user;
    }

    @Post('/subscribe')
    @UseGuards(AuthGuard())
    async subscribe(
        @GetUser() user: User,
        @Body(ValidationPipe) subscribeDto: SubscriptionDto,
    ) {
        return await this.authService.subscribe(user, subscribeDto);
    }

    @Delete('/subscribe')
    @UseGuards(AuthGuard())
    async subscribe(
        @GetUser() user: User,
        @Body(ValidationPipe) subscribeDto: SubscriptionDto,
    ) {
        return await this.authService.subscribe(user, subscribeDto);
    }
}

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
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EditUserDto } from './dto/edit-user.dto';

@Controller('auth')
@ApiTags('사용자 API')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({
        summary: '회원가입 API',
        description: '사용자 생성',
    })
    @ApiCreatedResponse({ description: '사용자 생성 완료' })
    @ApiConflictResponse({ description: '중복된 항목이 존재' })
    signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    @ApiOperation({
        summary: '로그인 API',
        description: '로그인',
    })
    @ApiOkResponse({ description: '로그인 성공' })
    @ApiUnauthorizedResponse({
        description: '로그인 실패',
    })
    signIn(
        @Body(ValidationPipe) createUsersDto: CreateUserDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(createUsersDto);
    }

    @Get('/info')
    @ApiOperation({
        summary: '내 정보 보기 API',
        description: '내 정보 불러오기',
    })
    @ApiOkResponse({ description: '내 정보 불러오기 성공' })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @UseGuards(AuthGuard())
    getMyInfo(@GetUser() user: UserEntity): UserEntity {
        return user;
    }

    @Put('/info')
    @ApiOperation({
        summary: '내 정보 수정 API',
        description: '내 정보 수정',
    })
    @ApiOkResponse({ description: '내 정보 수정 성공' })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @UseGuards(AuthGuard())
    updateMyInfo(
        @Body(ValidationPipe) editUserDto: EditUserDto,
        @GetUser() user: UserEntity,
    ): UserEntity {
        return user;
    }
}

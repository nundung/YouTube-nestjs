import {
    Body,
    Controller,
    Delete,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionDto } from 'src/channel/dto/subscription.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserEntity } from 'src/auth/user.entity';
import { ChannelService } from './channel.service';
import { UnSubscriptionDto } from './dto/unSubscription.dto';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('channel')
@ApiTags('채널 API')
export class ChannelController {
    constructor(private ChannelService: ChannelService) {}

    @Post('/subscribe')
    @ApiOperation({
        summary: '구독하기 API',
        description: '구독하기',
    })
    @ApiOkResponse({ description: '구독 완료' })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @UseGuards(AuthGuard())
    async Channel(
        @GetUser() user: UserEntity,
        @Body(ValidationPipe) subscriptionDto: SubscriptionDto,
    ) {
        return await this.ChannelService.subscribe(user.id, subscriptionDto);
    }

    @Delete('/subscribe')
    @ApiOperation({
        summary: '구독취소 API',
        description: '구독취소',
    })
    @ApiOkResponse({ description: '구독취소 완료' })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
    })
    @UseGuards(AuthGuard())
    async unChannel(
        @GetUser() user: UserEntity,
        @Body(ValidationPipe) unSubscriptionDto: UnSubscriptionDto,
    ) {
        return await this.ChannelService.unSubscribe(
            user.id,
            unSubscriptionDto,
        );
    }
}

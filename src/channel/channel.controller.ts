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

@Controller('channel')
export class ChannelController {
    constructor(private ChannelService: ChannelService) {}

    @Post()
    @UseGuards(AuthGuard())
    async Channel(
        @GetUser() user: UserEntity,
        @Body(ValidationPipe) subscriptionDto: SubscriptionDto,
    ) {
        return await this.ChannelService.subscribe(user.id, subscriptionDto);
    }

    @Delete()
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

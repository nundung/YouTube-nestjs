import {
    Body,
    Controller,
    Delete,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionDto } from 'src/subscribe/dto/subscription.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { subscribeService } from './subscribe.service';
import { UnSubscriptionDto } from './dto/unSubscription.dto';

@Controller('subscribe')
export class SubscribeController {
    constructor(private subscribeService: subscribeService) {}

    @Post('/subscribe')
    @UseGuards(AuthGuard())
    async subscribe(
        @GetUser() user: User,
        @Body(ValidationPipe) subscriptionDto: SubscriptionDto,
    ) {
        return await this.subscribeService.subscribe(user.id, subscriptionDto);
    }

    @Delete('/subscribe')
    @UseGuards(AuthGuard())
    async unSubscribe(
        @GetUser() user: User,
        @Body(ValidationPipe) unSubscriptionDto: UnSubscriptionDto,
    ) {
        return await this.subscribeService.unSubscribe(
            user.id,
            unSubscriptionDto,
        );
    }
}

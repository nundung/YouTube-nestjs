import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
    @IsNotEmpty()
    @ApiProperty({
        example: 'testTitle',
    })
    title: string;

    @ApiProperty({
        example: 'testDescription',
    })
    description: string;
}

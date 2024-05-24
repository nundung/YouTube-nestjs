import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
    @IsNotEmpty()
    file: string;

    @IsNotEmpty()
    title: string;

    description: string;
}

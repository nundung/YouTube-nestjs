import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
    @IsNotEmpty()
    file_path: string;

    @IsNotEmpty()
    title: string;

    description: string;
}

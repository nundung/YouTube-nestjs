import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class EditUserDto {
    @IsString()
    @Length(4, 20)
    @ApiProperty({
        example: 'testId',
        description: '4-20자',
    })
    name: string;

    @IsString()
    @Length(4, 20)
    @ApiProperty({
        example: 'testPw',
        description: '영어와 숫자로 4-20자',
    })
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number',
    })
    pw: string;
}

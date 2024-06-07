import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    name: string;

    @IsString()
    @Length(4, 20)
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number',
    })
    pw: string;
}

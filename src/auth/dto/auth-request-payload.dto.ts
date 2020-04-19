import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequestPayloadDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    public username: string;
    @IsNotEmpty()
    @ApiProperty()
    public password: string;
}

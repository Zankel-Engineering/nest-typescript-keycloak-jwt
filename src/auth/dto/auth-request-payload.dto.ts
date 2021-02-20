import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequestPayloadDto {
    @ApiProperty({example: 'test@test.de', required: true})
    @IsNotEmpty()
    @IsEmail()
    public username!: string;
    @IsNotEmpty()
    @ApiProperty({example: 'test123', required: true})
    public password!: string;
}

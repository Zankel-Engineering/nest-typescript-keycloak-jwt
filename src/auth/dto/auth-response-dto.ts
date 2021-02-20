import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AuthResponseDto {
    // tslint:disable-next-line:max-line-length
    @ApiModelProperty({required: true})
    // tslint:disable-next-line:variable-name
    public access_token!: string ;
    @ApiModelProperty({required: true})
    // tslint:disable-next-line:variable-name
    public expires_in!: number;
    @ApiModelProperty({required: true})
    // tslint:disable-next-line:variable-name
    public token_type!: string;
    @ApiModelProperty({required: true})
    // tslint:disable-next-line:variable-name
    public session_state!: string;
    @ApiModelProperty({required: true})
    public scope!: string;
}

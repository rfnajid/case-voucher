import { ApiProperty } from "@nestjs/swagger";

export class ValidationRequestDTO {
    @ApiProperty({format: 'binary' })
    file: string;
  
    @ApiProperty()
    id: number;

}
  
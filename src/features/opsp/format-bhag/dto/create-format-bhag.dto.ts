import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatBhagDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({
    example: 'Be the #1 digital bank in Central America',
    maxLength: 10000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ example: '13474' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}

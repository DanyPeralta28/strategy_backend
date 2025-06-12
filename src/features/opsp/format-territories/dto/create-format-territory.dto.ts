import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatTerritoryDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Western Highlands' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  geographic_location?: string;

  @ApiProperty({ example: 'admin_user' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  created_by?: string;
}

// dto/create-player-a.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';

export class CreatePlayerADto {
  @ApiProperty({ example: '1', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({
    example: '100',
    description: 'Player reward (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  reward?: string;

  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  @ApiProperty({
    example: '13474',
    description: 'User that created the record',
  })
  @IsString()
  @MaxLength(100)
  created_by: string;
}

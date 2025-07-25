import { IsString, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatTerritoryDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    description: 'Estructura jerárquica de territorios, segmentos, productos y canales',
    example: [
      {
        name: 'prueba 1',
        segments: [
          {
            name: 'segmento 1',
            products: [
              {
                name: 'producto 1',
                channels: [
                  { name: 'canal 2' }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'prueba 2',
        segments: [
          {
            name: 'segmento 2',
            products: [
              {
                name: 'producto 2',
                channels: [
                  { name: 'canal 2' }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
  @IsOptional()
  @IsArray()
  geographic_location?: any[];

  @ApiProperty({ example: 'admin_user' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  created_by?: string;
}

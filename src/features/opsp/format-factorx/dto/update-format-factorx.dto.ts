import { PartialType } from '@nestjs/swagger';
import { CreateFormatFactorXDto } from './create-format-factorx.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateFormatFactorXDto extends OmitType(PartialType(CreateFormatFactorXDto), ['id_company', 'id_entity'] as const) {}

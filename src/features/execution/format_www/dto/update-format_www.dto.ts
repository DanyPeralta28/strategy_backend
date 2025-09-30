import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateFormatWwwDto } from './create-format_www.dto';

export class UpdateFormatWwwDto extends OmitType(
    PartialType(CreateFormatWwwDto),
    ['id_company', 'id_entity'] as const
) {}

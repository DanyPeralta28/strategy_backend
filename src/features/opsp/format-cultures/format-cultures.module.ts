import { Module } from '@nestjs/common';
import { FormatCulturesService } from './format-cultures.service';
import { FormatCulturesController } from './format-cultures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatCulture } from './entities/format-culture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatCulture])],
  controllers: [FormatCulturesController],
  providers: [FormatCulturesService],
})
export class FormatCulturesModule {}

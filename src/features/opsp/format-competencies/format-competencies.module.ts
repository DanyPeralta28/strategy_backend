import { Module } from '@nestjs/common';
import { FormatCompetenciesService } from './format-competencies.service';
import { FormatCompetenciesController } from './format-competencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatCompetency } from './entities/format-competency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatCompetency])],
  controllers: [FormatCompetenciesController],
  providers: [FormatCompetenciesService],
})
export class FormatCompetenciesModule {}

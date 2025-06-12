import { Module } from '@nestjs/common';
import { FormatTerritoriesService } from './format-territories.service';
import { FormatTerritoriesController } from './format-territories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatTerritory } from './entities/format-territory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatTerritory])],
  controllers: [FormatTerritoriesController],
  providers: [FormatTerritoriesService],
})
export class FormatTerritoriesModule {}

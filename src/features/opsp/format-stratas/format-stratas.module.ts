import { Module } from '@nestjs/common';
import { FormatStratasService } from './format-stratas.service';
import { FormatStratasController } from './format-stratas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatStrata } from './entities/format-strata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatStrata])],
  controllers: [FormatStratasController],
  providers: [FormatStratasService],
})
export class FormatStratasModule {}

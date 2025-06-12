import { Module } from '@nestjs/common';
import { FormatCoreValuesService } from './format-core-values.service';
import { FormatCoreValuesController } from './format-core-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatCoreValue } from './entities/format-core-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatCoreValue])],
  controllers: [FormatCoreValuesController],
  providers: [FormatCoreValuesService],
})
export class FormatCoreValuesModule {}

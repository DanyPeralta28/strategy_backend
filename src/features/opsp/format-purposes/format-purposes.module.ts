import { Module } from '@nestjs/common';
import { FormatPurposesService } from './format-purposes.service';
import { FormatPurposesController } from './format-purposes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatPurpose } from './entities/format-purpose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatPurpose])],
  controllers: [FormatPurposesController],
  providers: [FormatPurposesService],
})
export class FormatPurposesModule {}

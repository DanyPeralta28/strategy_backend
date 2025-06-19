import { Module } from '@nestjs/common';
import { FormatBhagService } from './format-bhag.service';
import { FormatBhagController } from './format-bhag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatBhag } from './entities/format-bhag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatBhag])],
  controllers: [FormatBhagController],
  providers: [FormatBhagService],
})
export class FormatBhagModule {}

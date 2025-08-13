import { Module } from '@nestjs/common';
import { CashFormatValueService } from './format_value.service';
import { CashFormatValueController } from './format_value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFormatValue } from './entities/format_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashFormatValue])],
  controllers: [CashFormatValueController],
  providers: [CashFormatValueService],
})
export class FormatValueModule { }




import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFormatFinances } from './entities/format_finance.entity';
import { CashFormatFinancesController } from './format_finances.controller';
import { CashFormatFinancesService } from './format_finances.service';


@Module({
  imports: [TypeOrmModule.forFeature([CashFormatFinances])],
  controllers: [CashFormatFinancesController],
  providers: [CashFormatFinancesService],
})
export class CashFormatFinancesModule {}

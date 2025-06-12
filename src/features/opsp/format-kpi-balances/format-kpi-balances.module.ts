import { Module } from '@nestjs/common';
import { FormatKpiBalancesService } from './format-kpi-balances.service';
import { FormatKpiBalancesController } from './format-kpi-balances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatKpiBalance } from './entities/format-kpi-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatKpiBalance])],
  controllers: [FormatKpiBalancesController],
  providers: [FormatKpiBalancesService],
})
export class FormatKpiBalancesModule {}

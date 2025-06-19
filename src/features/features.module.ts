import { Module } from '@nestjs/common';
import {FormatVisionsModule} from './opsp/format-visions/format-visions.module';
import {FormatStratasModule} from './opsp/format-stratas/format-stratas.module';
import {FormatFdtModule} from './opsp/format-fdt/format-fdt.module';
import {FormatFactorxModule} from './opsp/format-factorx/format-factorx.module';
import {FormatBrandPromisesModule} from './opsp/format-brand-promises/format-brand-promises.module';
import { FormatProfitPerxModule } from './opsp/format-profit-perx/format-profit-perx.module';
import { FormatCentralClientsModule } from './opsp/format-central-clients/format-central-clients.module';
import { FormatGoalsModule } from './opsp/format-goals/format-goals.module';
import { FormatFlywheelModule } from './opsp/format-flywheel/format-flywheel.module';
import { FormatCoreValuesModule } from './opsp/format-core-values/format-core-values.module';
import { FormatPurposesModule } from './opsp/format-purposes/format-purposes.module';
import { FormatCompetenciesModule } from './opsp/format-competencies/format-competencies.module';
import { FormatKpiBalancesModule } from './opsp/format-kpi-balances/format-kpi-balances.module';
import { FormatTerritoriesModule } from './opsp/format-territories/format-territories.module';
import { FormatCulturesModule } from './opsp/format-cultures/format-cultures.module';
import { FormatBhagModule } from './opsp/format-bhag/format-bhag.module';

@Module({
  imports: [
    FormatVisionsModule,
    FormatStratasModule,
    FormatFdtModule,
    FormatFactorxModule,
    FormatBrandPromisesModule,
    FormatProfitPerxModule,
    FormatCentralClientsModule,
    FormatGoalsModule,
    FormatFlywheelModule,
    FormatCoreValuesModule,
    FormatPurposesModule,
    FormatCompetenciesModule,
    FormatKpiBalancesModule,
    FormatTerritoriesModule,
    FormatCulturesModule,
    FormatBhagModule
  ]
})
export class FeaturesModule { }

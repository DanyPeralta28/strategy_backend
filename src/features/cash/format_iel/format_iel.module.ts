import { Module } from '@nestjs/common';
import { CashFormatIelService } from './format_iel.service';
import { CashFormatIelController } from './format_iel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFormatIel } from './entities/format_iel.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CashFormatIel])],
  controllers: [CashFormatIelController],
  providers: [CashFormatIelService],
})
export class CashFormatIelModule {}

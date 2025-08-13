import { Module } from '@nestjs/common';
import { CashFormatOptcashService } from './format_optcash.service';
import { CashFormatOptcashController } from './format_optcash.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashFormatOptcash } from './entities/format_optcash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashFormatOptcash])],
  controllers: [CashFormatOptcashController],
  providers: [CashFormatOptcashService],
})
export class CashFormatOptcashModule {}

import { Module } from '@nestjs/common';
import { FormatFdtService } from './format-fdt.service';
import { FormatFdtController } from './format-fdt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatFdt } from './entities/format-fdt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatFdt])],
  controllers: [FormatFdtController],
  providers: [FormatFdtService],
})
export class FormatFdtModule {}

import { Module } from '@nestjs/common';
import { FormatProfitPerXService } from './format-profit-perx.service';
import { FormatProfitPerXController } from './format-profit-perx.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatProfitPerX } from './entities/format-profit-perx.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormatProfitPerX],),
  ],
  controllers: [FormatProfitPerXController],
  providers: [FormatProfitPerXService],
})
export class FormatProfitPerxModule {}

import { Module } from '@nestjs/common';
import { FormatFactorXService } from './format-factorx.service';
import { FormatFactorXController } from './format-factorx.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatFactorX } from './entities/format-factorx.entity';


@Module({
  imports: [TypeOrmModule.forFeature([FormatFactorX])],
  controllers: [FormatFactorXController],
  providers: [FormatFactorXService],
})
export class FormatFactorxModule {}

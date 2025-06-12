import { Module } from '@nestjs/common';
import { FormatBrandPromiseService } from './format-brand-promises.service';
import { FormatBrandPromiseController } from './format-brand-promises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatBrandPromise } from './entities/format-brand-promise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormatBrandPromise],),
  ],
  controllers: [FormatBrandPromiseController],
  providers: [FormatBrandPromiseService],
})
export class FormatBrandPromisesModule {}

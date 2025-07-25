import { Module } from '@nestjs/common';
import { ConsistentActionsService } from './consistent-actions.service';
import { ConsistentActionsController } from './consistent-actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsistentAction } from './entities/consistent-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsistentAction])],
  controllers: [ConsistentActionsController],
  providers: [ConsistentActionsService],
})
export class ConsistentActionsModule {}

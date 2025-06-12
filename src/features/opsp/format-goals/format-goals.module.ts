import { Module } from '@nestjs/common';
import { FormatGoalsService } from './format-goals.service';
import { FormatGoalsController } from './format-goals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatGoal } from './entities/format-goal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormatGoal]),
  ],
  controllers: [FormatGoalsController],
  providers: [FormatGoalsService],
})
export class FormatGoalsModule {}

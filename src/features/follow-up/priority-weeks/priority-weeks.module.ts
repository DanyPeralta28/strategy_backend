import { Module } from '@nestjs/common';
import { FollowUpPriorityWeeksService } from './priority-weeks.service';
import { FollowUpPriorityWeeksController } from './priority-weeks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUpPriorityWeeks } from './entities/priority-week.entity';
import { FollowUpStartWeeks } from '../start-weeks/entities/start-week.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FollowUpPriorityWeeks, FollowUpStartWeeks])],
  controllers: [FollowUpPriorityWeeksController],
  providers: [FollowUpPriorityWeeksService],
})
export class PriorityWeeksModule {}

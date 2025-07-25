import { Module } from '@nestjs/common';
import { FollowUpStartWeeksService } from './start-weeks.service';
import { FollowUpStartWeeksController } from './start-weeks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowUpStartWeeks } from './entities/start-week.entity';  

@Module({
  imports: [TypeOrmModule.forFeature([FollowUpStartWeeks])],
  controllers: [FollowUpStartWeeksController],
  providers: [FollowUpStartWeeksService],
})
export class StartWeeksModule {}

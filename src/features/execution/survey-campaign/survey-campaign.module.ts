import { Module } from '@nestjs/common';
import { ExecutionSurveyCampaignService } from './survey-campaign.service';
import { ExecutionSurveyCampaignController } from './survey-campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionSurveyCampaign } from './entities/survey-campaign.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSurveyCampaign])],
  controllers: [ExecutionSurveyCampaignController],
  providers: [ExecutionSurveyCampaignService],
})
export class SurveyCampaignModule {}

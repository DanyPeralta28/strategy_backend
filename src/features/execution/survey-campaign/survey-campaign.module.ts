import { Module } from '@nestjs/common';
import { ExecutionSurveyCampaignService } from './survey-campaign.service';
import { ExecutionSurveyCampaignController } from './survey-campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionSurveyCampaign } from './entities/survey-campaign.entity';
import { OrgRelationsModule } from 'src/features/org-relations/org-relations.module';



@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSurveyCampaign]), OrgRelationsModule],
  controllers: [ExecutionSurveyCampaignController],
  providers: [ExecutionSurveyCampaignService],
})
export class SurveyCampaignModule {}

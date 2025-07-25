import { Module } from '@nestjs/common';
import { TeamViewerController } from './organization.controller';
import { TeamViewerService } from './organization.service';
import { AppEntity } from './entities/entity.entity';
import { User } from './entities/user.entity';      
import { Company } from './entities/company.entity';
import { Boss } from './entities/bosses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppEntity, User, Company, Boss])],
  controllers: [TeamViewerController],
  providers: [TeamViewerService],
})
export class OrganizationModule {}

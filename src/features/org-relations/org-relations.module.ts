import { Module } from '@nestjs/common';
import { OrgRelationsService } from './org-relations.service';

@Module({
  providers: [OrgRelationsService],
  exports: [OrgRelationsService],
})
export class OrgRelationsModule {}

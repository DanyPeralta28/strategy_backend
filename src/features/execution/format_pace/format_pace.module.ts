import { Module } from '@nestjs/common';
import { FormatPaceService } from './format_pace.service';
import { FormatPaceController } from './format_pace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatPace } from './entities/format_pace.entity';
import { OrgRelationsModule } from 'src/features/org-relations/org-relations.module';


@Module({
  imports: [TypeOrmModule.forFeature([FormatPace]), OrgRelationsModule],
  controllers: [FormatPaceController],
  providers: [FormatPaceService],
})
export class FormatPaceModule {}

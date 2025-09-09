import { Module } from '@nestjs/common';
import { FormatWwwService } from './format_www.service';
import { FormatWwwController } from './format_www.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatWww } from './entities/format_www.entity';
import { OrgRelationsModule } from '../../org-relations/org-relations.module';


@Module({
  imports: [TypeOrmModule.forFeature([FormatWww]), OrgRelationsModule],
  controllers: [FormatWwwController],
  providers: [FormatWwwService],
})
export class FormatWwwModule {}

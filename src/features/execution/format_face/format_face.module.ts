import { Module } from '@nestjs/common';
import { FormatFaceService } from './format_face.service';
import { FormatFaceController } from './format_face.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatFace } from './entities/format_face.entity';
import { OrgRelationsModule } from 'src/features/org-relations/org-relations.module';

@Module({
  imports: [TypeOrmModule.forFeature([FormatFace]), OrgRelationsModule],
  controllers: [FormatFaceController],
  providers: [FormatFaceService],
})
export class FormatFaceModule {}

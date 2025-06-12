import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatVisionsService } from './format-visions.service';
import { FormatVisionsController } from './format-visions.controller';
import { FormatVision } from './entities/format-vision.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatVision])],
  controllers: [FormatVisionsController],
  providers: [FormatVisionsService],
})
export class FormatVisionsModule {}

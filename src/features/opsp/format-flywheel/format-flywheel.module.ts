import { Module } from '@nestjs/common';
import { FormatFlywheelService } from './format-flywheel.service';
import { FormatFlywheelController } from './format-flywheel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatFlywheel } from './entities/format-flywheel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormatFlywheel])],
  controllers: [FormatFlywheelController],
  providers: [FormatFlywheelService],
})
export class FormatFlywheelModule {}

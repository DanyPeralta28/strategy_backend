import { Module } from '@nestjs/common';
import { WinGameService } from './win-game.service';
import { WinGameController } from './win-game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinGameDashboard } from './entities/win-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WinGameDashboard])],
  controllers: [WinGameController],
  providers: [WinGameService],
})
export class WinGameModule {}

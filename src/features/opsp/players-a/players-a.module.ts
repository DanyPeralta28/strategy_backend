import { Module } from '@nestjs/common';
import { PlayersAService } from './players-a.service';
import { PlayersAController } from './players-a.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerA } from './entities/players-a.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerA])],
  controllers: [PlayersAController],
  providers: [PlayersAService],
})
export class PlayersAModule {}

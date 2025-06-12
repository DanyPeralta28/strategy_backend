import { Module } from '@nestjs/common';
import { FormatCentralClientsService } from './format-central-clients.service';
import { FormatCentralClientsController } from './format-central-clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormatCentralClient } from './entities/format-central-client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormatCentralClient]),
  ],
  controllers: [FormatCentralClientsController],
  providers: [FormatCentralClientsService],
})
export class FormatCentralClientsModule {}

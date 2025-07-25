import { Module } from '@nestjs/common';
import { GroupControlService } from './group-control.service';
import { GroupControlController } from './group-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupControl } from './entities/group-control.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroupControl])],
  controllers: [GroupControlController],
  providers: [GroupControlService],
})
export class GroupControlModule {}

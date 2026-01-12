import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,
} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,
} from '@nestjs/swagger';
import { PlayersAService } from './players-a.service';
import { CreatePlayerADto } from './dto/create-players-a.dto';
import { UpdatePlayerADto } from './dto/update-players-a.dto';
import { PlayerA } from './entities/players-a.entity';

@ApiTags('OPSP - Players A')
@Controller('players-a')
export class PlayersAController {
  constructor(private readonly service: PlayersAService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Player A record' })
  @ApiResponse({
    status: 201,
    description: 'Player A created successfully',
    type: PlayerA,
  })
  async create(@Body() dto: CreatePlayerADto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Player A records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalingsoft' })
  @ApiQuery({ name: 'id_entity', required: false, example: 'Entity001' })
  @ApiResponse({
    status: 200,
    description: 'Player A records retrieved',
    type: [PlayerA],
  })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity: string) {
    return await this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Player A record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Player A record found',
    type: PlayerA,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Player A record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Player A record updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlayerADto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Player A record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Player A record logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}

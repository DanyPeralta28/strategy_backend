import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeamViewerService } from './organization.service';

@ApiTags('team-viewer')
@Controller('team-viewer')
export class TeamViewerController {
  constructor(private readonly service: TeamViewerService) {}

  @Get('entities/:companyId')
  @ApiOperation({ summary: 'Get all entities belonging to a company' })
  @ApiParam({ name: 'companyId', example: 55, description: 'ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Entities retrieved successfully',
    schema: {
      example: {
        data: [
          { id_entity: 1, name_entity: 'Sucursal Zona 9' },
          { id_entity: 2, name_entity: 'Sucursal Roosevelt' },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No entities found for this company',
    schema: {
      example: {
        data: null,
        message: 'No entities found for company ID 55',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        data: null,
        message: 'Internal Server Error: [error message]',
        statusCode: 500,
      },
    },
  })
  getEntitiesByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.service.getEntitiesByCompany(companyId);
  }

  @Get('team-members-by-entity/:userId/:entityId/:companyId')
  @ApiOperation({ summary: 'Get team members for a given entity' })
  @ApiParam({ name: 'userId', example: 13475, description: 'ID of the boss user' })
  @ApiParam({ name: 'entityId', example: 234, description: 'ID of the entity' })
  @ApiParam({ name: 'companyId', example: 55, description: 'ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Team names retrieved for this boss',
    schema: {
      example: {
        data: ['Ventas Zona 9', 'Ventas Roosevelt'],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No users found under this boss',
    schema: {
      example: {
        data: null,
        message: 'No users found under boss ID 13475',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        data: null,
        message: 'Internal Server Error: [error message]',
        statusCode: 500,
      },
    },
  })
  getMembersByEntity(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('entityId', ParseIntPipe) entityId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.service.getTeamsByBossInEntity(userId, entityId, companyId);
  }

  @Get('team-members-by-team/:teamId/:entityId/:companyId')
  @ApiOperation({ summary: 'Get users for a given team name' })
  @ApiParam({ name: 'teamId', example: 'Coaching', description: 'Name or ID of the team' })
  @ApiParam({ name: 'entityId', example: 234, description: 'ID of the entity' })
  @ApiParam({ name: 'companyId', example: 55, description: 'ID of the company' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved for the team',
    schema: {
      example: {
        data: [
          {
            id_user: 54321,
            firstname: 'Andrea',
            lastname: 'López',
            team: 'Coaching',
            email: 'andrea.lopez@example.com',
          },
          {
            id_user: 12345,
            firstname: 'Carlos',
            lastname: 'Morales',
            team: 'Coaching',
            email: 'carlos.morales@example.com',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No users found for this team',
    schema: {
      example: {
        data: null,
        message: 'No users found for team matching "Coaching" in entity 234 and company 55',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        data: null,
        message: 'Internal Server Error: [error message]',
        statusCode: 500,
      },
    },
  })
  getMembersByTeam(
    @Param('teamId') teamId: string,
    @Param('entityId', ParseIntPipe) entityId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
  ) {
    return this.service.getTeamMembersByTeam(teamId, entityId, companyId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'userId', example: 13475, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    schema: {
      example: {
        data: {
          id_user: 13475,
          firstname: 'Carlos',
          lastname: 'Morales',
          email: 'carlos.morales@example.com',
          team: 'Coaching',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      example: {
        data: null,
        message: 'User with ID 13475 not found',
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        data: null,
        message: 'Internal Server Error: [error message]',
        statusCode: 500,
      },
    },
  })
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.getUserById(userId);
  }
}

import { Controller, Get, Post, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ExecutionSurveyCampaignService } from './survey-campaign.service';
import { CreateExecutionSurveyCampaignDto } from './dto/create-survey-campaign.dto';
import { ExecutionSurveyCampaign } from './entities/survey-campaign.entity';

@ApiTags('Execution - Survey Campaign')
@Controller('execution/survey-campaign')
export class ExecutionSurveyCampaignController {
  constructor(private readonly service: ExecutionSurveyCampaignService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new survey campaign and return its id' })
  @ApiBody({
    type: CreateExecutionSurveyCampaignDto,
    examples: {
      sample: {
        summary: 'Basic payload',
        value: { id_company: 'Scalling', created_by: 'admin@scalling.com' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Survey campaign created successfully',
    content: {
      'application/json': {
        examples: {
          success: { value: { data: { id: 101 }, message: 'OK', statusCode: 201 } },
          error: {
            summary: 'Validation error',
            value: { data: {}, message: 'Internal Server Error: id_company must be a string', statusCode: 500 },
          },
        },
      },
    },
  })
  async create(@Body() dto: CreateExecutionSurveyCampaignDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all survey campaigns for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalling' })
  @ApiResponse({
    status: 200,
    description: 'Survey campaigns retrieved',
    content: {
      'application/json': {
        examples: {
          success: {
            value: {
              data: [
                {
                  id: 101,
                  created_by: 'admin@scalling.com',
                  status: 1,
                  created_at: '2025-09-09T12:34:56.000Z',
                  id_company: 'Scalling',
                },
              ],
              message: 'OK',
              statusCode: 200,
            },
          },
        },
      },
    },
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey campaign by ID' })
  @ApiParam({ name: 'id', type: Number, example: 101 })
  @ApiResponse({
    status: 200,
    description: 'Survey campaign found',
    content: {
      'application/json': {
        examples: {
          success: {
            value: {
              data: {
                id: 101,
                created_by: 'admin@scalling.com',
                status: 1,
                created_at: '2025-09-09T12:34:56.000Z',
                id_company: 'Scalling',
              },
              message: 'OK',
              statusCode: 200,
            },
          },
          notFound: { value: { data: {}, message: 'Survey campaign not found', statusCode: 404 } },
        },
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }
}

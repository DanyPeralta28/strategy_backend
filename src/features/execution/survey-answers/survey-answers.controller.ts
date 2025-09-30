import {
  Controller, Get, Post, Param, Body, Query, ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { ExecutionSurveyAnswersService } from './survey-answers.service';
import { CreateExecutionSurveyAnswerDto } from './dto/create-survey-answer.dto';
import { ExecutionSurveyAnswer } from './entities/survey-answer.entity';

@ApiTags('Execution - Survey Answers')
@Controller('execution/survey-answers')
export class ExecutionSurveyAnswersController {
  constructor(private readonly service: ExecutionSurveyAnswersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new survey answer' })
  @ApiResponse({
    status: 201,
    description: 'Survey answer created successfully',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Created successfully',
            value: {
              data: { id: 6 },
              message: 'OK',
              statusCode: 201,
            },
          },
          error: {
            summary: 'Validation error',
            value: {
              data: {},
              message: 'Internal Server Error: company must be a string',
              statusCode: 500,
            },
          },
        },
      },
    },
  })
  async create(@Body() dto: CreateExecutionSurveyAnswerDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all survey answers for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalling' })
  @ApiQuery({
    name: 'id_entity',
    required: false,
    example: 'ENTITY_123',
    schema: { type: 'string', maxLength: 50, nullable: true },
    description: 'Optional entity id. Must be a string with max 50 characters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Survey answers retrieved',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'List of survey answers',
            value: {
              data: [
                {
                  id: 6,
                  segment_1: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_2: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_3: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_4: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_5: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_6: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_7: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_8: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_9: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                  segment_10: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
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
  async findAll(
    @Query('id_company') id_company: string,
    @Query('id_entity') id_entityRaw?: string,
  ) {
    let id_entity: string | undefined = undefined;

    if (
      id_entityRaw &&
      id_entityRaw !== '{id_entity}' &&
      id_entityRaw.toLowerCase() !== 'undefined' &&
      id_entityRaw.toLowerCase() !== 'null'
    ) {
      if (typeof id_entityRaw !== 'string') {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must be a string conforming to the specified constraints',
          statusCode: 400,
        });
      }

      if (id_entityRaw.length > 50) {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must not exceed 50 characters',
          statusCode: 400,
        });
      }

      id_entity = id_entityRaw;
    }

    return await this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey answer by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Survey answer found',
    content: {
      'application/json': {
        examples: {
          success: {
            summary: 'Record found',
            value: {
              data: {
                id: 6,
                segment_1: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_2: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_3: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_4: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_5: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_6: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_7: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_8: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_9: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                segment_10: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
                status: 1,
                created_at: '2025-09-09T12:34:56.000Z',
                id_company: 'Scalling',
              },
              message: 'OK',
              statusCode: 200,
            },
          },
          notFound: {
            summary: 'Record not found',
            value: {
              data: {},
              message: 'Survey answer not found',
              statusCode: 404,
            },
          },
        },
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }
}

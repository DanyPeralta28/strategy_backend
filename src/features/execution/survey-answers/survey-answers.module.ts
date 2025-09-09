import { Module } from '@nestjs/common';
import { ExecutionSurveyAnswersService } from './survey-answers.service';
import { ExecutionSurveyAnswersController } from './survey-answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionSurveyAnswer } from './entities/survey-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExecutionSurveyAnswer])],
  controllers: [ExecutionSurveyAnswersController],
  providers: [ExecutionSurveyAnswersService],
})
export class ExecutionSurveyAnswersModule {}

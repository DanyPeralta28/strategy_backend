import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsInt,IsDate,MaxLength,IsDateString,} from 'class-validator';

export class CreateFormatVisionDto {
  @ApiProperty({
    example: 'Integrity, Innovation',
    description: 'Core values of the organization',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  core_values: string;

  @ApiProperty({
    example: 'Delivering exceptional value',
    description: 'Main brand promises',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  brand_promises: string;

  @ApiProperty({
    example: 'Expand to 3 new markets',
    description: '1-year strategic priorities',
  })
  @IsString()
  @MaxLength(250)
  strategic_priorities_1_year: string;

  @ApiProperty({
    example: 'Be regional leader',
    description: '3–5 year strategic priorities',
  })
  @IsString()
  @MaxLength(250)
  strategic_priorities_3_to_5_years: string;

  @ApiProperty({
    example: 'Launch new product',
    description: 'Trimester priorities',
  })
  @IsString()
  @MaxLength(250)
  strategic_priorities_trimester: string;

  @ApiProperty({ example: 'jdoe', description: 'Username of the creator' })
  @IsString()
  @MaxLength(100)
  user_name: string;

  @ApiProperty({
    example: 'Client satisfaction rate',
    description: 'First KPI description',
  })
  @IsString()
  @MaxLength(250)
  kpi_description_1: string;

  @ApiProperty({ example: '90%', description: 'Target for KPI 1' })
  @IsString()
  @MaxLength(100)
  kpi_target_1: string;

  @ApiProperty({
    example: 'Lead conversion rate',
    description: 'Second KPI description',
  })
  @IsString()
  @MaxLength(250)
  kpi_description_2: string;

  @ApiProperty({ example: '75%', description: 'Target for KPI 2' })
  @IsString()
  @MaxLength(100)
  kpi_target_2: string;

  @ApiProperty({
    example: 'Customer retention',
    description: 'Third KPI description',
  })
  @IsString()
  @MaxLength(250)
  kpi_description_3: string;

  @ApiProperty({ example: '80%', description: 'Target for KPI 3' })
  @IsString()
  @MaxLength(100)
  kpi_target_3: string;

  @ApiProperty({ example: 'Integrate CRM across regions' })
  @IsString()
  @MaxLength(500)
  priority_description_1: string;

  @ApiProperty({ example: '2025-07-01' })
  @IsString()
  @MaxLength(50)
  priority_deadline_1: string;

  @ApiProperty({ example: 'Train customer service teams' })
  @IsString()
  @MaxLength(500)
  priority_description_2: string;

  @ApiProperty({ example: '2025-08-01' })
  @IsString()
  @MaxLength(50)
  priority_deadline_2: string;

  @ApiProperty({ example: 'Implement BI dashboards' })
  @IsString()
  @MaxLength(500)
  priority_description_3: string;

  @ApiProperty({ example: '2025-09-01' })
  @IsString()
  @MaxLength(50)
  priority_deadline_3: string;

  @ApiProperty({ example: 'Audit supply chain' })
  @IsString()
  @MaxLength(500)
  priority_description_4: string;

  @ApiProperty({ example: '2025-10-01' })
  @IsString()
  @MaxLength(50)
  priority_deadline_4: string;

  @ApiProperty({ example: 'Website optimization' })
  @IsString()
  @MaxLength(500)
  priority_description_5: string;

  @ApiProperty({ example: '2025-11-01' })
  @IsString()
  @MaxLength(50)
  priority_deadline_5: string;

  @ApiProperty({ example: 'Everything on track' })
  @IsString()
  @MaxLength(100)
  game_green_1: string;

  @ApiProperty({ example: 'Minor risks detected' })
  @IsString()
  @MaxLength(100)
  game_lemon_1: string;

  @ApiProperty({ example: 'Delays in delivery' })
  @IsString()
  @MaxLength(100)
  game_yellow_1: string;

  @ApiProperty({ example: 'Critical risk identified' })
  @IsString()
  @MaxLength(100)
  game_red_1: string;

  @ApiProperty({ example: '90% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_green_2: string;

  @ApiProperty({ example: '70-90% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_lemon_2: string;

  @ApiProperty({ example: '50-70% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_yellow_2: string;

  @ApiProperty({ example: '<50% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_red_2: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;
}

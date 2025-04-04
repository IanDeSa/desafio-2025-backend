import { SchedulingStatus } from '@/src/enums';
import { IsNotEmpty, IsDateString, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Scheduling } from '@/src/database/models';

export class CreateSchedulingDto {
  @ApiProperty({
    description: 'ID do estudante',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  studentId: number;

  @ApiProperty({
    description: 'ID do professor',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  teacherId: number;

  @ApiProperty({
    description: 'Data e hora do agendamento no formato ISO 8601',
    example: '2025-01-01T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  datetime: string;

  @ApiProperty({
    description: 'Status do agendamento',
    example: SchedulingStatus.PENDING,
  })
  @IsNotEmpty()
  @IsEnum(SchedulingStatus)
  status: SchedulingStatus;

  @ApiProperty({
    description: 'Duração do agendamento em minutos',
    example: 60,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  durationInMinutes: number;
}

export class CreateSchedulingResponse {
  body: Scheduling;
  status: number;
}

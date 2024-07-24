import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  public type: number;

  @IsBoolean()
  public required: boolean;
}

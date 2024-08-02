import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAppraisalDto {
  @IsString()
  public manageeId: string;

  @IsString()
  public managerId: string;

  @IsString()
  public formId: string;

  @IsIn(['in review', 'post review', 'completed'])
  public status: string;

  @IsString()
  public deadline: string;

  @IsString({ each: true })
  public answers: string[];

  @IsString()
  public comments: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  public rating: number;
}

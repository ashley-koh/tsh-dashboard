import { IsIn, IsMongoId, IsString } from 'class-validator';

export class CreateAppraisalDto {
  @IsString()
  public manageeId: string;

  @IsString()
  public managerId: string;

  @IsMongoId()
  public formId: string;

  @IsIn(['in review', 'post review', 'completed'])
  public status: string;

  @IsMongoId()
  public reviewId: string;

  @IsString()
  public deadline: Date;
}

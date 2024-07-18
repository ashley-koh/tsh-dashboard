import { IsDate, IsString } from 'class-validator';

export class CreateAppraisalFormDto {
  @IsDate()
  public dateCreated: Date;

  @IsString()
  public reviewPeriod: string;
}

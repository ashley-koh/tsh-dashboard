import { IsJSON, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppraisalDto {
  @IsString()
  public manageeId: string;

  @IsString()
  public managerId: string;

  @IsMongoId()
  public formId: Types.ObjectId;

  @IsString()
  public status: string;

  @IsJSON()
  public answers: JSON;

  @IsMongoId()
  public reviewId: Types.ObjectId;

  @IsString()
  public deadline: Date;
}

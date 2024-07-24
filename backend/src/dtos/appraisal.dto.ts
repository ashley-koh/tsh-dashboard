import { IsJSON, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppraisalDto {
  @IsMongoId()
  public manageeId: Types.ObjectId;

  @IsMongoId()
  public managerId: Types.ObjectId;

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

import { IsJSON, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppraisalDto {
  @IsMongoId()
  public manageeId: Types.ObjectId;

  @IsMongoId()
  managerId: Types.ObjectId;

  @IsMongoId()
  formId: Types.ObjectId;

  @IsString()
  status: string;

  @IsJSON()
  answers: JSON;

  @IsMongoId()
  reviewId: Types.ObjectId;

  @IsString()
  public deadline: Date;
}

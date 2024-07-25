import { IsIn, IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppraisalDto {
  @IsString()
  public manageeId: string;

  @IsString()
  public managerId: string;

  @IsMongoId()
  public formId: Types.ObjectId;

  @IsIn(['in review', 'post review', 'completed'])
  public status: string;

  @IsMongoId()
  public reviewId: Types.ObjectId;

  @IsString()
  public deadline: Date;
}

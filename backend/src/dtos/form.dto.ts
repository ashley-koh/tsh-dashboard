import { IsMongoId, IsString } from 'class-validator';
import {} from 'mongoose';

export class CreateFormDto {
  @IsString()
  public name: string;

  @IsMongoId({ each: true })
  public sections: string[];
}

import { IsString } from 'class-validator';
import {} from 'mongoose';

export class CreateFormDto {
  @IsString()
  public name: string;

  @IsString({ each: true })
  public sections: string[];
}

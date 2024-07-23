import { IsEmail, IsString, IsEnum } from 'class-validator';

export class CreateEmailDto {
  @IsEnum(['reminder', 'confirmation'])
  public type: string;

  @IsEmail()
  public sender: string;

  @IsEmail({}, { each: true })
  public recipients: string[];

  @IsString()
  public subject: string;

  @IsString()
  public body: string;

  @IsEnum(['sent', 'pending', 'failed'])
  public status: string;
}

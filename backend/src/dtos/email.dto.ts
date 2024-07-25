import { IsEmail, IsString, IsEnum } from 'class-validator';

export class CreateEmailDto {
  @IsEnum(['reminder', 'confirmation'])
  public type: string;

  @IsString()
  public senderName: string;

  @IsEmail()
  public senderEmail: string;

  @IsString()
  public recipientName: string;

  @IsEmail()
  public recipientEmail: string;

  @IsString()
  public subject: string;

  @IsString()
  public body: string;

  @IsString()
  public deadline: string;
}

import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public employeeID: string;

  @IsString({ each: true })
  public appraisals: string[];

  @IsString()
  public name: string;

  @IsString()
  public dept: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsString()
  public mobileNo: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public hashedPassword: string;
}

import { IsEmail, IsIn, IsString, Length, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;

  @Length(10, 10)
  public employeeID: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsString()
  public jobTitle: string;

  @IsString()
  public dept: string;

  @IsIn(['full_time', 'part_time', 'intern', 'temp'])
  public employmentStatus: string;
}

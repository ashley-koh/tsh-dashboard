import { IsEmail, IsIn, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsStrongPassword({
    minLength: 10,
    minNumbers: 1,
  })
  public password: string;

  @IsString()
  public employeeId: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsString()
  public jobTitle: string;

  @IsString()
  public dept: string;

  @IsIn(['full_time', 'part_time', 'intern', 'temp'])
  public employmentStatus: string;
}

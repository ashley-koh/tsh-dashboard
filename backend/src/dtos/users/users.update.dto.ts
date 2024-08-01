import {
  IsEmail,
  IsIn,
  IsMobilePhone,
  IsString,
  NotContains,
} from 'class-validator';

export default class UpdateUserDto {
  @IsString({ each: true })
  public appraisals: string[];

  @IsString()
  public name: string;

  @IsString()
  public dept: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsMobilePhone()
  public mobileNo: string;

  @IsEmail()
  public email: string;

  @IsString()
  @NotContains(' ')
  public employeeId: string;

  @IsString()
  public jobTitle: string;

  @IsIn(['full_time', 'part_time', 'intern', 'temp'])
  public employmentStatus: string;
}

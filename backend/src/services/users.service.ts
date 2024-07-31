import { compare, hash } from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { CreateUserDto } from '@dtos/users';
import UpdateUserDto from '@/dtos/users/users.update.dto';
import ResetPasswordDto from '@/dtos/users/users.password.dto';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`,
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      userData,
      { new: true },
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async updateUserPassword(
    userId: string,
    passwordData: ResetPasswordDto,
  ): Promise<User> {
    if (isEmpty(passwordData))
      throw new HttpException(400, 'userData is empty');
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, `user was not found`);

    // make sure old password is correct
    const isPasswordMatching: boolean = await compare(
      passwordData.oldPassword,
      findUser.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    // hash new password
    const hashedPassword = await hash(passwordData.newPassword, 10);

    const updateUserById: User = await this.users.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;

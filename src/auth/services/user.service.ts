import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  async createUser(email, password) {
    const createNewUser = await this.userModel.create({ email, password });
    return {
      success: true,
      data: createNewUser
    };
  }

  async findUser() {
    return 'findUser';
  }

  async findOneUserByEmail(email: string): Promise<any> {
    const findUser = await this.userModel.findOne({ email });
    if (findUser) {
      return {
        success: true,
        data: findUser
      };
    }
    return {
      success: false,
      data: null
    };
  }

  async updateUser() {
    return 'updateUser';
  }

  async deleteUser() {
    return 'deleteUser';
  }

} 
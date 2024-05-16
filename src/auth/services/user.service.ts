import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  /**
   * 
   * @param email 
   * @param passwordInput 
   * @returns 
   */
  async createUser(email, passwordInput) {
    const SALT_OR_ROUND = 10;
    let createNewUser = await this.userModel.create({
      email,
      password: await bcrypt.hash(passwordInput, SALT_OR_ROUND)
    });
    delete createNewUser.password;

    return {
      success: true,
      data: {
        id: createNewUser.id,
        email: createNewUser.email,
        createdAt: createNewUser.createdAt,
        updatedAt: createNewUser.updatedAt,
      }
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
import prisma from "@/lib/prisma";
import { User } from '@prisma/client';

export interface UserDAO {
  /*
  * 获取所有User
  * 参数：无
  * */
  findAllUsers(): Promise<User[]>;
  /*
  * 根据id查找User
  * 参数：
  *   id：用户id
  * */
  findUserById(id: number): Promise<User | null>;
  /*
  * 新建User
  * 参数：
  *   data：用户字段，除id、createdAt、updatedAt、loginAt外
  * */
  createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'loginAt'>): Promise<User>;
  /*
  * 更新User
  * 参数：
  *   id：用户id
  *   data：用户的任意部分字段
  * */
  updateUser(id: number, data: Partial<User>): Promise<User | null>;
  /*
  * 删除User
  * 参数：
  *   id：用户id
  * */
  deleteUser(id: number): Promise<User | null>;
  /*
  * 判断User是否存在
  * 参数：
  *   username：用户名
  * */
  isUserExists(username: string): Promise<boolean>;
  /*
  * 检验密码是否正确
  * 参数：
  *   username：用户名
  *   password：密码
  * */
  doesPasswordMatch(username: string, password: string): Promise<boolean>;
}

export default class UserDAOImpl implements UserDAO {
  async findAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {id},
      include: {
        userSetting: true
      }
    });
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'loginAt'>): Promise<User> {
    return prisma.user.create({
      data
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({
      where: {id},
      data
    });
  }

  async deleteUser(id: number): Promise<User | null> {
    return prisma.user.delete({
      where: {id}
    });
  }

  async isUserExists(username: string): Promise<boolean> {
    let count = await prisma.user.count({
      where: {username}
    });
    return count === 1;
  }

  async doesPasswordMatch(username: string, password: string): Promise<boolean> {
    let count = await prisma.user.count({
      where: {
        username,
        userAuth: {
          password
        }
      }
    });
    return count === 1;
  }

}

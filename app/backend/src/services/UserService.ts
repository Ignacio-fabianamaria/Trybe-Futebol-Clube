import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import IServiceUser from '../interfaces/IServiceUser';
import UserModel from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import { generateToken } from '../utils/jwt';

export default class UserServise implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  async toLogin({ email, password }:ILogin):Promise<IToken | null> {
    const isUser = await this.model.findOne({ where: { email } });
    if (!isUser) return null;

    const validPassword = bcrypt.compareSync(password, isUser.password);
    if (!validPassword) return null;

    const token = generateToken({
      id: isUser.id,
      role: isUser.role,
      email: isUser.email,
      password: isUser.password,
    });
    return { token };
  }
}

// Comparar senhas com o bcrypt no Express - https://www.youtube.com/watch?v=9UZ4UN38NMs

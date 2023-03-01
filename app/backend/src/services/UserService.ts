import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import IServiceUser from '../interfaces/IServiceUser';
import UserModel from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import { generateToken } from '../utils/jwt';

const ERROR_LOGIN = 'All fields must be filled';

export default class UserServise implements IServiceUser {
  protected model: ModelStatic<UserModel> = UserModel;

  async toLogin(body: ILogin):Promise<IToken | null> {
    const { email, password } = body;

    const isUser = await this.model.findOne({ where: { email } });
    if (!isUser) throw new Error(ERROR_LOGIN);

    const validPassword = bcrypt.compareSync(password, isUser?.password);
    if (!validPassword) return null;

    const token = generateToken({ id: isUser.id });
    console.log({ token });
    return { token };
  }
}

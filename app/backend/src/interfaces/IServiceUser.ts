import ILogin from './ILogin';
import IToken from './IToken';

export default interface IServiceUser {
  toLogin(body:ILogin):Promise<IToken | null>;
}

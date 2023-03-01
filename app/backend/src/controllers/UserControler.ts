import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

export default class UserControler {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async toLogin(req:Request, res:Response) {
    const { email, password } = req.body;
    const isUser = await this._service.toLogin({ email, password });
    if (!isUser) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return res.status(200).json(isUser);
  }
}

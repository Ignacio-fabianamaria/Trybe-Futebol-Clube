import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesControler {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    const matchesList = await this._service.findAll();
    res.status(200).json(matchesList);
  }
}

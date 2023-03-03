import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesControler {
  private _service: IServiceMatches;

  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async findAll(req:Request, res:Response) {
    const { inProgress } = req.query;

    const filterTrue = await this._service.filterMacthes(inProgress === 'true');
    const filterFalse = await this._service.filterMacthes(inProgress === 'false');

    if (inProgress && filterTrue) {
      return res.status(200).json(filterTrue);
    }
    if (inProgress && filterFalse) {
      return res.status(200).json(filterFalse);
    }
    const matchesList = await this._service.findAll();
    res.status(200).json(matchesList);
  }
}

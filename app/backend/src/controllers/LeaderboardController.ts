import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async findAllHome(req:Request, res:Response) {
    res.status(200).json(await this._service.findAllHome());
  }
}

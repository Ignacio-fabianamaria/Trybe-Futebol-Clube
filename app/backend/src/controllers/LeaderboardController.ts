import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import IServiceLeaderboardAway from '../interfaces/IServiceLeaderboardAway';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;
  private _serviceaway: IServiceLeaderboardAway;

  constructor(service: IServiceLeaderboard, serviceaway: IServiceLeaderboardAway) {
    this._service = service;
    this._serviceaway = serviceaway;
  }

  async getLeaderbords(req:Request, res:Response) {
    res.status(200).json(await this._service.getLeaderboards());
  }

  async getLeaderbordsAway(req:Request, res:Response) {
    res.status(200).json(await this._serviceaway.getLeaderboards());
  }
}

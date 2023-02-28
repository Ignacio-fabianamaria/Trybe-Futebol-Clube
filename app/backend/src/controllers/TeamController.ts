import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamControler {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(req:Request, res:Response): Promise<void> {
    const teamsList = await this._service.findAll();
    res.status(200).json(teamsList);
  }
}

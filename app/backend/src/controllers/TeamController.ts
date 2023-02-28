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

  async findById(req:Request, res:Response): Promise<void> {
    const { id } = req.params;
    const teamById = await this._service.findById(Number(id));
    res.status(200).json(teamById);
  }
}

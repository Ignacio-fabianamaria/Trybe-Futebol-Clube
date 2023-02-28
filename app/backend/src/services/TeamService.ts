// import { ModelStatic } from 'sequelize';
import { ModelStatic } from 'sequelize';
import IServiceTeam from '../interfaces/IServiceTeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async findAll(): Promise<TeamModel[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

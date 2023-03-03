import { ModelStatic } from 'sequelize';
import IServiceTeam from '../interfaces/IServiceTeam';
import TeamModel from '../database/models/TeamModel';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async findAll(): Promise<TeamModel[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<TeamModel> {
    const teamById = await this.model.findOne({ where: { id } });
    if (!teamById) {
      throw new Error('Id not found!');
    }
    return teamById;
  }
}

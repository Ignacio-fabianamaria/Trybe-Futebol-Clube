import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async findAllHome(): Promise<MatchesModel[]> {
    const allHomeTeams = await this.model.findAll(
      {
        where: { inProgress: false },
      },
    );
    return allHomeTeams;
  }
}

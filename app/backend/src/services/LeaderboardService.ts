import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async findAllTeams(): Promise<MatchesModel[]> {
    const allHomeTeams = await this.modelMatch.findAll(
      {
        include: [
          { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
          { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
        ],
        where: { inProgress: false },
        attributes: { exclude: ['awayTeamId', 'homeTeamId'] },
      },
    );
    return allHomeTeams;
  }
}

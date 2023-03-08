import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async getLeaderboards(): Promise<ILeaderboard[]> {
    /*  const matchAndTeamName = await this.modelMatch
      .findAll({ where: { inProgress: false } });
 */
    const getTeamName = await this.modelTeam.findAll();
    const leaderbord = getTeamName.map((e) => ({
      name: e.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
    return leaderbord;
  }

  // calc total de pontos
  // calc total de vitorias
  // calc total de derrotas
  // calc total de empates
  // calc total de gols
  // calc total de gols sofridos
  // alimentar o Leanderboard com os dados acima
}

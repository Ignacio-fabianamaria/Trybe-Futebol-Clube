import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async getMatchAndTeamName(): Promise<MatchesModel[]> {
    const matchAndTeamName = await this.modelMatch.findAll(
      { include: [{ model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress: false },
      },
    );
    return matchAndTeamName;
    // const leaderboardTeamName = await this.createLeaderboard();
    /* matchAndTeamName.forEach((match) => {
      const home = leaderboardTeamName
        .filter(
          (team) => team.name === match.dataValues.homeTeam.teamName,
        );
      if (home) {
        return home;
      }
    }); */
  }

  async createLeaderboard(): Promise<ILeaderboard[]> {
    const allTeams = await this.modelTeam.findAll();
    const allHomeTeams = allTeams.map((e) => ({
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
    return allHomeTeams;
  }
  // calc total de pontos
  // calc total de vitorias
  // calc total de derrotas
  // calc total de empates
  // calc total de gols
  // calc total de gols sofridos
  // alimentar o Leanderboard com os dados acima
}

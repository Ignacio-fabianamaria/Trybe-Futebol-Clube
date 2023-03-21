import { ModelStatic } from 'sequelize';
import ILeaderboard from '../interfaces/ILeaderboard';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchesModel';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class Leaderboard implements IServiceLeaderboard {
  protected modelTeam: ModelStatic<TeamModel> = TeamModel;
  protected modelMatch: ModelStatic<MatchesModel> = MatchesModel;

  async getLeaderboards(): Promise<ILeaderboard[]> {
    const MATCHES = await this.modelMatch.findAll({ where: { inProgress: false } });
    const TEAMS = await this.modelTeam.findAll();

    const leaderbordAway = TEAMS.map((e) => ({
      name: e.teamName,
      totalPoints: Leaderboard.getAwayPoints(MATCHES, e.id),
      totalGames: 0,
      totalVictories: Leaderboard.getAwayVictories(MATCHES, e.id),
      totalDraws: Leaderboard.getAwayTotalDraws(MATCHES, e.id),
      totalLosses: Leaderboard.getAwayTotalLosses(MATCHES, e.id),
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));

    return leaderbordAway;
  }

  static getAwayPoints(findPoints:MatchesModel[], id:number) {
    let awayPoints = 0;
    findPoints.filter((e) => {
      if (e.homeTeamId === id) {
        if (e.homeTeamGoals < e.awayTeamGoals) { awayPoints += 3; }
        if (e.homeTeamGoals === e.awayTeamGoals) { awayPoints += 1; }
      }
      return awayPoints;
    });
    return awayPoints;
  }

  static getAwayVictories(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals < v.awayTeamGoals).length;
  }

  static getAwayTotalDraws(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals === v.awayTeamGoals).length;
  }

  static getAwayTotalLosses(findVictory:MatchesModel[], id:number) {
    return findVictory.filter((e) => e.awayTeamId === id)
      .filter((v) => v.homeTeamGoals > v.awayTeamGoals).length;
  }


}
